# Objetos del sistema OilTrace
## Módulos del Cliente (usuario externo)

---

## Objeto: `Cliente`

**Descripción:** Usuario externo que entrega aceite reciclado a la empresa. Acumula puntos por sus entregas y los canjea por beneficios.

### Atributos
| Atributo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único |
| `nombre_completo` | string | Nombre completo del cliente |
| `email` | string | Correo electrónico (login) |
| `telefono` | string | Número de contacto |
| `tipo` | enum | `persona_natural`, `empresa` |
| `razon_social` | string | Solo si tipo = empresa |
| `direccion_principal` | string | Dirección principal de recolección |
| `coordenadas` | lat/lng | Coordenadas de la dirección principal |
| `puntos_disponibles` | integer | Puntos actuales canjeables |
| `puntos_totales_ganados` | integer | Total histórico de puntos ganados |
| `litros_totales_entregados` | decimal | Total de litros entregados históricamente |
| `fecha_registro` | datetime | Fecha de creación de cuenta |
| `activo` | boolean | Si la cuenta está activa |

### Acciones
| Acción | Quién | Descripción |
|---|---|---|
| `registrarse` | Cliente (público) | Crear cuenta nueva |
| `hacer_solicitud` | Cliente autenticado | Crear nueva SolicitudRecoleccion |
| `ver_mis_solicitudes` | Cliente autenticado | Ver historial de solicitudes |
| `ver_saldo_puntos` | Cliente autenticado | Ver puntos disponibles y movimientos |
| `canjear_puntos` | Cliente autenticado | Crear un nuevo Canje |
| `seguir_recoleccion` | Cliente autenticado | Ver mapa de seguimiento en tiempo real |

### Relaciones
- Tiene muchas → `SolicitudRecoleccion`
- Tiene muchas → `Recoleccion` (a través de solicitudes)
- Tiene muchos → `Canje`
- Tiene un → `PuntoCliente` (saldo y movimientos)

---

## Objeto: `SolicitudRecoleccion`

**Descripción:** Petición formal del Cliente para que la empresa envíe un vehículo a recolectar su aceite reciclado. Es el punto de entrada del flujo principal.

### Atributos
| Atributo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único |
| `codigo` | string | Código legible (ej: SOL-2025-0042) |
| `cliente` | FK Cliente | Cliente que hace la solicitud |
| `tipo_aceite` | enum | `vegetal_cocina`, `vegetal_freidora`, `automotriz`, `industrial`, `mixto` |
| `uso_previo` | string | Para qué se usó el aceite (cocina, motor, maquinaria, etc.) |
| `cantidad_estimada_litros` | decimal | Litros estimados a entregar |
| `fecha_preferida` | date | Fecha deseada de recolección |
| `dias_disponibles` | array | Días de la semana disponibles (lunes–domingo) |
| `hora_desde` | time | Inicio del rango horario disponible |
| `hora_hasta` | time | Fin del rango horario disponible |
| `direccion_recoleccion` | string | Dirección exacta de recolección |
| `coordenadas_recoleccion` | lat/lng | Coordenadas del punto de recolección |
| `observaciones` | text | Notas adicionales del cliente (opcional) |
| `estado` | enum | `pendiente`, `aceptada`, `rechazada`, `completada` |
| `motivo_rechazo` | text | Razón si estado = rechazada |
| `fecha_creacion` | datetime | Cuando se creó la solicitud |
| `fecha_respuesta` | datetime | Cuando la empresa respondió |

### Acciones
| Acción | Quién | Descripción |
|---|---|---|
| `crear` | Cliente | Llenar y enviar el formulario de solicitud |
| `cancelar` | Cliente | Cancelar si estado = pendiente |
| `ver_detalle` | Cliente, Admin | Ver todos los datos de la solicitud |
| `aceptar` | Admin, Operador | Aceptar y programar la recolección |
| `rechazar` | Admin, Operador | Rechazar con motivo obligatorio |

### Relaciones
- Pertenece a → `Cliente`
- Si aceptada, genera → `Recoleccion` (1 a 1)

### Flujo de estados
```
pendiente → aceptada → (Recoleccion creada)
pendiente → rechazada
aceptada  → completada (cuando Recoleccion termina)
```

---

## Objeto: `Recoleccion`

**Descripción:** Operación física de recolección del aceite. Se crea cuando una SolicitudRecoleccion es aceptada. Es el objeto que se sigue en tiempo real en el Módulo 3.

### Atributos
| Atributo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único |
| `codigo` | string | Código legible (ej: REC-2025-0018) |
| `solicitud` | FK SolicitudRecoleccion | Solicitud que originó esta recolección |
| `cliente` | FK Cliente | Cliente a recolectar |
| `conductor` | FK Usuario | Conductor asignado |
| `vehiculo` | FK Vehiculo | Vehículo asignado |
| `fecha_programada` | datetime | Fecha y hora programada |
| `estado` | enum | `programada`, `en_camino`, `en_punto_recoleccion`, `completada`, `cancelada` |
| `ubicacion_actual_lat` | decimal | Latitud actual del vehículo (GPS) |
| `ubicacion_actual_lng` | decimal | Longitud actual del vehículo (GPS) |
| `ultima_actualizacion_gps` | datetime | Timestamp del último ping GPS |
| `eta_minutos` | integer | Minutos estimados de llegada |
| `litros_reales_recolectados` | decimal | Litros confirmados al finalizar (llena el conductor) |
| `puntos_otorgados` | integer | Puntos calculados y acreditados al cliente |
| `fecha_inicio` | datetime | Cuando el conductor salió |
| `fecha_llegada` | datetime | Cuando el conductor llegó al punto |
| `fecha_completada` | datetime | Cuando se confirmó la recolección |
| `notas_conductor` | text | Observaciones del conductor al finalizar |

### Acciones
| Acción | Quién | Descripción |
|---|---|---|
| `iniciar_ruta` | Conductor | Cambiar estado a en_camino + activar GPS |
| `actualizar_gps` | Sistema/Conductor | Actualizar coordenadas actuales |
| `confirmar_llegada` | Conductor | Estado → en_punto_recoleccion |
| `confirmar_recoleccion` | Conductor | Ingresar litros reales → estado completada |
| `cancelar` | Admin, Conductor | Cancelar con motivo |
| `ver_seguimiento` | Cliente | Ver mapa en tiempo real (Módulo 3) |

### Relaciones
- Originada por → `SolicitudRecoleccion`
- Pertenece a → `Cliente`
- Asignada a → `Conductor` (Usuario con rol conductor)
- Usa → `Vehiculo`
- Al completarse, genera → movimiento en `PuntoCliente`

### Cálculo de puntos
```
puntos_otorgados = litros_reales_recolectados × TASA_PUNTOS_POR_LITRO
```
La tasa se configura en el sistema (ej: 10 puntos por litro).

---

## Objeto: `PuntoCliente`

**Descripción:** Registro del saldo y movimientos de puntos de un Cliente. Cada ganancia o canje genera un movimiento registrado.

### Atributos
| Atributo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único |
| `cliente` | FK Cliente | Dueño del saldo |
| `saldo_actual` | integer | Puntos disponibles actualmente |
| `total_ganado` | integer | Total histórico ganado |
| `total_canjeado` | integer | Total histórico canjeado |

### Movimientos (sub-objeto de PuntoCliente)
| Atributo | Tipo | Descripción |
|---|---|---|
| `tipo` | enum | `ganancia`, `canje` |
| `puntos` | integer | Cantidad (positivo = ganancia, negativo = canje) |
| `descripcion` | string | Ej: "Recolección REC-2025-0018 — 15 litros" |
| `fecha` | datetime | Timestamp del movimiento |
| `recoleccion` | FK Recoleccion | Si tipo = ganancia |
| `canje` | FK Canje | Si tipo = canje |

### Acciones
| Acción | Quién | Descripción |
|---|---|---|
| `ver_saldo` | Cliente | Ver saldo actual y movimientos |
| `acreditar` | Sistema | Sumar puntos (automático al completar recolección) |
| `debitar` | Sistema | Restar puntos (automático al confirmar canje) |

---

## Objeto: `CanjeOpcion`

**Descripción:** Opción disponible en el catálogo de canje. Lo gestiona la empresa.

### Atributos
| Atributo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único |
| `nombre` | string | Nombre del beneficio |
| `descripcion` | text | Descripción detallada |
| `tipo` | enum | `souvenir`, `dinero`, `servicio` |
| `costo_puntos` | integer | Puntos necesarios para canjear |
| `valor_referencial` | decimal | Valor en Bs. equivalente (referencial) |
| `imagen_url` | string | Imagen del beneficio |
| `disponible` | boolean | Si está activo en el catálogo |
| `stock` | integer | Unidades disponibles (null = ilimitado) |

### Acciones
| Acción | Quién | Descripción |
|---|---|---|
| `ver_catalogo` | Cliente | Ver todas las opciones disponibles |
| `canjear` | Cliente | Crear un Canje con esta opción |

---

## Objeto: `Canje`

**Descripción:** Transacción donde el Cliente usa sus puntos para obtener un beneficio del catálogo.

### Atributos
| Atributo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único |
| `codigo` | string | Código legible (ej: CANJE-2025-0007) |
| `cliente` | FK Cliente | Cliente que realiza el canje |
| `opcion` | FK CanjeOpcion | Opción seleccionada del catálogo |
| `puntos_usados` | integer | Puntos descontados |
| `estado` | enum | `solicitado`, `procesando`, `completado`, `cancelado` |
| `fecha_solicitud` | datetime | Cuando el cliente hizo el canje |
| `fecha_completado` | datetime | Cuando la empresa procesó el canje |
| `notas` | text | Observaciones del procesamiento |

### Acciones
| Acción | Quién | Descripción |
|---|---|---|
| `solicitar` | Cliente | Crear nuevo canje (si tiene saldo suficiente) |
| `cancelar` | Cliente | Cancelar si estado = solicitado |
| `procesar` | Admin, Operador | Marcar como procesando |
| `completar` | Admin, Operador | Confirmar entrega del beneficio |

### Flujo de estados
```
solicitado → procesando → completado
solicitado → cancelado
```

---

## Objeto: `Vehiculo`

**Descripción:** Vehículo de la empresa usado para las recolecciones.

### Atributos
| Atributo | Tipo | Descripción |
|---|---|---|
| `id` | UUID | Identificador único |
| `placa` | string | Placa del vehículo |
| `tipo` | enum | `camioneta`, `camion_pequeno`, `motocicleta` |
| `capacidad_litros` | decimal | Capacidad máxima de carga |
| `conductor_asignado` | FK Usuario | Conductor habitual (opcional) |
| `activo` | boolean | Si está operativo |

---

## Resumen de relaciones

```
Cliente
  ├── tiene muchas → SolicitudRecoleccion
  │     └── si aceptada, genera → Recoleccion
  │                                 └── al completarse, acredita → PuntoCliente
  ├── tiene un → PuntoCliente
  │               └── tiene muchos → Movimientos
  └── tiene muchos → Canje
                       └── pertenece a → CanjeOpcion

Recoleccion
  ├── asignada a → Conductor (Usuario)
  └── usa → Vehiculo
```
