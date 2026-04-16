from typing import Optional
from pretratamiento.domain.entity import Pretratamiento
from pretratamiento.domain.repository import PretratamientoRepository

class ListarPretratamientosUseCase:
    def __init__(self, repository: PretratamientoRepository):
        self.repository = repository
        
    def execute(self) -> list[Pretratamiento]:
        return self.repository.get_all()

class ObtenerPretratamientoUseCase:
    def __init__(self, repository: PretratamientoRepository):
        self.repository = repository
        
    def execute(self, pretratamiento_id: int) -> Optional[Pretratamiento]:
        return self.repository.get_by_id(pretratamiento_id)

class CrearPretratamientoUseCase:
    def __init__(self, repository: PretratamientoRepository):
        self.repository = repository
        
    def execute(self, pretratamiento: Pretratamiento) -> Pretratamiento:
        return self.repository.create(pretratamiento)

class ActualizarPretratamientoUseCase:
    def __init__(self, repository: PretratamientoRepository):
        self.repository = repository
        
    def execute(self, pretratamiento: Pretratamiento) -> Pretratamiento:
        return self.repository.update(pretratamiento)

class EliminarPretratamientoUseCase:
    def __init__(self, repository: PretratamientoRepository):
        self.repository = repository
        
    def execute(self, pretratamiento_id: int) -> bool:
        return self.repository.delete(pretratamiento_id)
