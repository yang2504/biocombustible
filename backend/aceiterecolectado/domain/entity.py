from dataclasses import dataclass
from datetime import date
from typing import Optional

@dataclass
class AceiteRecolectado:
    """Entidad de dominio que representa aceite recolectado y almacenado."""
    id: int
    tipo_aceite: Optional[str]
    fecha_almacen: Optional[date]
    cantidad_aceite: Optional[float]
    observaciones: Optional[str]
