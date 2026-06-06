---
name: modifying-database
description: Define el flujo para modificar la base de datos de este proyecto con migraciones de Supabase. Use when creating, updating, or deleting database schema objects, or when the user asks to change tablas, columnas, índices, constraints, or policies.
disable-model-invocation: true
---

# Modifying Database

## Objetivo

Explicar cómo hacer cambios en la base de datos de este proyecto usando migraciones de Supabase, incluyendo ejecución y recuperación ante corrupción.

## Flujo obligatorio

Copia este checklist y márcalo durante la implementación:

```md
Database Migration Progress:
- [ ] Paso 1: Definir caso de uso y criterio de aceptación del cambio de datos
- [ ] Paso 2: Crear migración nueva
- [ ] Paso 3: Modificar el archivo de migración con SQL
- [ ] Paso 4: Ejecutar la migración
- [ ] Paso 5: Verificar impacto en datos existentes
- [ ] Paso 6: Resetear la base de datos solo si hay corrupción de migraciones
```

## Comandos clave

Para crear una migración nueva, usa este comando exactamente:

`supabase migration new nombre_migracion`

Para ejecutar migraciones, usa:

`supavase migration up `

Si las migraciones en la based de datos se corrompieron, usa:

`supabase  db reset `

## Pasos de implementación

### Paso 1: Definir el cambio

Antes de tocar SQL, documenta:
- Qué entidad cambia (tabla, vista, índice, policy, función).
- Qué problema resuelve.
- Qué riesgo existe sobre datos ya cargados.
- Qué validación confirma éxito.

### Paso 2: Crear archivo de migración

Ejecuta:

`supabase migration new nombre_migracion`

Luego ubica el archivo generado en `supabase/migrations/` y trabaja solo sobre ese archivo.

### Paso 3: Implementar SQL

Reglas:
- Escribe SQL idempotente cuando sea posible.
- Evita cambios destructivos sin estrategia explícita de preservación de datos.
- Si renombras o cambias tipos, incluye transformación de datos necesaria.
- Mantén cada migración enfocada en un solo cambio funcional.

Patrón recomendado:

```sql
-- 1) Cambios de estructura
-- ALTER TABLE ...

-- 2) Backfill o transformación de datos (si aplica)
-- UPDATE ...

-- 3) Constraints/índices/policies
-- CREATE INDEX ...
```

### Paso 4: Ejecutar migración

Ejecuta:

`supavase migration up `

### Paso 5: Validar compatibilidad

Verifica explícitamente:
- Que el esquema final cumple el caso de uso.
- Que los datos existentes siguen siendo válidos.
- Que no se rompe lógica dependiente (queries, RLS, vistas, funciones).

### Paso 6: Recuperación ante corrupción de migraciones

Solo si las migraciones en la based de datos se corrompieron, resetea con:

`supabase  db reset `

### Verificación final y reporte

Al finalizar, reporta:
1. Caso de uso cubierto.
2. Nombre de migración creada.
3. Objetos de BD modificados.
4. Evidencia de ejecución de `supavase migration up `.
5. Si aplicó recuperación, evidencia de `supabase  db reset `.

## Reglas de decisión

- No uses `supabase  db reset ` como flujo normal; solo cuando haya corrupción de migraciones.
- Si el cambio requiere borrar datos, confirmar explícitamente estrategia antes de aplicar.
- Si un cambio de esquema afecta múltiples dominios, dividir en migraciones pequeñas.
- Si no hay criterio de aceptación verificable, no avanzar con SQL.
