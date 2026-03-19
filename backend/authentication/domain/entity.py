from dataclasses import dataclass
from datetime import date

@dataclass
class User:
    id: int
    carnet_identidad: str | None
    nombre: str | None
    apellido: str | None
    hashed_password: str | None
    correo_electronico: str | None
    direccion: str | None
    telefono: str | None
    fecha_nacimiento: date | None
    rol: int | None