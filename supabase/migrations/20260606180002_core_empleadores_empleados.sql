-- Migracion 2: empleadores (perfil del usuario) y empleados (empleadas domesticas)
-- Caso de uso: cada usuario autenticado es un empleador que gestiona varias
-- empleadas, con aislamiento de datos por empleador (RLS).

-- 1) Enums de identificacion y genero
do $$ begin
  if not exists (select 1 from pg_type where typname = 'tipo_documento_enum') then
    create type public.tipo_documento_enum as enum ('CC', 'CE', 'PEP', 'PPT', 'PASAPORTE', 'TI');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'genero_enum') then
    create type public.genero_enum as enum ('masculino', 'femenino', 'otro');
  end if;
end $$;

-- 2) Empleadores (perfil 1:1 con auth.users)
create table if not exists public.empleadores (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre_completo text,
  tipo_documento public.tipo_documento_enum,
  numero_documento text,
  email text,
  telefono text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.empleadores is 'Perfil del usuario empleador, 1:1 con auth.users.';

drop trigger if exists set_empleadores_updated_at on public.empleadores;
create trigger set_empleadores_updated_at
  before update on public.empleadores
  for each row execute function public.set_updated_at();

-- 3) Crear perfil de empleador automaticamente al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.empleadores (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4) Empleados (empleadas domesticas)
create table if not exists public.empleados (
  id uuid primary key default gen_random_uuid(),
  empleador_id uuid not null references public.empleadores (id) on delete cascade,
  tipo_documento public.tipo_documento_enum not null,
  numero_documento text not null,
  primer_nombre text not null,
  segundo_nombre text,
  primer_apellido text not null,
  segundo_apellido text,
  fecha_nacimiento date,
  genero public.genero_enum,
  telefono text,
  email text,
  direccion text,
  eps text,
  afp text,
  caja_compensacion text,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (empleador_id, tipo_documento, numero_documento)
);

comment on table public.empleados is 'Empleadas domesticas gestionadas por un empleador.';

create index if not exists idx_empleados_empleador_id on public.empleados (empleador_id);

drop trigger if exists set_empleados_updated_at on public.empleados;
create trigger set_empleados_updated_at
  before update on public.empleados
  for each row execute function public.set_updated_at();

-- 5) RLS por empleador
alter table public.empleadores enable row level security;
alter table public.empleados enable row level security;

drop policy if exists "empleadores_select_own" on public.empleadores;
create policy "empleadores_select_own"
  on public.empleadores for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "empleadores_insert_own" on public.empleadores;
create policy "empleadores_insert_own"
  on public.empleadores for insert to authenticated
  with check (id = (select auth.uid()));

drop policy if exists "empleadores_update_own" on public.empleadores;
create policy "empleadores_update_own"
  on public.empleadores for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists "empleados_select_own" on public.empleados;
create policy "empleados_select_own"
  on public.empleados for select to authenticated
  using (empleador_id = (select auth.uid()));

drop policy if exists "empleados_insert_own" on public.empleados;
create policy "empleados_insert_own"
  on public.empleados for insert to authenticated
  with check (empleador_id = (select auth.uid()));

drop policy if exists "empleados_update_own" on public.empleados;
create policy "empleados_update_own"
  on public.empleados for update to authenticated
  using (empleador_id = (select auth.uid()))
  with check (empleador_id = (select auth.uid()));

drop policy if exists "empleados_delete_own" on public.empleados;
create policy "empleados_delete_own"
  on public.empleados for delete to authenticated
  using (empleador_id = (select auth.uid()));
