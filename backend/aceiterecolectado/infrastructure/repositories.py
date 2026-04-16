from django.db import connection
from typing import Optional
from aceiterecolectado.domain.entity import AceiteRecolectado
from aceiterecolectado.domain.repository import AceiteRecolectadoRepository

class MySQLAceiteRecolectadoRepository(AceiteRecolectadoRepository):
    
    def _map_row(self, row) -> AceiteRecolectado:
        return AceiteRecolectado(
            id=row[0],
            tipo_aceite=row[1],
            fecha_almacen=row[2],
            cantidad_aceite=row[3],
            observaciones=row[4]
        )

    def get_all(self) -> list[AceiteRecolectado]:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT idRecoleccion, tipoDeAceite, fechaAlmacen, cantidadAceite, observaciones
                FROM aceiterecolectado
                ORDER BY idRecoleccion DESC
            """)
            rows = cursor.fetchall()
            return [self._map_row(row) for row in rows]

    def get_by_id(self, aceite_id: int) -> Optional[AceiteRecolectado]:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT idRecoleccion, tipoDeAceite, fechaAlmacen, cantidadAceite, observaciones
                FROM aceiterecolectado
                WHERE idRecoleccion = %s
            """, [aceite_id])
            row = cursor.fetchone()
            if row:
                return self._map_row(row)
            return None

    def create(self, aceite: AceiteRecolectado) -> AceiteRecolectado:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO aceiterecolectado 
                (tipoDeAceite, fechaAlmacen, cantidadAceite, observaciones)
                VALUES (%s, %s, %s, %s)
            """, [
                aceite.tipo_aceite, aceite.fecha_almacen, 
                aceite.cantidad_aceite, aceite.observaciones
            ])
            aceite.id = cursor.lastrowid
            return aceite

    def update(self, aceite: AceiteRecolectado) -> AceiteRecolectado:
        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE aceiterecolectado 
                SET tipoDeAceite = %s, fechaAlmacen = %s, cantidadAceite = %s, observaciones = %s
                WHERE idRecoleccion = %s
            """, [
                aceite.tipo_aceite, aceite.fecha_almacen, 
                aceite.cantidad_aceite, aceite.observaciones, aceite.id
            ])
            return aceite

    def delete(self, aceite_id: int) -> bool:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM aceiterecolectado WHERE idRecoleccion = %s", [aceite_id])
            return cursor.rowcount > 0
