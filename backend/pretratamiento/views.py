from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from pretratamiento.domain.entity import Pretratamiento
from pretratamiento.infrastructure.repositories import MySQLPretratamientoRepository
from pretratamiento.application.use_cases import (
    ListarPretratamientosUseCase,
    ObtenerPretratamientoUseCase,
    CrearPretratamientoUseCase,
    ActualizarPretratamientoUseCase,
    EliminarPretratamientoUseCase
)

class PretratamientoListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        repo = MySQLPretratamientoRepository()
        use_case = ListarPretratamientosUseCase(repo)
        items = use_case.execute()
        
        data = [{
            "id": i.id,
            "id_recepcion": i.id_recepcion,
            "fecha_inicio": i.fecha_inicio,
            "metodo_filtrado": i.metodo_filtrado,
            "tiempo_sedimentacion": i.tiempo_sedimentacion,
            "porcentaje_impurezas": i.porcentaje_impurezas,
            "temperatura_proceso": i.temperatura_proceso,
            "observaciones": i.observaciones
        } for i in items]
        
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        repo = MySQLPretratamientoRepository()
        use_case = CrearPretratamientoUseCase(repo)
        
        pretratamiento = Pretratamiento(
            id=0,
            id_recepcion=request.data.get('id_recepcion'),
            fecha_inicio=request.data.get('fecha_inicio'),
            metodo_filtrado=request.data.get('metodo_filtrado'),
            tiempo_sedimentacion=request.data.get('tiempo_sedimentacion'),
            porcentaje_impurezas=request.data.get('porcentaje_impurezas'),
            temperatura_proceso=request.data.get('temperatura_proceso'),
            observaciones=request.data.get('observaciones')
        )
        
        try:
            nuevo = use_case.execute(pretratamiento)
            return Response({"id": nuevo.id, "message": "Pretratamiento creado exitosamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PretratamientoDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        repo = MySQLPretratamientoRepository()
        use_case = ObtenerPretratamientoUseCase(repo)
        
        item = use_case.execute(pk)
        if not item:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
            
        data = {
            "id": item.id,
            "id_recepcion": item.id_recepcion,
            "fecha_inicio": item.fecha_inicio,
            "metodo_filtrado": item.metodo_filtrado,
            "tiempo_sedimentacion": item.tiempo_sedimentacion,
            "porcentaje_impurezas": item.porcentaje_impurezas,
            "temperatura_proceso": item.temperatura_proceso,
            "observaciones": item.observaciones
        }
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        repo = MySQLPretratamientoRepository()
        
        existente = ObtenerPretratamientoUseCase(repo).execute(pk)
        if not existente:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
            
        use_case = ActualizarPretratamientoUseCase(repo)
        
        pretratamiento = Pretratamiento(
            id=pk,
            id_recepcion=request.data.get('id_recepcion', existente.id_recepcion),
            fecha_inicio=request.data.get('fecha_inicio', existente.fecha_inicio),
            metodo_filtrado=request.data.get('metodo_filtrado', existente.metodo_filtrado),
            tiempo_sedimentacion=request.data.get('tiempo_sedimentacion', existente.tiempo_sedimentacion),
            porcentaje_impurezas=request.data.get('porcentaje_impurezas', existente.porcentaje_impurezas),
            temperatura_proceso=request.data.get('temperatura_proceso', existente.temperatura_proceso),
            observaciones=request.data.get('observaciones', existente.observaciones)
        )
        
        try:
            use_case.execute(pretratamiento)
            return Response({"message": "Actualizada exitosamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        repo = MySQLPretratamientoRepository()
        use_case = EliminarPretratamientoUseCase(repo)
        
        eliminado = use_case.execute(pk)
        if eliminado:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
