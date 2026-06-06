---
name: insepcting-database
description: Inspecciona el estado de la base de datos con el MCP de Supabase en modo solo lectura para debugging, extracción de información y aclaración del esquema actual. Use when investigating schema, reviewing migrations history, checking advisors/logs, or running read-only SQL queries.
disable-model-invocation: true
---

# Insepcting Database

## Objetivo

Usar el MCP de Supabase para entender el esquema actual, depurar problemas y extraer información de la base de datos sin modificar datos ni estructura.

## Regla inviolable

Nunca debe modificarse la base de datos por ese medio (mcp) sino usando migraciones.
Este procedimiento deber ser read only: sirve para debugging, extraer información o para aclarar el esquema actual de la base de datos.

## Herramientas MCP detectadas en este proyecto

Servidor: `project-0-empleAdmin-local-database`

### Permitidas (read only)

- `list_tables`: listar tablas por esquema.
- `list_migrations`: revisar historial de migraciones aplicadas.
- `list_extensions`: inspeccionar extensiones habilitadas.
- `get_advisors`: revisar hallazgos de seguridad/performance.
- `get_logs`: obtener logs por servicio para debugging.
- `get_project_url`: consultar URL del proyecto.
- `get_publishable_keys`: consultar llaves publicables.
- `generate_typescript_types`: generar tipos para inspección del esquema.
- `search_docs`: consultar documentación oficial.
- `execute_sql`: solo para consultas read only (`SELECT`, `WITH ... SELECT`, `EXPLAIN`, consultas a `information_schema` o `pg_catalog`).

### Prohibidas para este skill

- `apply_migration`: prohibido porque modifica la base de datos.
- `execute_sql` con sentencias de escritura o DDL (`INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`, `ALTER`, `CREATE`, `DROP`, `GRANT`, `REVOKE`, `COMMENT`, `DO`, `CALL`).

## Flujo obligatorio

```md
Inspecting Database Progress:
- [ ] Paso 1: Definir pregunta de debugging/esquema a resolver
- [ ] Paso 2: Elegir herramienta read only adecuada
- [ ] Paso 3: Ejecutar consulta/listado sin modificar BD
- [ ] Paso 4: Validar que el resultado responde la pregunta
- [ ] Paso 5: Reportar hallazgos y siguiente acción
```

## Procedimiento

### Paso 1: Definir objetivo de inspección

Primero especifica qué necesitas resolver:
- Estructura actual del esquema.
- Estado de migraciones.
- Hallazgos de seguridad/performance.
- Logs para depurar incidentes.
- Datos de diagnóstico via SQL de solo lectura.

### Paso 2: Elegir herramienta MCP

Guía rápida:
- **Esquema/tablas** -> `list_tables`
- **Historial de migraciones** -> `list_migrations`
- **Extensiones** -> `list_extensions`
- **Riesgos/performance** -> `get_advisors`
- **Incidentes operativos** -> `get_logs`
- **Consulta custom** -> `execute_sql` (solo lectura)

### Paso 3: Ejecutar en modo read only

Si usas `execute_sql`, valida antes de ejecutar:
1. La consulta inicia con `SELECT`, `WITH`, o `EXPLAIN`.
2. No contiene keywords de escritura/DDL.
3. Si hay duda, no ejecutar y reformular a lectura.

### Paso 4: Interpretar resultados

Entrega resultados accionables:
- Hecho observado.
- Evidencia (tabla, columna, migración, log o advisor).
- Impacto probable.
- Recomendación.

### Paso 5: Si hace falta cambiar BD

No cambies nada por MCP. Si se requiere cambio real:
1. Crear migración con `supabase migration new nombre_migracion`.
2. Editar SQL en `supabase/migrations/`.
3. Ejecutar migración con el flujo del proyecto.

## Formato de respuesta recomendado

```md
Objetivo de inspección:
- ...

Herramientas MCP usadas:
- ...

Hallazgos:
- ...

Recomendación:
- Si requiere cambios de BD, hacerlo por migraciones (no por MCP).
```
