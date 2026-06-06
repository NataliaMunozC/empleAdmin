-- Migracion 6: prestaciones sociales y vacaciones
-- Caso de uso: liquidar obligaciones periodicas (prima, cesantias, intereses,
-- vacaciones) y llevar el saldo de vacaciones (derecho vs tomadas).

-- 1) Enums de prestaciones y movimientos de vacaciones
do $$ begin
  if not exists (select 1 from pg_type where typname = 'tipo_prestacion_enum') then
    create type public.tipo_prestacion_enum as enum (
      'prima_servicios', 'cesantias', 'intereses_cesantias', 'vacaciones'
    );
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'estado_prestacion_enum') then
    create type public.estado_prestacion_enum as enum ('pendiente', 'liquidada', 'pagada', 'consignada');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'tipo_movimiento_vacaciones_enum') then
    create type public.tipo_movimiento_vacaciones_enum as enum ('causado', 'tomado', 'pagado', 'ajuste');
  end if;
end $$;

-- 2) Prestaciones sociales periodicas
create table if not exists public.prestaciones_sociales (
  id uuid primary key default gen_random_uuid(),
  contrato_id uuid not null references public.contratos (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  tipo public.tipo_prestacion_enum not null,
  periodo_inicio date not null,
  periodo_fin date not null,
  dias_base numeric(7,2) not null default 0,
  salario_base numeric(14,2) not null default 0,
  valor_calculado numeric(14,2) not null default 0,
  valor_pagado numeric(14,2) not null default 0,
  fecha_pago date,
  estado public.estado_prestacion_enum not null default 'pendiente',
  documento_id uuid references public.documentos (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.prestaciones_sociales is 'Liquidaciones de prima, cesantias, intereses y vacaciones.';

create index if not exists idx_prestaciones_empleador_id on public.prestaciones_sociales (empleador_id);
create index if not exists idx_prestaciones_contrato_id on public.prestaciones_sociales (contrato_id);

drop trigger if exists set_prestaciones_updated_at on public.prestaciones_sociales;
create trigger set_prestaciones_updated_at
  before update on public.prestaciones_sociales
  for each row execute function public.set_updated_at();

-- 3) Movimientos de vacaciones (libro mayor: causado / tomado / pagado / ajuste)
create table if not exists public.movimientos_vacaciones (
  id uuid primary key default gen_random_uuid(),
  contrato_id uuid not null references public.contratos (id) on delete cascade,
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  tipo public.tipo_movimiento_vacaciones_enum not null,
  dias numeric(6,2) not null default 0,
  fecha_inicio date,
  fecha_fin date,
  descripcion text,
  created_at timestamptz not null default now()
);

comment on table public.movimientos_vacaciones is 'Movimientos de vacaciones: dias causados (derecho) y tomados.';

create index if not exists idx_mov_vacaciones_empleador_id on public.movimientos_vacaciones (empleador_id);
create index if not exists idx_mov_vacaciones_contrato_id on public.movimientos_vacaciones (contrato_id);

-- 4) Vista de saldo de vacaciones (suma de movimientos, respeta RLS)
create or replace view public.saldo_vacaciones
with (security_invoker = true) as
select
  contrato_id,
  empleador_id,
  sum(dias) as saldo_dias
from public.movimientos_vacaciones
group by contrato_id, empleador_id;

comment on view public.saldo_vacaciones is 'Saldo de vacaciones por contrato (suma de movimientos).';

-- 5) RLS por empleador
alter table public.prestaciones_sociales enable row level security;
alter table public.movimientos_vacaciones enable row level security;

drop policy if exists "prestaciones_select_own" on public.prestaciones_sociales;
create policy "prestaciones_select_own"
  on public.prestaciones_sociales for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "prestaciones_insert_own" on public.prestaciones_sociales;
create policy "prestaciones_insert_own"
  on public.prestaciones_sociales for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "prestaciones_update_own" on public.prestaciones_sociales;
create policy "prestaciones_update_own"
  on public.prestaciones_sociales for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "prestaciones_delete_own" on public.prestaciones_sociales;
create policy "prestaciones_delete_own"
  on public.prestaciones_sociales for delete to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "mov_vacaciones_select_own" on public.movimientos_vacaciones;
create policy "mov_vacaciones_select_own"
  on public.movimientos_vacaciones for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "mov_vacaciones_insert_own" on public.movimientos_vacaciones;
create policy "mov_vacaciones_insert_own"
  on public.movimientos_vacaciones for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "mov_vacaciones_update_own" on public.movimientos_vacaciones;
create policy "mov_vacaciones_update_own"
  on public.movimientos_vacaciones for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "mov_vacaciones_delete_own" on public.movimientos_vacaciones;
create policy "mov_vacaciones_delete_own"
  on public.movimientos_vacaciones for delete to authenticated
  using (empleador_id = (select auth.uid()));
