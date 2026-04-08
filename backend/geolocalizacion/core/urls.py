from django.urls import path
from geolocalizacion.views import GeolocalizacionView

urlpatterns = [
    path("api/geolocalizacion/", GeolocalizacionView.as_view(), name="geolocalizacion"),
]
