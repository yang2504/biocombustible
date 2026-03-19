from abc import ABC, abstractmethod
from authentication.domain.entity import User

class UserRepository(ABC):
    @abstractmethod
    def find_by_email(self, email: str) -> User | None:
        pass
        
    @abstractmethod
    def get_all_users(self) -> list[User]:
        pass