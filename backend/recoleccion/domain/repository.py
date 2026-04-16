from abc import ABC, abstractmethod
from typing import Optional
from recoleccion.domain.entity import SolicitudRecoleccion


class SolicitudRecoleccionRepository(ABC):
    """Puerto de dominio (interfaz) para el repositorio de solicitudes de recolección."""

    @abstractmethod
    def get_all(self) -> list[SolicitudRecoleccion]:
        pass

    @abstractmethod
    def get_by_id(self, solicitud_id: int) -> Optional[SolicitudRecoleccion]:
        pass

    @abstractmethod
    def create(self, solicitud: SolicitudRecoleccion) -> SolicitudRecoleccion:
        pass

    @abstractmethod
    def update(self, solicitud: SolicitudRecoleccion) -> SolicitudRecoleccion:
        pass

    @abstractmethod
    def delete(self, solicitud_id: int) -> bool:
        pass
