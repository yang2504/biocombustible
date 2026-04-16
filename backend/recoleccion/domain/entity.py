from dataclasses import dataclass
from datetime import date, time
from typing import Optional


@dataclass
class SolicitudRecoleccion:
    """Entidad de dominio que representa una solicitud de recolección de aceite."""
    id: int
    id_usuario: Optional[int]
    id_tipo: Optional[int]
    cantidad_litros: Optional[float]
    fecha_solicitud: Optional[date]
    hora_recoleccion: Optional[time]
    fecha_recoleccion: Optional[date]
    estado: Optional[str]  # 'esperando' | 'confirmado' | 'entregado'

    # Campos enriquecidos (joins)
    nombre_usuario: Optional[str] = None
    tipo_aceite_nombre: Optional[str] = None
