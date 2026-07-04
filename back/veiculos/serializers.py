from django.db import transaction
from rest_framework import serializers
from django.utils import timezone
from .models import Veiculo
from vagas.models import Vaga

class VeiculoSerializer(serializers.ModelSerializer):
    vaga_codigo = serializers.SerializerMethodField()

    class Meta:
        model = Veiculo
        fields = [
            "id",
            "placa",
            "modelo",
            "cor",
            "vaga",
            "vaga_codigo",
            "status",
            "observacao",
            "entrada_em",
            "saida_em",
            "valor_pago",
        ]

    def get_vaga_codigo(self, obj):
        if obj.vaga:
            return f"{obj.vaga.setor}{obj.vaga.numero}"
        return None

    def validate(self, attrs):
        vaga = attrs.get("vaga", getattr(self.instance, "vaga", None))
        status = attrs.get("status", getattr(self.instance, "status", "estacionado"))

        if vaga and not vaga.ativa:
            raise serializers.ValidationError({
                "vaga": "Esta vaga está inativa."
            })

        if vaga and status == "estacionado":
            qs = Veiculo.objects.filter(vaga=vaga, status="estacionado")
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)

            if qs.exists():
                raise serializers.ValidationError({
                    "vaga": "Esta vaga já está ocupada por outro veículo."
                })

        return attrs

    def get_vaga_detalhe(self, obj):
        if not obj.vaga:
            return None
        return {
            "id": obj.vaga.id,
            "setor": obj.vaga.setor,
            "numero": obj.vaga.numero,
            "codigo": f"{obj.vaga.setor}{obj.vaga.numero}",
        }

    @transaction.atomic
    def create(self, validated_data):
        if not validated_data.get("entrada_em"):
            validated_data["entrada_em"] = timezone.now()

        veiculo = Veiculo.objects.create(**validated_data)

        if veiculo.vaga and veiculo.status == "estacionado":
            veiculo.vaga.ocupada = True
            veiculo.vaga.save(update_fields=["ocupada"])

        return veiculo

    @transaction.atomic
    def update(self, instance, validated_data):
        vaga_antiga = instance.vaga
        status_antigo = instance.status

        nova_vaga = validated_data.get("vaga", instance.vaga)
        novo_status = validated_data.get("status", instance.status)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if vaga_antiga and status_antigo == "estacionado" and (
            novo_status == "finalizado" or vaga_antiga != nova_vaga
        ):
            vaga_antiga.ocupada = False
            vaga_antiga.save(update_fields=["ocupada"])

        if novo_status == "estacionado" and nova_vaga:
            nova_vaga.ocupada = True
            nova_vaga.save(update_fields=["ocupada"])

        instance.refresh_from_db()
        return instance