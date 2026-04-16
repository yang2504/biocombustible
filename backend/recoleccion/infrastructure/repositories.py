from django.db import connection
from typing import Optional
from recoleccion.domain.entity import SolicitudRecoleccion
from recoleccion.domain.repository import SolicitudRecoleccionRepository

class MySQLSolicitudRecoleccionRepository(SolicitudRecoleccionRepository):
    
    def _map_row(self, row) -> SolicitudRecoleccion:
        return SolicitudRecoleccion(
            id=row[0],
            id_usuario=row[1],
            id_tipo=row[2],
            cantidad_litros=row[3],
            fecha_solicitud=row[4],
            hora_recoleccion=row[5],
            fecha_recoleccion=row[6],
            estado=row[7],
            nombre_usuario=row[8] if len(row) > 8 else None,
            tipo_aceite_nombre=row[9] if len(row) > 9 else None
        )

    def get_all(self) -> list[SolicitudRecoleccion]:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT s.idsolicita, s.idUsuario, s.idTipo, s.cantidadLitros, 
                       s.fechaSolicitud, s.horaDeRecolec, s.fechaRecolec, s.estado,
                       u.nombre, t.nombre
                FROM solicitudrecoleccion s
                LEFT JOIN usuario u ON s.idUsuario = u.id
                LEFT JOIN tipoaceite t ON s.idTipo = t.idtipoAceite
                ORDER BY s.idsolicita DESC
            """)
            rows = cursor.fetchall()
            return [self._map_row(row) for row in rows]

    def get_by_id(self, solicitud_id: int) -> Optional[SolicitudRecoleccion]:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT s.idsolicita, s.idUsuario, s.idTipo, s.cantidadLitros, 
                       s.fechaSolicitud, s.horaDeRecolec, s.fechaRecolec, s.estado,
                       u.nombre, t.nombre
                FROM solicitudrecoleccion s
                LEFT JOIN usuario u ON s.idUsuario = u.id
                LEFT JOIN tipoaceite t ON s.idTipo = t.idtipoAceite
                WHERE s.idsolicita = %s
            """, [solicitud_id])
            row = cursor.fetchone()
            if row:
                return self._map_row(row)
            return None

    def create(self, solicitud: SolicitudRecoleccion) -> SolicitudRecoleccion:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO solicitudrecoleccion 
                (idUsuario, idTipo, cantidadLitros, fechaSolicitud, horaDeRecolec, fechaRecolec, estado)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, [
                solicitud.id_usuario, solicitud.id_tipo, solicitud.cantidad_litros,
                solicitud.fecha_solicitud, solicitud.hora_recoleccion, 
                solicitud.fecha_recoleccion, solicitud.estado
            ])
            # Obtener el ID insertado
            solicitud.id = cursor.lastrowid
            return solicitud

    def update(self, solicitud: SolicitudRecoleccion) -> SolicitudRecoleccion:
        with connection.cursor() as cursor:
            cursor.execute("""
                UPDATE solicitudrecoleccion 
                SET idUsuario = %s, idTipo = %s, cantidadLitros = %s, 
                    fechaSolicitud = %s, horaDeRecolec = %s, fechaRecolec = %s, estado = %s
                WHERE idsolicita = %s
            """, [
                solicitud.id_usuario, solicitud.id_tipo, solicitud.cantidad_litros,
                solicitud.fecha_solicitud, solicitud.hora_recoleccion, 
                solicitud.fecha_recoleccion, solicitud.estado, solicitud.id
            ])
            return solicitud

    def delete(self, solicitud_id: int) -> bool:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM solicitudrecoleccion WHERE idsolicita = %s", [solicitud_id])
            return cursor.rowcount > 0
