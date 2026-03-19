"""
Custom MySQL/MariaDB backend que omite la validación de versión mínima
y deshabilita el uso de RETURNING en INSERT (no soportado en MariaDB 10.4).
Django 5.x requiere >= 10.6 oficialmente, pero las queries usadas
funcionan sin problemas en 10.4.
"""
from django.db.backends.mysql.base import DatabaseWrapper as MySQLDatabaseWrapper
from django.db.backends.mysql.features import DatabaseFeatures as MySQLFeatures


class DatabaseFeatures(MySQLFeatures):
    """Desactiva features de MariaDB >= 10.6 para compatibilidad con 10.4."""
    can_return_rows_from_bulk_insert = False
    can_return_columns_from_insert = False


class DatabaseWrapper(MySQLDatabaseWrapper):
    features_class = DatabaseFeatures

    def check_database_version_supported(self):
        # Omitimos la validación de versión mínima de MariaDB/MySQL
        pass

