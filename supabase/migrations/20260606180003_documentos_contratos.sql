-- Migracion 3: contratos y documentos
-- Caso de uso: registrar el contrato (indefinido/fijo, tiempo completo/por dias,
-- dias por semana, flags de aportes) y almacenar archivos firmados por ambas partes.

-- 1) Enums de contrato y documentos
do $$ begin
  if not exists (select 1 from pg_type where typname = 'tipo_duracion_enum') then
    create type public.tipo_duracion_enum as enum ('indefinido', 'termino_fijo', 'obra_labor');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'modalidad_contrato_enum') then
    create type public.modalidad_contrato_enum as enum ('tiempo_completo', 'por_dias');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'estado_contrato_enum') then
    create type public.estado_contrato_enum as enum ('activo', 'suspendido', 'terminado');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'tipo_documento_archivo_enum') then
    create type public.tipo_documento_archivo_enum as enum (
      'contrato_firmado', 'desprendible_nomina', 'soporte_prestacion', 'documento_identidad', 'otro'
    );
  end if;
end $$;

-- 2) Contratos (documento_contrato_id obtiene su FK luego de crear documentos)
create table if not exists public.contratos (
  id uuid primary key default gen_random_uuid(),
  empleado_id uuid not null references public.empleados (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  tipo_duracion public.tipo_duracion_enum not null,
  fecha_inicio date not null,
  fecha_fin date,
  modalidad public.modalidad_contrato_enum not null,
  dias_por_semana smallint check (dias_por_semana between 1 and 7),
  salario_mensual numeric(14,2),
  valor_dia numeric(14,2),
  aplica_auxilio_transporte boolean not null default false,
  aplica_salud boolean not null default true,
  aplica_pension boolean not null default true,
  aplica_arl boolean not null default true,
  clase_riesgo_arl smallint references public.tarifas_arl (clase_riesgo),
  aplica_caja boolean not null default true,
  estado public.estado_contrato_enum not null default 'activo',
  documento_contrato_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contratos_fijo_requiere_fin
    check (tipo_duracion <> 'termino_fijo' or fecha_fin is not null),
  constraint contratos_pordias_requiere_dias
    check (modalidad <> 'por_dias' or dias_por_semana is not null)
);

comment on table public.contratos is 'Contratos laborales de las empleadas con su modalidad y flags de aportes.';

create index if not exists idx_contratos_empleador_id on public.contratos (empleador_id);
create index if not exists idx_contratos_empleado_id on public.contratos (empleado_id);

drop trigger if exists set_contratos_updated_at on public.contratos;
create trigger set_contratos_updated_at
  before update on public.contratos
  for each row execute function public.set_updated_at();

-- 3) Documentos (archivos en storage asociados a empleado/contrato)
create table if not exists public.documentos (
  id uuid primary key default gen_random_uuid(),
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  empleado_id uuid references public.empleados (id) on delete set null,
  contrato_id uuid references public.contratos (id) on delete set null,
  tipo public.tipo_documento_archivo_enum not null,
  nombre text not null,
  storage_path text not null,
  mime_type text,
  tamano_bytes bigint,
  firmado_ambas_partes boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.documentos is 'Referencias a archivos (contratos firmados, desprendibles, soportes).';

create index if not exists idx_documentos_empleador_id on public.documentos (empleador_id);
create index if not exists idx_documentos_empleado_id on public.documentos (empleado_id);
create index if not exists idx_documentos_contrato_id on public.documentos (contrato_id);

drop trigger if exists set_documentos_updated_at on public.documentos;
create trigger set_documentos_updated_at
  before update on public.documentos
  for each row execute function public.set_updated_at();

-- 4) FK diferida de contratos.documento_contrato_id -> documentos
do $$ begin
  if not exists (
    select 1 from pg_constraint where conname = 'contratos_documento_contrato_id_fkey'
  ) then
    alter table public.contratos
      add constraint contratos_documento_contrato_id_fkey
      foreign key (documento_contrato_id)
      references public.documentos (id) on delete set null;
  end if;
end $$;

-- 5) RLS por empleador
alter table public.contratos enable row level security;
alter table public.documentos enable row level security;

drop policy if exists "contratos_select_own" on public.contratos;
create policy "contratos_select_own"
  on public.contratos for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "contratos_insert_own" on public.contratos;
create policy "contratos_insert_own"
  on public.contratos for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "contratos_update_own" on public.contratos;
create policy "contratos_update_own"
  on public.contratos for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "contratos_delete_own" on public.contratos;
create policy "contratos_delete_own"
  on public.contratos for delete to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "documentos_select_own" on public.documentos;
create policy "documentos_select_own"
  on public.documentos for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "documentos_insert_own" on public.documentos;
create policy "documentos_insert_own"
  on public.documentos for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "documentos_update_own" on public.documentos;
create policy "documentos_update_own"
  on public.documentos for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "documentos_delete_own" on public.documentos;
create policy "documentos_delete_own"
  on public.documentos for delete to authenticated
  using (empleador_id = (select auth.uid()));
