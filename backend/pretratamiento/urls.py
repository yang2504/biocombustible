from django.urls import path
from pretratamiento.views import PretratamientoListView, PretratamientoDetailView

urlpatterns = [
    path('pretratamientos/', PretratamientoListView.as_view(), name='pretratamiento-list'),
    path('pretratamientos/<int:pk>/', PretratamientoDetailView.as_view(), name='pretratamiento-detail'),
]
