from django.db import connection
from authentication.domain.entity import User
from authentication.domain.repository import UserRepository

class MySQLUserRepository(UserRepository):
    def _map_row_to_user(self, row) -> User:
        return User(
            id=row[0],
            carnet_identidad=row[1],
            nombre=row[2],
            apellido=row[3],
            hashed_password=row[4],
            correo_electronico=row[5],
            direccion=row[6],
            telefono=row[7],
            fecha_nacimiento=row[8],
            rol=row[9]
        )

    def find_by_email(self, email: str) -> User | None:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, CarnetIdentidad, nombre, apellido, password, 
                       correoElectronico, direccion, telefono, fechaNacimiento, rol 
                FROM usuario 
                WHERE correoElectronico = %s
                """,
                [email]
            )
            row = cursor.fetchone()
            
        if row:
            return self._map_row_to_user(row)
        return None

    def get_all_users(self) -> list[User]:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, CarnetIdentidad, nombre, apellido, password, 
                       correoElectronico, direccion, telefono, fechaNacimiento, rol 
                FROM usuario
                """
            )
            rows = cursor.fetchall()
            
        return [self._map_row_to_user(row) for row in rows]