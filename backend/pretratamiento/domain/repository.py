from abc import ABC, abstractmethod
from typing import Optional
from pretratamiento.domain.entity import Pretratamiento

class PretratamientoRepository(ABC):
    @abstractmethod
    def get_all(self) -> list[Pretratamiento]:
        pass

    @abstractmethod
    def get_by_id(self, pretratamiento_id: int) -> Optional[Pretratamiento]:
        pass

    @abstractmethod
    def create(self, pretratamiento: Pretratamiento) -> Pretratamiento:
        pass

    @abstractmethod
    def update(self, pretratamiento: Pretratamiento) -> Pretratamiento:
        pass

    @abstractmethod
    def delete(self, pretratamiento_id: int) -> bool:
        pass
