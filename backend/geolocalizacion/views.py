from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from geolocalizacion.application.geo_service import GeoService


class GeolocalizacionView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.geo_service = GeoService()

    def get(self, request):
        direccion = request.query_params.get("direccion")

        if not direccion:
            return Response(
                {"error": "El parámetro 'direccion' es requerido."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        resultado = self.geo_service.obtener_coordenadas(direccion)

        if resultado.get("error"):
            return Response(resultado, status=status.HTTP_404_NOT_FOUND)

        return Response(resultado, status=status.HTTP_200_OK)
