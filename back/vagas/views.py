from rest_framework import viewsets
from rest_framework.request import Request

from .models import Vaga
from .serializers import VagaSerializer


class VagaViewSet(viewsets.ModelViewSet):
    serializer_class = VagaSerializer

    def get_queryset(self):
        request: Request = self.request
        queryset = Vaga.objects.all().order_by("setor", "numero")

        ocupada = request.query_params.get("ocupada")
        ativa = request.query_params.get("ativa")

        if ocupada is not None:
            queryset = queryset.filter(ocupada=ocupada.lower() == "true")

        if ativa is not None:
            queryset = queryset.filter(ativa=ativa.lower() == "true")

        return queryset