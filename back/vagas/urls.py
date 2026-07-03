from rest_framework.routers import DefaultRouter
from .views import VagaViewSet

router = DefaultRouter()
router.register(r"vagas", VagaViewSet, basename="vaga")

urlpatterns = router.urls