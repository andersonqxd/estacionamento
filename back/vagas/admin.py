from django.contrib import admin
from .models import Vaga

@admin.register(Vaga)
class VagaAdmin(admin.ModelAdmin):
    list_display = ("id", "setor", "numero", "ocupada", "ativa", "criada_em")
    list_filter = ("setor", "ocupada", "ativa")
    search_fields = ("setor",)
    ordering = ("setor", "numero")