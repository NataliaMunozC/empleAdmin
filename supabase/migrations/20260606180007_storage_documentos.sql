-- Migracion 7: bucket de storage para documentos
-- Caso de uso: almacenar contratos firmados y desprendibles en un bucket
-- privado, donde cada empleador solo accede a sus propios archivos.
-- Convencion de ruta: '<empleador_id>/...'.

-- 1) Bucket privado 'documentos'
insert into storage.buckets (id, name, public)
values ('documentos', 'documentos', false)
on conflict (id) do nothing;

-- 2) Politicas de acceso por carpeta del empleador (primer segmento = auth.uid())
drop policy if exists "documentos_storage_select_own" on storage.objects;
create policy "documentos_storage_select_own"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'documentos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

drop policy if exists "documentos_storage_insert_own" on storage.objects;
create policy "documentos_storage_insert_own"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'documentos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

drop policy if exists "documentos_storage_update_own" on storage.objects;
create policy "documentos_storage_update_own"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'documentos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'documentos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

drop policy if exists "documentos_storage_delete_own" on storage.objects;
create policy "documentos_storage_delete_own"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'documentos'
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );
