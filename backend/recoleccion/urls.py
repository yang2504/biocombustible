from django.urls import path
from recoleccion.views import SolicitudRecoleccionListView, SolicitudRecoleccionDetailView

urlpatterns = [
    path('solicitudes/', SolicitudRecoleccionListView.as_view(), name='solicitud-list'),
    path('solicitudes/<int:pk>/', SolicitudRecoleccionDetailView.as_view(), name='solicitud-detail'),
]
