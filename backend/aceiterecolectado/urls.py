from django.urls import path
from aceiterecolectado.views import AceiteRecolectadoListView, AceiteRecolectadoDetailView

urlpatterns = [
    path('aceites/', AceiteRecolectadoListView.as_view(), name='aceite-list'),
    path('aceites/<int:pk>/', AceiteRecolectadoDetailView.as_view(), name='aceite-detail'),
]
