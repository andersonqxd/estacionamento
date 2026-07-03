from django.utils import timezone
from django.db.models import Count, Sum, Avg
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Veiculo
from .serializers import  VeiculoSerializer
from .pagination import VeiculoPagination



class VeiculoViewSet(viewsets.ModelViewSet):
    queryset = Veiculo.objects.all().order_by('-entrada_em')
    serializer_class = VeiculoSerializer
    filterset_fields = ['tipo', 'status']
    search_fields    = ['placa', 'modelo', 'cor', 'vaga']
    ordering_fields  = ['entrada_em', 'placa', 'modelo']
    pagination_class = VeiculoPagination

#       AÇÕES DO CRUD
    @action(detail=True, methods=['post'])
    def registrar_saida(self, request, pk=None):
        veiculo = self.get_object()

        if veiculo.status == 'finalizado':
            return Response(
                {'erro': 'Este veículo já foi finalizado.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        valor_pago = request.data.get('valor_pago')

        veiculo.saida_em = timezone.now()
        veiculo.status = 'finalizado'

        if valor_pago:
            veiculo.valor_pago = valor_pago

        veiculo.save()

        serializer = self.get_serializer(veiculo)
        return Response(serializer.data, status=status.HTTP_200_OK)


class  DashboardAPIView(APIView):
    def get(self, req) :
        date = timezone.now().date()
        
        total_veiculos = Veiculo.objects.count()
        veiculos_ativos = Veiculo.objects.filter(status='estacionado').count()
        veiculos_finalizados = Veiculo.objects.filter(status='finalizado').count()

        lucro_total = Veiculo.objects.filter(
            status='finalizado'
        ).aggregate(total=Sum('valor_pago'))['total'] or 0

        lucro_hoje = Veiculo.objects.filter(
            status='finalizado',
            saida_em__date=date
        ).aggregate(total=Sum('valor_pago'))['total'] or 0

        ticket_medio = Veiculo.objects.filter(
            status='finalizado'
        ).aggregate(media=Avg('valor_pago'))['media'] or 0

        return Response({
            'total_veiculos': total_veiculos,
            'veiculos_ativos': veiculos_ativos,
            'veiculos_finalizados': veiculos_finalizados,
            'lucro_total': lucro_total,
            'lucro_hoje': lucro_hoje,
            'ticket_medio': ticket_medio,
        })
