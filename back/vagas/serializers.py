from rest_framework import serializers
from .models import Vaga

class VagaSerializer(serializers.ModelSerializer):
    codigo = serializers.SerializerMethodField()

    class Meta:
        model = Vaga
        fields = [
            "id",
            "setor",
            "numero",
            "codigo",
            "ocupada",
            "ativa",
            "criada_em",
        ]

    def get_codigo(self, obj):
        return f"{obj.setor}{obj.numero}"