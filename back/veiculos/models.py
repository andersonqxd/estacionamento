from django.db import models
from django.utils import timezone

class Veiculo(models.Model):
    STATUS_CHOICES = [
        ("estacionado", "Estacionado"),
        ("reservado", "Reservado"),
        ("finalizado", "Finalizado"),
    ]

    placa = models.CharField(max_length=10)
    modelo = models.CharField(max_length=100)
    cor = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="estacionado")
    vaga = models.ForeignKey("vagas.Vaga", on_delete=models.PROTECT)
    entrada_em = models.DateTimeField(default=timezone.now)
    saida_em = models.DateTimeField(null=True, blank=True)
    valor_pago = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    observacao = models.TextField(blank=True)

    def __str__(self):
        return f"{self.placa} - {self.modelo}"