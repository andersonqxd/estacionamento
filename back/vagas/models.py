from django.db import models

class Vaga(models.Model):
    class SetorChoices(models.TextChoices):
        A = "A", "A"
        B = "B", "B"
        C = "C", "C"
        D = "D", "D"
        E = "E", "E"
        F = "F", "F"
        G = "G", "G"
        H = "H", "H"

    class NumeroChoices(models.IntegerChoices):
        N1 = 1, "1"
        N2 = 2, "2"
        N3 = 3, "3"
        N4 = 4, "4"

    setor = models.CharField(max_length=1, choices=SetorChoices.choices)
    numero = models.PositiveSmallIntegerField(choices=NumeroChoices.choices)
    ocupada = models.BooleanField(default=False)
    ativa = models.BooleanField(default=True)
    criada_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["setor", "numero"],
                name="unique_setor_numero"
            )
        ]
        ordering = ["setor", "numero"]

    def __str__(self):
        return f"{self.setor}{self.numero}"