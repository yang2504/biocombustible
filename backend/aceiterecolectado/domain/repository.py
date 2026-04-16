from abc import ABC, abstractmethod
from typing import Optional
from aceiterecolectado.domain.entity import AceiteRecolectado

class AceiteRecolectadoRepository(ABC):
    @abstractmethod
    def get_all(self) -> list[AceiteRecolectado]:
        pass

    @abstractmethod
    def get_by_id(self, aceite_id: int) -> Optional[AceiteRecolectado]:
        pass

    @abstractmethod
    def create(self, aceite: AceiteRecolectado) -> AceiteRecolectado:
        pass

    @abstractmethod
    def update(self, aceite: AceiteRecolectado) -> AceiteRecolectado:
        pass

    @abstractmethod
    def delete(self, aceite_id: int) -> bool:
        pass
