from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass
class Pretratamiento:
    """Entidad de dominio para el pretratamiento de aceite."""
    id: int
    id_recepcion: Optional[int]
    fecha_inicio: Optional[date]
    metodo_filtrado: Optional[str]
    tiempo_sedimentacion: Optional[str]
    porcentaje_impurezas: Optional[float]
    temperatura_proceso: Optional[float]
    observaciones: Optional[str]
