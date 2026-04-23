# Reglas de Diseño OOUX — OilTrace (Módulos del Cliente)

---

## Principio central OOUX

Cada pantalla = una ventana a un **objeto** del sistema.
Nunca diseñar "pantallas de proceso" — diseñar vistas de objetos con sus atributos y acciones.

---

## Layout estándar por tipo de vista

### Formulario de creación (ObjectCreateForm)
Usar stepper multi-paso cuando hay más de 5 campos:
```
Paso 1 → Paso 2 → Paso 3 → Confirmación
```
- Mostrar progreso visual (barra o dots)
- Permitir volver al paso anterior sin perder datos
- Último paso = resumen de todo antes de enviar
- NO usar `<form>` HTML — usar `div` con `onClick` handlers
- Validación en tiempo real por campo

**Aplicación en OilTrace — SolicitudCreateForm:**
- Paso 1: Datos del aceite (tipo, uso, cantidad)
- Paso 2: Disponibilidad (fecha, días checkboxes, rango horario)
- Paso 3: Ubicación (mapa + dirección + observaciones)
- Paso 4: Resumen + botón "Enviar solicitud"

### Vista de detalle (ObjectDetailView)
```
┌──────────────────────────────────────────┐
│ Breadcrumb: Mis Solicitudes > SOL-001    │
├──────────────────────────────────────────┤
│ CABECERA: código + estado (badge) + fecha│
├───────────────────┬──────────────────────┤
│ ATRIBUTOS         │ OBJETO RELACIONADO   │
│ (datos del objeto)│ (card del objeto     │
│                   │  vinculado con link) │
├───────────────────┴──────────────────────┤
│ ACCIONES: botones según estado y rol     │
├──────────────────────────────────────────┤
│ HISTORIAL / TIMELINE de eventos          │
└──────────────────────────────────────────┘
```

### Vista de colección (ObjectCollectionView)
```
┌──────────────────────────────────────────┐
│ Título + count ("Mis Solicitudes · 12") │
├──────────────────────────────────────────┤
│ Filtros: estado, fecha, tipo aceite      │
├──────────────────────────────────────────┤
│ [Card]  [Card]  [Card]                  │
│ [Card]  [Card]  [Card]                  │
├──────────────────────────────────────────┤
│ Paginación                               │
└──────────────────────────────────────────┘
│ FAB "+" → nueva solicitud (esquina inf) │
```

### Vista de mapa de seguimiento (TrackingMapView)
```
Desktop:
┌────────────────────┬─────────────────────┐
│                    │ Timeline estados     │
│   MAPA LEAFLET     │ ──────────────────  │
│   (60% ancho)      │ Info conductor       │
│                    │ Info vehículo        │
│   [marcador GPS]   │ ETA: X minutos       │
│                    │ [Llamar conductor]   │
└────────────────────┴─────────────────────┘

Móvil:
┌──────────────────────────────────────────┐
│ MAPA (100% ancho, 50% alto)             │
├──────────────────────────────────────────┤
│ Panel deslizable (swipe up para expandir)│
│ Timeline + conductor + ETA              │
└──────────────────────────────────────────┘
```

---

## Reglas específicas por módulo

### Módulo 1 — Solicitud

**R1.1** — El mapa del Paso 3 debe permitir al cliente pinchar su ubicación o buscar dirección.
Usar `react-leaflet` con marker arrastrable.

**R1.2** — Los días disponibles se muestran como chips/checkboxes, nunca como dropdown.
```jsx
['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
// Cada uno: toggle seleccionable con color primary cuando activo
```

**R1.3** — La cantidad de litros debe mostrar un indicador visual (S/M/L):
- < 5 litros: "Pequeña cantidad"
- 5–20 litros: "Cantidad media"
- > 20 litros: "Gran cantidad — recolección prioritaria"

**R1.4** — Al enviar, mostrar pantalla de confirmación con animación de éxito (Framer Motion)
y el código de la solicitud (SOL-XXXX) prominente.

### Módulo 2 — Canje

**R2.1** — El saldo de puntos debe estar siempre visible: en el header del cliente
y como card destacada al inicio del módulo. Formato: `🔥 1,250 pts`.

**R2.2** — Las CanjeOpcion se muestran como grid de cards. Cada card muestra:
- Imagen del beneficio
- Nombre + tipo (badge: souvenir/dinero/servicio)
- Costo en puntos
- Si el cliente no tiene suficientes puntos: card con overlay semitransparente + "Te faltan X pts"
- Si tiene puntos suficientes: botón "Canjear" activo en color primary

**R2.3** — Antes de confirmar un canje, mostrar modal de confirmación con:
- Resumen del beneficio
- Puntos a descontar
- Saldo restante después del canje
- Botones: "Cancelar" y "Confirmar canje"

**R2.4** — El historial de puntos ganados debe mostrar de qué recolección vino cada ganancia,
con link clickeable a esa Recoleccion.

### Módulo 3 — Seguimiento

**R3.1** — El mapa se actualiza automáticamente cada 10 segundos (polling al endpoint GPS).
Mostrar indicador de "Actualizando..." discreto cuando hace fetch.

**R3.2** — La ruta del vehículo desde su origen hasta el punto del cliente se dibuja
como polyline en el mapa (color primary #16a34a).

**R3.3** — El timeline de estados usa iconos diferenciados:
- `programada`           → 📅 Calendario
- `en_camino`            → 🚛 Camión (animado si es estado actual)
- `en_punto_recoleccion` → 📍 Pin
- `completada`           → ✅ Check verde

**R3.4** — El estado actual se resalta visualmente en el timeline (más grande, color primary).
Los estados anteriores en gris. Los estados futuros en gris claro con opacidad 50%.

**R3.5** — Mostrar siempre la card del conductor con: nombre, foto (avatar con inicial si no hay foto),
y botón de llamada directa (`tel:` link).

---

## Patrones de componentes reutilizables

### Badge de estado (universal)
```jsx
// Usar en todas las vistas que muestren estado de un objeto
<StatusBadge status="en_camino" type="recoleccion" />
// type puede ser: "solicitud" | "recoleccion" | "canje"
```

### Card de objeto en colección
Siempre incluir: código/ID + atributo principal + badge estado + 1 acción primaria.
Tamaño compacto. Sin scroll interno. Click en la card = navega al detalle.

### Toast de feedback
Después de TODA acción del usuario mostrar toast:
- Éxito: verde, ícono check, mensaje positivo, 3 segundos
- Error: rojo, ícono X, mensaje descriptivo + sugerencia, 5 segundos
- Cargando: sin dismiss automático, spinner discreto

---

## Navegación entre módulos del Cliente

```
/                           → Landing / Login
/dashboard                  → Dashboard del Cliente (saldo puntos + solicitudes recientes)
/solicitudes                → Colección de SolicitudRecoleccion del cliente
/solicitudes/nueva          → SolicitudCreateForm (stepper)
/solicitudes/:id            → SolicitudDetailView
/recolecciones/:id/seguimiento → RecoleccionTrackingView (Módulo 3)
/canje                      → CanjeView (saldo + catálogo + historial)
/canje/historial            → Historial de Canjes del cliente
```

---

## Anti-patrones a evitar

❌ No mostrar campos del formulario todos en una sola página larga — usar stepper  
❌ No usar Google Maps (costo) — siempre Leaflet + OpenStreetMap  
❌ No deshabilitar botones de canje — ocultarlos si no hay saldo, mostrar "faltan X pts"  
❌ No mostrar coordenadas crudas al usuario — siempre dirección legible  
❌ No inventar atributos — solo los definidos en `objects.md`  
❌ No usar `<form>` HTML en React — solo divs con handlers  
❌ No mostrar el estado GPS como texto plano — siempre en mapa visual  
