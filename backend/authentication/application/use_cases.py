from authentication.domain.entity import User
from authentication.domain.repository import UserRepository
from django.contrib.auth.hashers import check_password

class LoginUserUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def execute(self, email: str, password: str) -> User | None:
        """
        Ejecuta el caso de uso de inicio de sesión.
        Valida que el correo exista y que la contraseña coincida.
        """
        user = self.user_repository.find_by_email(email)
        
        if not user or not user.hashed_password:
            return None
            
        # Para compatibilidad con datos existentes, comprobamos si es texto plano o hash
        is_valid_password = False
        if user.hashed_password == password:
            is_valid_password = True
        else:
            is_valid_password = check_password(password, user.hashed_password)
            
        if not is_valid_password:
            return None
            
        return user

class GetUsersUseCase:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
        
    def execute(self) -> list[User]:
        """
        Ejecuta el caso de uso para obtener todos los usuarios registrados.
        """
        return self.user_repository.get_all_users()
