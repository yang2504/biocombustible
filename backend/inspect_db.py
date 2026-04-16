"""Inspecciona la BD usando la conexion Django ya configurada."""
import os, sys, django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
sys.path.insert(0, os.path.dirname(__file__))
django.setup()

from django.db import connection

cursor = connection.cursor()

# Listar tablas
cursor.execute('SHOW TABLES')
tables = [row[0] for row in cursor.fetchall()]
print('=== TABLAS EN biocombustible ===')
for t in tables:
    print(f'  - {t}')
print()

# Estructura de cada tabla
for table in tables:
    print(f'=== {table} ===')
    cursor.execute("DESCRIBE `%s`" % table)
    for col in cursor.fetchall():
        print(f'  {col}')

    # Foreign keys
    cursor.execute(
        "SELECT COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME "
        "FROM information_schema.KEY_COLUMN_USAGE "
        "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = %s "
        "AND REFERENCED_TABLE_NAME IS NOT NULL",
        [table]
    )
    fks = cursor.fetchall()
    if fks:
        for fk in fks:
            print(f'  [FK] {fk[0]} -> {fk[1]}.{fk[2]}')
    print()

cursor.close()
print('=== DONE ===')
