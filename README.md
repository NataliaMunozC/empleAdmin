# EmpleAdmin

Scaffolding inicial para una aplicacion de gestion de empleadas domesticas y pagos de seguridad social, con arquitectura separada en `app` y `api`.

## Stack

- `app`: React + Vite + Tailwind + Supabase client.
- `api`: Node.js + Express + TypeScript + Supabase server client.
- Tests unitarios: Vitest en ambos paquetes.

## Estructura

```txt
.
├── app/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   └── *.test.tsx
│   └── package.json
├── api/
│   ├── src/
│   │   ├── routes/
│   │   └── *.test.ts
│   └── package.json
└── package.json
```

## Comandos

Desde la raiz:

- `npm install`: instala dependencias de todos los workspaces.
- `npm run dev`: ejecuta frontend y backend en paralelo.
- `npm run test`: corre los tests unitarios de `app` y `api`.
- `npm run build`: compila `app` y `api`.
- `npm run supabase:gen`: comando puente para generar tipos tras migraciones.

## TDD aplicado en este setup

TDD Progress:
- [x] Paso 1: Definir casos de uso y criterios de aceptación
- [x] Paso 2: Traducir cada caso de uso a tests (fallando)
- [x] Paso 3: Implementar lo mínimo para pasar tests
- [ ] Paso 4: Refactorizar sin romper tests
- [x] Paso 5: Verificar cobertura de casos de uso

Caso de uso: Visualizar modulos base de negocio
Actor: Persona administradora del hogar
Objetivo: Ver rapidamente los modulos operativos del sistema
Precondiciones:
- Aplicacion frontend cargada
Flujo principal:
1. Ingresa a la pantalla principal
2. Visualiza titulo y listado de modulos
Casos borde:
- No aplica en scaffold inicial
Criterios de aceptación:
- [x] Se muestra el heading de gestion de seguridad social para empleo domestico
- [x] Se muestran los modulos Empleadas, Seguridad social y Pagos

Caso de uso: Consultar modulos disponibles desde API
Actor: Cliente frontend o integracion interna
Objetivo: Obtener el catalogo base de modulos de negocio
Precondiciones:
- API en ejecucion
Flujo principal:
1. Consumir endpoint GET /modules
2. Recibir respuesta 200 con listado de modulos
Casos borde:
- Endpoint no registrado debe detectarse en tests (RED)
Criterios de aceptación:
- [x] GET /modules responde 200
- [x] Respuesta incluye modules con empleadas, seguridad-social, pagos, liquidaciones y reportes

Matriz de verificación:
- Criterio: Heading de gestion visible en home
  Tests: app/src/App.test.tsx::shows the social security management heading and key modules
  Estado: ✅
- Criterio: Modulos principales visibles en frontend
  Tests: app/src/App.test.tsx::shows the social security management heading and key modules
  Estado: ✅
- Criterio: API devuelve modulos de negocio
  Tests: api/src/routes/modules.test.ts::returns domain modules for social security operations
  Estado: ✅

## Forma de pruebas unitarias

1. Cada feature nueva debe crear al menos un test cerca del codigo:
   - Frontend: `src/**/*.test.tsx`
   - Backend: `src/**/*.test.ts`
2. En frontend se usa Testing Library para tests de componentes.
3. En backend se usa Supertest para probar rutas HTTP de forma aislada.
4. Los tests se ejecutan en CI con `npm run test`.
