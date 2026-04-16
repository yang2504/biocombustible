from typing import Optional
from aceiterecolectado.domain.entity import AceiteRecolectado
from aceiterecolectado.domain.repository import AceiteRecolectadoRepository

class ListarAceiteUseCase:
    def __init__(self, repository: AceiteRecolectadoRepository):
        self.repository = repository
        
    def execute(self) -> list[AceiteRecolectado]:
        return self.repository.get_all()

class ObtenerAceiteUseCase:
    def __init__(self, repository: AceiteRecolectadoRepository):
        self.repository = repository
        
    def execute(self, aceite_id: int) -> Optional[AceiteRecolectado]:
        return self.repository.get_by_id(aceite_id)

class CrearAceiteUseCase:
    def __init__(self, repository: AceiteRecolectadoRepository):
        self.repository = repository
        
    def execute(self, aceite: AceiteRecolectado) -> AceiteRecolectado:
        return self.repository.create(aceite)

class ActualizarAceiteUseCase:
    def __init__(self, repository: AceiteRecolectadoRepository):
        self.repository = repository
        
    def execute(self, aceite: AceiteRecolectado) -> AceiteRecolectado:
        return self.repository.update(aceite)

class EliminarAceiteUseCase:
    def __init__(self, repository: AceiteRecolectadoRepository):
        self.repository = repository
        
    def execute(self, aceite_id: int) -> bool:
        return self.repository.delete(aceite_id)
