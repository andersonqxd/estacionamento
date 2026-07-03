from rest_framework import serializers
from .models import Veiculo

class VeiculoSerializer(serializers.ModelSerializer):
    tempo_permanencia_segundos = serializers.SerializerMethodField()
    tempo_permanencia_formatado = serializers.SerializerMethodField()

    class Meta:
        model = Veiculo
        fields = [
            'id',
            'placa',
            'modelo',
            'cor',
            'tipo',
            'vaga',
            'status',
            'observacao',
            'entrada_em',
            'saida_em',
            'valor_pago',
            'tempo_permanencia_segundos',
            'tempo_permanencia_formatado',
        ]

    def get_tempo_permanencia_segundos(self, obj):
        if obj.entrada_em and obj.saida_em:
            return int((obj.saida_em - obj.entrada_em).total_seconds())
        return None

    def get_tempo_permanencia_formatado(self, obj):
        if obj.entrada_em and obj.saida_em:
            total_segundos = int((obj.saida_em - obj.entrada_em).total_seconds())
            horas = total_segundos // 3600
            minutos = (total_segundos % 3600) // 60
            return f'{horas}h {minutos}min'
        return None