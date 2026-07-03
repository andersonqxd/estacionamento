from django.contrib import admin
from .models import Veiculo

@admin.register(Veiculo)
class VeiculoAdmin(admin.ModelAdmin):
    list_display = ("id", "placa", "modelo", "cor", "status", "vaga", "entrada_em")
    list_filter = ("status", "entrada_em")
    search_fields = ("placa", "modelo", "cor")
    ordering = ("-entrada_em",)