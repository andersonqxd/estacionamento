from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VeiculoViewSet, DashboardAPIView

router = DefaultRouter()
router.register(r'veiculos', VeiculoViewSet, basename='veiculo')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', DashboardAPIView.as_view(), name='dashboard'),
]