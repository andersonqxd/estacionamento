from django.db import transaction
from rest_framework import serializers

from .models import Veiculo
from vagas.models import Vaga


class VeiculoSerializer(serializers.ModelSerializer):
    vaga = serializers.PrimaryKeyRelatedField(queryset=Vaga.objects.all())
    vaga_codigo = serializers.SerializerMethodField()

    class Meta:
        model = Veiculo
        fields = [
            "id",
            "placa",
            "modelo",
            "cor",
            "status",
            "vaga",
            "vaga_codigo",
            "entrada_em",
            "saida_em",
            "valor_pago",
            "observacao",
        ]

    def get_vaga_codigo(self, obj):
        if obj.vaga:
            return f"{obj.vaga.setor}{obj.vaga.numero}"
        return None

    def validate(self, attrs):
        vaga = attrs.get("vaga", getattr(self.instance, "vaga", None))
        status = attrs.get("status", getattr(self.instance, "status", "estacionado"))

        if vaga and status == "estacionado":
            qs = Veiculo.objects.filter(vaga=vaga, status="estacionado")
            if self.instance:
                qs = qs.exclude(pk=self.instance.pk)

            if qs.exists():
                raise serializers.ValidationError({
                    "vaga": "Esta vaga já está ocupada por outro veículo."
                })

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        vaga = validated_data.get("vaga")
        status = validated_data.get("status")

        veiculo = Veiculo.objects.create(**validated_data)

        if vaga and status == "estacionado":
            vaga.ocupada = True
            vaga.save(update_fields=["ocupada"])

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

        if status_antigo == "estacionado" and (
            novo_status == "finalizado" or vaga_antiga != nova_vaga
        ):
            vaga_antiga.ocupada = False
            vaga_antiga.save(update_fields=["ocupada"])

        if novo_status == "estacionado" and nova_vaga:
            nova_vaga.ocupada = True
            nova_vaga.save(update_fields=["ocupada"])

        instance.refresh_from_db()
        return instance