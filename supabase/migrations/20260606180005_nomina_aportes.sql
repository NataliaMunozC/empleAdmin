-- Migracion 5: nominas, conceptos y aportes de seguridad social
-- Caso de uso: generar el desprendible mensual por contrato con sus renglones
-- y registrar los aportes mensuales (pension, salud, ARL, caja).

-- 1) Enums de nomina y aportes
do $$ begin
  if not exists (select 1 from pg_type where typname = 'estado_nomina_enum') then
    create type public.estado_nomina_enum as enum ('borrador', 'generada', 'pagada', 'firmada');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'naturaleza_concepto_enum') then
    create type public.naturaleza_concepto_enum as enum ('devengado', 'deduccion');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'concepto_nomina_enum') then
    create type public.concepto_nomina_enum as enum (
      'salario', 'auxilio_transporte', 'salud_empleado', 'pension_empleado', 'otro'
    );
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'estado_pago_enum') then
    create type public.estado_pago_enum as enum ('pendiente', 'pagado');
  end if;
end $$;

-- 2) Nominas (desprendible mensual por contrato)
create table if not exists public.nominas (
  id uuid primary key default gen_random_uuid(),
  contrato_id uuid not null references public.contratos (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  anio integer not null,
  mes smallint not null check (mes between 1 and 12),
  dias_laborados numeric(5,2) not null default 0,
  total_devengado numeric(14,2) not null default 0,
  total_deducciones numeric(14,2) not null default 0,
  neto_pagado numeric(14,2) not null default 0,
  estado public.estado_nomina_enum not null default 'borrador',
  desprendible_documento_id uuid references public.documentos (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (contrato_id, anio, mes)
);

comment on table public.nominas is 'Desprendible de nomina mensual por contrato.';

create index if not exists idx_nominas_empleador_id on public.nominas (empleador_id);
create index if not exists idx_nominas_contrato_id on public.nominas (contrato_id);

drop trigger if exists set_nominas_updated_at on public.nominas;
create trigger set_nominas_updated_at
  before update on public.nominas
  for each row execute function public.set_updated_at();

-- 3) Conceptos de nomina (renglones devengados/deducciones)
create table if not exists public.nomina_conceptos (
  id uuid primary key default gen_random_uuid(),
  nomina_id uuid not null references public.nominas (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  naturaleza public.naturaleza_concepto_enum not null,
  concepto public.concepto_nomina_enum not null,
  valor numeric(14,2) not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.nomina_conceptos is 'Renglones de devengados y deducciones de una nomina.';

create index if not exists idx_nomina_conceptos_empleador_id on public.nomina_conceptos (empleador_id);
create index if not exists idx_nomina_conceptos_nomina_id on public.nomina_conceptos (nomina_id);

-- 4) Aportes de seguridad social (PILA mensual)
create table if not exists public.aportes_seguridad_social (
  id uuid primary key default gen_random_uuid(),
  nomina_id uuid references public.nominas (id) on delete set null,
  contrato_id uuid not null references public.contratos (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  anio integer not null,
  mes smallint not null check (mes between 1 and 12),
  ibc numeric(14,2) not null default 0,
  pension_empleador numeric(14,2) not null default 0,
  pension_empleado numeric(14,2) not null default 0,
  salud_empleador numeric(14,2) not null default 0,
  salud_empleado numeric(14,2) not null default 0,
  arl numeric(14,2) not null default 0,
  caja_compensacion numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  estado_pago public.estado_pago_enum not null default 'pendiente',
  fecha_pago date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (contrato_id, anio, mes)
);

comment on table public.aportes_seguridad_social is 'Aportes mensuales de seguridad social (pension, salud, ARL, caja).';

create index if not exists idx_aportes_ss_empleador_id on public.aportes_seguridad_social (empleador_id);
create index if not exists idx_aportes_ss_contrato_id on public.aportes_seguridad_social (contrato_id);

drop trigger if exists set_aportes_ss_updated_at on public.aportes_seguridad_social;
create trigger set_aportes_ss_updated_at
  before update on public.aportes_seguridad_social
  for each row execute function public.set_updated_at();

-- 5) RLS por empleador
alter table public.nominas enable row level security;
alter table public.nomina_conceptos enable row level security;
alter table public.aportes_seguridad_social enable row level security;

drop policy if exists "nominas_select_own" on public.nominas;
create policy "nominas_select_own"
  on public.nominas for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "nominas_insert_own" on public.nominas;
create policy "nominas_insert_own"
  on public.nominas for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "nominas_update_own" on public.nominas;
create policy "nominas_update_own"
  on public.nominas for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "nominas_delete_own" on public.nominas;
create policy "nominas_delete_own"
  on public.nominas for delete to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "nomina_conceptos_select_own" on public.nomina_conceptos;
create policy "nomina_conceptos_select_own"
  on public.nomina_conceptos for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "nomina_conceptos_insert_own" on public.nomina_conceptos;
create policy "nomina_conceptos_insert_own"
  on public.nomina_conceptos for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "nomina_conceptos_update_own" on public.nomina_conceptos;
create policy "nomina_conceptos_update_own"
  on public.nomina_conceptos for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "nomina_conceptos_delete_own" on public.nomina_conceptos;
create policy "nomina_conceptos_delete_own"
  on public.nomina_conceptos for delete to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "aportes_ss_select_own" on public.aportes_seguridad_social;
create policy "aportes_ss_select_own"
  on public.aportes_seguridad_social for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "aportes_ss_insert_own" on public.aportes_seguridad_social;
create policy "aportes_ss_insert_own"
  on public.aportes_seguridad_social for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "aportes_ss_update_own" on public.aportes_seguridad_social;
create policy "aportes_ss_update_own"
  on public.aportes_seguridad_social for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "aportes_ss_delete_own" on public.aportes_seguridad_social;
create policy "aportes_ss_delete_own"
  on public.aportes_seguridad_social for delete to authenticated
  using (empleador_id = (select auth.uid()));
