from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from aceiterecolectado.domain.entity import AceiteRecolectado
from aceiterecolectado.infrastructure.repositories import MySQLAceiteRecolectadoRepository
from aceiterecolectado.application.use_cases import (
    ListarAceiteUseCase, ObtenerAceiteUseCase, CrearAceiteUseCase,
    ActualizarAceiteUseCase, EliminarAceiteUseCase
)

class AceiteRecolectadoListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        repo = MySQLAceiteRecolectadoRepository()
        use_case = ListarAceiteUseCase(repo)
        aceites = use_case.execute()
        
        data = [{
            "id": a.id,
            "tipo_aceite": a.tipo_aceite,
            "fecha_almacen": a.fecha_almacen,
            "cantidad_aceite": a.cantidad_aceite,
            "observaciones": a.observaciones
        } for a in aceites]
        
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        repo = MySQLAceiteRecolectadoRepository()
        use_case = CrearAceiteUseCase(repo)
        
        aceite = AceiteRecolectado(
            id=0,
            tipo_aceite=request.data.get('tipo_aceite'),
            fecha_almacen=request.data.get('fecha_almacen'),
            cantidad_aceite=request.data.get('cantidad_aceite'),
            observaciones=request.data.get('observaciones')
        )
        
        try:
            nuevo_aceite = use_case.execute(aceite)
            return Response({"id": nuevo_aceite.id, "message": "Aceite registrado"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AceiteRecolectadoDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        repo = MySQLAceiteRecolectadoRepository()
        use_case = ObtenerAceiteUseCase(repo)
        
        aceite = use_case.execute(pk)
        if not aceite:
            return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
            
        data = {
            "id": aceite.id,
            "tipo_aceite": aceite.tipo_aceite,
            "fecha_almacen": aceite.fecha_almacen,
            "cantidad_aceite": aceite.cantidad_aceite,
            "observaciones": aceite.observaciones
        }
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        repo = MySQLAceiteRecolectadoRepository()
        existente = ObtenerAceiteUseCase(repo).execute(pk)
        if not existente:
            return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
            
        use_case = ActualizarAceiteUseCase(repo)
        aceite = AceiteRecolectado(
            id=pk,
            tipo_aceite=request.data.get('tipo_aceite', existente.tipo_aceite),
            fecha_almacen=request.data.get('fecha_almacen', existente.fecha_almacen),
            cantidad_aceite=request.data.get('cantidad_aceite', existente.cantidad_aceite),
            observaciones=request.data.get('observaciones', existente.observaciones)
        )
        
        try:
            use_case.execute(aceite)
            return Response({"message": "Actualizado"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        repo = MySQLAceiteRecolectadoRepository()
        use_case = EliminarAceiteUseCase(repo)
        
        eliminado = use_case.execute(pk)
        if eliminado:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "No encontrado"}, status=status.HTTP_404_NOT_FOUND)
