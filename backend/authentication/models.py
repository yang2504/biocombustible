from django.db import models


class UsuarioModel(models.Model):
    """
    Modelo Django que mapea la tabla 'users' de la base de datos.
    Sirve para que las migraciones creen la tabla en SQLite (desarrollo)
    y para mantener compatibilidad con MySQL (producción).
    """
    CarnetIdentidad = models.CharField(max_length=45, null=True, blank=True)
    nombre = models.CharField(max_length=45, null=True, blank=True)
    apellido = models.CharField(max_length=45, null=True, blank=True)
    password = models.CharField(max_length=50, null=True, blank=True)
    correoElectronico = models.CharField(max_length=45, null=True, blank=True)
    direccion = models.CharField(max_length=45, null=True, blank=True)
    telefono = models.CharField(max_length=45, null=True, blank=True)
    fechaNacimiento = models.DateField(null=True, blank=True)
    rol = models.IntegerField(null=True, blank=True)

    class Meta:
        db_table = "usuario"

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True
