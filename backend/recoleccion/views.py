from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from recoleccion.domain.entity import SolicitudRecoleccion
from recoleccion.infrastructure.repositories import MySQLSolicitudRecoleccionRepository
from recoleccion.application.use_cases import (
    ListarSolicitudesUseCase, 
    ObtenerSolicitudUseCase, 
    CrearSolicitudUseCase, 
    ActualizarSolicitudUseCase, 
    EliminarSolicitudUseCase
)

class SolicitudRecoleccionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        repo = MySQLSolicitudRecoleccionRepository()
        use_case = ListarSolicitudesUseCase(repo)
        solicitudes = use_case.execute()
        
        data = [{
            "id": s.id,
            "id_usuario": s.id_usuario,
            "id_tipo": s.id_tipo,
            "cantidad_litros": s.cantidad_litros,
            "fecha_solicitud": s.fecha_solicitud,
            "hora_recoleccion": s.hora_recoleccion,
            "fecha_recoleccion": s.fecha_recoleccion,
            "estado": s.estado,
            "nombre_usuario": s.nombre_usuario,
            "tipo_aceite_nombre": s.tipo_aceite_nombre
        } for s in solicitudes]
        
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        repo = MySQLSolicitudRecoleccionRepository()
        use_case = CrearSolicitudUseCase(repo)
        
        # Mapear data del request a entidad
        solicitud = SolicitudRecoleccion(
            id=0,
            id_usuario=request.data.get('id_usuario'),
            id_tipo=request.data.get('id_tipo'),
            cantidad_litros=request.data.get('cantidad_litros'),
            fecha_solicitud=request.data.get('fecha_solicitud'),
            hora_recoleccion=request.data.get('hora_recoleccion'),
            fecha_recoleccion=request.data.get('fecha_recoleccion'),
            estado=request.data.get('estado')
        )
        
        try:
            nueva_solicitud = use_case.execute(solicitud)
            return Response({"id": nueva_solicitud.id, "message": "Solicitud creada exitosamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class SolicitudRecoleccionDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        repo = MySQLSolicitudRecoleccionRepository()
        use_case = ObtenerSolicitudUseCase(repo)
        
        solicitud = use_case.execute(pk)
        if not solicitud:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
            
        data = {
            "id": solicitud.id,
            "id_usuario": solicitud.id_usuario,
            "id_tipo": solicitud.id_tipo,
            "cantidad_litros": solicitud.cantidad_litros,
            "fecha_solicitud": solicitud.fecha_solicitud,
            "hora_recoleccion": solicitud.hora_recoleccion,
            "fecha_recoleccion": solicitud.fecha_recoleccion,
            "estado": solicitud.estado,
            "nombre_usuario": solicitud.nombre_usuario,
            "tipo_aceite_nombre": solicitud.tipo_aceite_nombre
        }
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        repo = MySQLSolicitudRecoleccionRepository()
        
        # Validar existencia
        existente = ObtenerSolicitudUseCase(repo).execute(pk)
        if not existente:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
            
        use_case = ActualizarSolicitudUseCase(repo)
        
        # Actualizar campos
        solicitud = SolicitudRecoleccion(
            id=pk,
            id_usuario=request.data.get('id_usuario', existente.id_usuario),
            id_tipo=request.data.get('id_tipo', existente.id_tipo),
            cantidad_litros=request.data.get('cantidad_litros', existente.cantidad_litros),
            fecha_solicitud=request.data.get('fecha_solicitud', existente.fecha_solicitud),
            hora_recoleccion=request.data.get('hora_recoleccion', existente.hora_recoleccion),
            fecha_recoleccion=request.data.get('fecha_recoleccion', existente.fecha_recoleccion),
            estado=request.data.get('estado', existente.estado)
        )
        
        try:
            use_case.execute(solicitud)
            return Response({"message": "Actualizada exitosamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        repo = MySQLSolicitudRecoleccionRepository()
        use_case = EliminarSolicitudUseCase(repo)
        
        eliminado = use_case.execute(pk)
        if eliminado:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
