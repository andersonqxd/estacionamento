from datetime import datetime, time
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models


placa_validator = RegexValidator(
    regex=r'^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$',
    message='Informe uma placa válida no padrão Mercosul, como ABC1D23.',
    code='invalid_placa'
)

class Veiculo(models.Model):
    TIPO_CHOICES = [
        ('carro', 'Carro'),
        ('moto', 'Moto'),
        ('suv', 'SUV'),
        ('caminhonete', 'Caminhonete'),
    ]

    STATUS_CHOICES = [
        ('estacionado', 'Estacionado'),
        ('reservado', 'Reservado'),
        ('finalizado', 'Finalizado'),
    ]

    placa = models.CharField(max_length=7, unique=True, validators=[placa_validator])
    modelo = models.CharField(max_length=100)
    cor = models.CharField(max_length=50)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    vaga = models.CharField(max_length=10, blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='estacionado')
    observacao = models.TextField(blank=True, default='')
    entrada_em = models.DateTimeField(auto_now_add=True)
    saida_em = models.DateTimeField(null=True, blank=True)
    valor_pago = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    def clean(self):
        self.placa = self.placa.upper().strip()

        if self.status == 'reservado' and not self.vaga:
            raise ValidationError({'vaga': 'Um veículo reservado deve ter uma vaga informada.'})

        entrada = self.entrada_em
        saida = self.saida_em

        if isinstance(entrada, datetime) is False and entrada:
            entrada = datetime.combine(entrada, time.min)

        if isinstance(saida, datetime) is False and saida:
            saida = datetime.combine(saida, time.min)

        if saida and entrada and saida < entrada:
            raise ValidationError({'saida_em': 'A saída não pode ser anterior à entrada.'})

    def __str__(self):
        return f'{self.placa} - {self.modelo}'

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)