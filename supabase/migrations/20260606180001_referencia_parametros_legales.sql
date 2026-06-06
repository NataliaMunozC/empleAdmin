-- Migracion 1: fundamentos + tablas de referencia
-- Caso de uso: disponer de parametros legales por anio y tarifas ARL para
-- calcular seguridad social y prestaciones de forma reproducible/auditable.

-- 1) Funcion compartida para mantener updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2) Tabla de parametros legales por anio
create table if not exists public.parametros_legales (
  id uuid primary key default gen_random_uuid(),
  anio integer not null unique,
  smmlv numeric(14,2) not null,
  auxilio_transporte numeric(14,2) not null default 0,
  pct_salud_empleador numeric(6,4) not null,
  pct_salud_empleado numeric(6,4) not null,
  pct_pension_empleador numeric(6,4) not null,
  pct_pension_empleado numeric(6,4) not null,
  pct_caja numeric(6,4) not null,
  pct_intereses_cesantias numeric(6,4) not null default 0.12,
  dias_vacaciones_anuales numeric(5,2) not null default 15,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.parametros_legales is 'Parametros legales colombianos por anio para calculo de aportes y prestaciones.';

drop trigger if exists set_parametros_legales_updated_at on public.parametros_legales;
create trigger set_parametros_legales_updated_at
  before update on public.parametros_legales
  for each row execute function public.set_updated_at();

-- 3) Tabla de tarifas ARL por clase de riesgo (constantes nacionales)
create table if not exists public.tarifas_arl (
  clase_riesgo smallint primary key check (clase_riesgo between 1 and 5),
  porcentaje numeric(7,5) not null,
  descripcion text
);

comment on table public.tarifas_arl is 'Tarifas ARL por clase de riesgo (I-V).';

-- 4) Seed de tarifas ARL
insert into public.tarifas_arl (clase_riesgo, porcentaje, descripcion) values
  (1, 0.00522, 'Clase I - Riesgo minimo'),
  (2, 0.01044, 'Clase II - Riesgo bajo'),
  (3, 0.02436, 'Clase III - Riesgo medio'),
  (4, 0.04350, 'Clase IV - Riesgo alto'),
  (5, 0.06960, 'Clase V - Riesgo maximo')
on conflict (clase_riesgo) do update
  set porcentaje = excluded.porcentaje,
      descripcion = excluded.descripcion;

-- 5) RLS: lectura para usuarios autenticados, escritura solo service_role
alter table public.parametros_legales enable row level security;
alter table public.tarifas_arl enable row level security;

drop policy if exists "parametros_legales_select_authenticated" on public.parametros_legales;
create policy "parametros_legales_select_authenticated"
  on public.parametros_legales
  for select
  to authenticated
  using (true);

drop policy if exists "tarifas_arl_select_authenticated" on public.tarifas_arl;
create policy "tarifas_arl_select_authenticated"
  on public.tarifas_arl
  for select
  to authenticated
  using (true);
