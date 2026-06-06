-- Migracion 4: periodos laborales y novedades
-- Caso de uso: registrar mes a mes los dias estimados vs dias efectivamente
-- laborados por contrato, ajustables por novedades, base para los calculos.

-- 1) Enum de tipos de novedad
do $$ begin
  if not exists (select 1 from pg_type where typname = 'tipo_novedad_enum') then
    create type public.tipo_novedad_enum as enum (
      'ausencia', 'incapacidad', 'licencia', 'dia_adicional', 'vacaciones', 'otro'
    );
  end if;
end $$;

-- 2) Periodos laborales (uno por contrato/mes)
create table if not exists public.periodos_laborales (
  id uuid primary key default gen_random_uuid(),
  contrato_id uuid not null references public.contratos (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  anio integer not null,
  mes smallint not null check (mes between 1 and 12),
  dias_estimados numeric(5,2) not null default 0,
  dias_efectivos numeric(5,2) not null default 0,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (contrato_id, anio, mes)
);

comment on table public.periodos_laborales is 'Control mensual de dias estimados vs efectivos por contrato.';

create index if not exists idx_periodos_laborales_empleador_id on public.periodos_laborales (empleador_id);
create index if not exists idx_periodos_laborales_contrato_id on public.periodos_laborales (contrato_id);

drop trigger if exists set_periodos_laborales_updated_at on public.periodos_laborales;
create trigger set_periodos_laborales_updated_at
  before update on public.periodos_laborales
  for each row execute function public.set_updated_at();

-- 3) Novedades (detalle que ajusta los dias del periodo)
create table if not exists public.novedades (
  id uuid primary key default gen_random_uuid(),
  periodo_laboral_id uuid not null references public.periodos_laborales (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  tipo public.tipo_novedad_enum not null,
  fecha date not null,
  dias numeric(5,2) not null default 0,
  descripcion text,
  created_at timestamptz not null default now()
);

comment on table public.novedades is 'Novedades que afectan los dias efectivos de un periodo laboral.';

create index if not exists idx_novedades_empleador_id on public.novedades (empleador_id);
create index if not exists idx_novedades_periodo_laboral_id on public.novedades (periodo_laboral_id);

-- 4) RLS por empleador
alter table public.periodos_laborales enable row level security;
alter table public.novedades enable row level security;

drop policy if exists "periodos_laborales_select_own" on public.periodos_laborales;
create policy "periodos_laborales_select_own"
  on public.periodos_laborales for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "periodos_laborales_insert_own" on public.periodos_laborales;
create policy "periodos_laborales_insert_own"
  on public.periodos_laborales for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "periodos_laborales_update_own" on public.periodos_laborales;
create policy "periodos_laborales_update_own"
  on public.periodos_laborales for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "periodos_laborales_delete_own" on public.periodos_laborales;
create policy "periodos_laborales_delete_own"
  on public.periodos_laborales for delete to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "novedades_select_own" on public.novedades;
create policy "novedades_select_own"
  on public.novedades for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "novedades_insert_own" on public.novedades;
create policy "novedades_insert_own"
  on public.novedades for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "novedades_update_own" on public.novedades;
create policy "novedades_update_own"
  on public.novedades for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "novedades_delete_own" on public.novedades;
create policy "novedades_delete_own"
  on public.novedades for delete to authenticated
  using (empleador_id = (select auth.uid()));
