---
name: defining-tdd
description: Define and enforce a Test-Driven Development workflow centered on use cases, writing tests first, and verifying acceptance criteria. Use when implementing new features, fixing bugs with clear expected behavior, or when the user asks to work with TDD, casos de uso, or pruebas primero.
disable-model-invocation: true
---

# Defining TDD

## Objetivo

Asegurar un flujo TDD consistente en el código base:
1. Definir casos de uso y criterios de aceptación.
2. Escribir tests antes de implementar.
3. Implementar lo mínimo para pasar tests.
4. Verificar comportamiento y reportar coberturas/riesgos.

## Flujo obligatorio

Copia este checklist y márcalo durante la implementación:

```md
TDD Progress:
- [ ] Paso 1: Definir casos de uso y criterios de aceptación
- [ ] Paso 2: Traducir cada caso de uso a tests (fallando)
- [ ] Paso 3: Implementar lo mínimo para pasar tests
- [ ] Paso 4: Refactorizar sin romper tests
- [ ] Paso 5: Verificar cobertura de casos de uso
```

### Paso 1: Definir casos de uso

Antes de tocar código, documenta:
- Actor
- Objetivo
- Precondiciones
- Flujo principal
- Casos borde/errores
- Criterios de aceptación verificables

Usa este formato:

```md
Caso de uso: <nombre>
Actor: <rol>
Objetivo: <resultado esperado>
Precondiciones:
- ...
Flujo principal:
1. ...
2. ...
Casos borde:
- ...
Criterios de aceptación:
- [ ] ...
- [ ] ...
```

### Paso 2: Tests primero (RED)

Por cada criterio de aceptación:
1. Crear o actualizar test.
2. Ejecutar tests y confirmar que fallan por la razón correcta.
3. No implementar todavía.

Regla: no pasar a implementación hasta tener al menos un test fallando que pruebe el comportamiento esperado.

### Paso 3: Implementar mínimo (GREEN)

Implementa solo lo necesario para que los tests nuevos pasen:
- Evita cambios no relacionados.
- Mantén el alcance atado al caso de uso.
- Si aparece un caso nuevo, vuelve al Paso 1.

### Paso 4: Refactor (REFACTOR)

Con tests en verde:
- Elimina duplicación.
- Mejora nombres/estructura.
- Mantén comportamiento estable.

Después de cada refactor, ejecutar tests.

### Paso 5: Verificación de casos de uso

Mapea cada criterio de aceptación a test(s):

```md
Matriz de verificación:
- Criterio: <texto criterio>
  Tests: <archivo.test.ts::nombre_test>
  Estado: ✅ / ❌
```

Solo se considera terminado cuando todos los criterios estén en ✅.

## Reglas de decisión

- Si no puedes expresar el comportamiento en un test claro, el caso de uso está incompleto.
- Si un test pasa sin implementar nada, el test no valida el comportamiento real.
- Si una implementación requiere mucho cambio fuera del caso de uso, dividir en casos más pequeños.

## Entregable esperado

Al finalizar, reportar siempre:
1. Casos de uso definidos.
2. Tests creados/actualizados primero.
3. Evidencia de ejecución de tests.
4. Matriz criterio -> test con estado final.
