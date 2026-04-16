from typing import Optional
from recoleccion.domain.entity import SolicitudRecoleccion
from recoleccion.domain.repository import SolicitudRecoleccionRepository

class ListarSolicitudesUseCase:
    def __init__(self, repository: SolicitudRecoleccionRepository):
        self.repository = repository
        
    def execute(self) -> list[SolicitudRecoleccion]:
        return self.repository.get_all()

class ObtenerSolicitudUseCase:
    def __init__(self, repository: SolicitudRecoleccionRepository):
        self.repository = repository
        
    def execute(self, solicitud_id: int) -> Optional[SolicitudRecoleccion]:
        return self.repository.get_by_id(solicitud_id)

class CrearSolicitudUseCase:
    def __init__(self, repository: SolicitudRecoleccionRepository):
        self.repository = repository
        
    def execute(self, solicitud: SolicitudRecoleccion) -> SolicitudRecoleccion:
        # Aquí se podría poner lógica de negocio, por ejemplo asignar estado inicial
        if not solicitud.estado:
            solicitud.estado = 'esperando'
        return self.repository.create(solicitud)

class ActualizarSolicitudUseCase:
    def __init__(self, repository: SolicitudRecoleccionRepository):
        self.repository = repository
        
    def execute(self, solicitud: SolicitudRecoleccion) -> SolicitudRecoleccion:
        return self.repository.update(solicitud)

class EliminarSolicitudUseCase:
    def __init__(self, repository: SolicitudRecoleccionRepository):
        self.repository = repository
        
    def execute(self, solicitud_id: int) -> bool:
        return self.repository.delete(solicitud_id)
