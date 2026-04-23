---
name: ooux-oiltrace
description: >
  Aplica el método OOUX (Object-Oriented UX) al diseño de interfaces del sistema OilTrace,
  un sistema de trazabilidad de biocombustibles a partir de aceite reciclado. Úsala siempre
  que el usuario pida diseñar una página, vista, pantalla, componente o flujo — incluso si
  dicen "hazme el módulo de solicitud", "diseña la pantalla de canje", "crea el seguimiento
  del vehículo", "haz el formulario del cliente" o cualquier tarea de diseño/frontend.
  El sistema tiene 3 módulos para usuarios externos (Clientes):
  (1) Solicitud de recolección de aceite reciclado,
  (2) Canje de puntos por souvenirs/dinero/servicios,
  (3) Seguimiento en tiempo real del vehículo de recolección.
  Esta skill debe activarse ante cualquier tarea de diseño UI, componente React o flujo
  relacionado con OilTrace. Sigue siempre el proceso OOUX: objetos → atributos → acciones
  → relaciones → vistas → código React + Tailwind.
---

# OOUX Design Skill — OilTrace
## Sistema de trazabilidad de biocombustibles desde aceite reciclado

Esta skill guía el diseño de interfaces siguiendo **OOUX (Object-Oriented UX)**.
OOUX parte de los **objetos reales del dominio** antes de diseñar pantallas o flujos.

> Antes de generar cualquier componente, leer `references/objects.md` para el objeto involucrado.

---

## Los 3 módulos del Cliente (usuario externo)

OilTrace tiene 3 módulos orientados al **Cliente** — el usuario externo que entrega aceite reciclado:

| # | Módulo | Objeto principal | Ruta |
|---|---|---|---|
| 1 | **Solicitud de Recolección** | `SolicitudRecoleccion` | `/solicitudes` |
| 2 | **Canje de Puntos** | `Canje` + `PuntoCliente` | `/canje` |
| 3 | **Seguimiento de Recolección** | `Recoleccion` | `/recolecciones/:id/seguimiento` |

---

## Proceso OOUX obligatorio

Ante cualquier tarea de diseño, seguir este orden:

```
1. Identificar el módulo y objeto principal involucrado
       ↓
2. Leer references/objects.md para ese objeto
       ↓
3. Determinar tipo de vista:
   - ¿Formulario de creación?  → ObjectCreateForm
   - ¿Detalle de un objeto?    → ObjectDetailView
   - ¿Listado de objetos?      → ObjectCollectionView
   - ¿Dashboard/resumen?       → múltiples ObjectCards
   - ¿Mapa de seguimiento?     → TrackingMapView
       ↓
4. Aplicar reglas OOUX (ver references/design-rules.md)
       ↓
5. Generar código React + Tailwind con las plantillas de abajo
       ↓
6. Nombrar el componente: [Objeto][TipoVista]
      Ejemplos: SolicitudCreateForm, RecoleccionTrackingView, CanjeDetailView
```

---

## Módulo 1 — Solicitud de Recolección

**Flujo del objeto `SolicitudRecoleccion`:**

```
Cliente llena formulario
       ↓
SolicitudRecoleccion creada (estado: pendiente)
       ↓
Empresa revisa y acepta/rechaza
       ↓
Si acepta → se crea objeto Recoleccion vinculado
Si rechaza → solicitud en estado rechazado con motivo
```

**Campos del formulario (atributos requeridos):**
- Tipo de aceite (vegetal usado, industrial, automotriz, mixto)
- Para qué se usó el aceite (cocina, freidora, motor, etc.)
- Cantidad estimada en litros
- Fecha preferida de recolección
- Días de disposición (checkboxes: lunes a domingo)
- Hora disponible (rango: desde/hasta)
- Dirección de recolección (autocompletado con mapa)
- Observaciones adicionales (opcional)

**Plantilla de componente:**
```jsx
// SolicitudCreateForm
// Vista: formulario multi-paso (stepper de 3 pasos)
// Paso 1: Datos del aceite (tipo, uso, cantidad)
// Paso 2: Disponibilidad (fecha, días, hora)
// Paso 3: Ubicación + confirmación
// NO usar tag <form> — usar div con onSubmit handler
```

---

## Módulo 2 — Canje de Puntos

**Flujo del objeto `Canje`:**

```
Recoleccion completada
       ↓
Sistema calcula puntos según litros entregados
       ↓
PuntoCliente del Cliente se actualiza (acumula)
       ↓
Cliente ve saldo de puntos y catálogo de CanjeOpcion
       ↓
Cliente selecciona opción → crea objeto Canje
       ↓
Empresa procesa el canje (estado: procesando → completado)
```

**Regla de conversión de puntos:**
- Definir en `objects.md` la tasa (ej: 1 litro = X puntos)
- Mostrar siempre el equivalente en puntos al registrar litros
- El saldo de puntos debe ser visible en todo momento (header del cliente)

**Tipos de canje disponibles:**
- `souvenir` — Productos físicos de la empresa
- `dinero` — Transferencia o vale en efectivo
- `servicio` — Servicios ofrecidos por la empresa

**Plantilla de componente:**
```jsx
// CanjeView (vista principal del módulo)
// Sección 1: Card de saldo actual de puntos (grande, visible)
// Sección 2: Historial de puntos ganados (por recolección)
// Sección 3: Catálogo de CanjeOpcion (grid de cards)
// Sección 4: Historial de canjes realizados
```

---

## Módulo 3 — Seguimiento de Recolección

**Flujo del objeto `Recoleccion`:**

```
SolicitudRecoleccion aceptada → Recoleccion creada (estado: programada)
       ↓
Día de recolección: conductor sale → estado: en_camino
       ↓
GPS actualiza posición en tiempo real (Leaflet + WebSocket o polling)
       ↓
Conductor llega → estado: en_punto_recoleccion
       ↓
Aceite recolectado → conductor confirma litros reales → estado: completada
       ↓
Sistema calcula y acredita puntos al Cliente
```

**Componentes requeridos:**
- Mapa Leaflet/OpenStreetMap con marcador del vehículo en tiempo real
- Timeline de estados (programada → en_camino → en_punto → completada)
- Card de info del conductor (nombre, foto, teléfono)
- Card de info del vehículo (placa, tipo)
- ETA estimado (tiempo restante)
- Botón de contacto directo con el conductor

**Plantilla de componente:**
```jsx
// RecoleccionTrackingView
// Layout: mapa ocupa 60% de la pantalla (o 100% en móvil)
// Panel lateral (40%): timeline + info conductor + ETA
// Actualización GPS: polling cada 10s o WebSocket
// Librería de mapa: Leaflet (react-leaflet) — NO Google Maps (evitar costos)
```

---

## Stack tecnológico

| Tecnología | Uso en OilTrace |
|---|---|
| React | Functional components + hooks |
| Tailwind CSS | Todos los estilos — mobile-first |
| React Router v6 | Navegación entre módulos y objetos |
| Axios | Llamadas a la API Django REST |
| Framer Motion | Transiciones entre vistas, stepper |
| Chart.js | Gráficos de puntos acumulados, litros |
| react-leaflet | Mapa de seguimiento (Módulo 3) |
| Three.js / r3f | Visualización 3D de trazabilidad (fase posterior) |

**Convenciones:**
- Nombres: `[Objeto][TipoVista]` → `SolicitudCreateForm`, `RecoleccionTrackingView`
- Sin comentarios innecesarios en el código
- Estado local: `useState` / `useReducer`; estado global: Context API
- Sin `<form>` HTML — usar `div` con handlers
- Tailwind clases: mobile-first con `md:` y `lg:` para responsive

---

## Paleta de colores OilTrace

```
Primary:     #16a34a   verde (biocombustible / naturaleza)
Secondary:   #0f172a   azul oscuro (confianza / tecnología)
Accent:      #f59e0b   ámbar (alertas, puntos, destacados)
Background:  #f8fafc   gris muy claro
Surface:     #ffffff
Text:        #1e293b
Muted:       #64748b
```

**Badges de estado — `SolicitudRecoleccion`:**
- `pendiente`  → amarillo  (`bg-yellow-100 text-yellow-800`)
- `aceptada`   → verde     (`bg-green-100 text-green-800`)
- `rechazada`  → rojo      (`bg-red-100 text-red-800`)
- `completada` → gris      (`bg-gray-100 text-gray-800`)

**Badges de estado — `Recoleccion`:**
- `programada`          → azul claro  (`bg-blue-100 text-blue-800`)
- `en_camino`           → ámbar       (`bg-amber-100 text-amber-800`)
- `en_punto_recoleccion`→ naranja     (`bg-orange-100 text-orange-800`)
- `completada`          → verde       (`bg-green-100 text-green-800`)
- `cancelada`           → rojo        (`bg-red-100 text-red-800`)

---

## Referencias

- `references/objects.md` — Objetos completos: atributos, acciones, relaciones
- `references/design-rules.md` — Reglas OOUX extendidas, patrones y anti-patrones

> **Leer siempre `references/objects.md` antes de generar cualquier componente.**
