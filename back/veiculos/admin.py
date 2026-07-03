from django.contrib import admin
from .models import Veiculo

@admin.register(Veiculo)
class VeiculoAdmin(admin.ModelAdmin):
    list_display = ('placa', 'modelo', 'cor', 'tipo', 'vaga', 'status', 'entrada_em')
    search_fields = ('placa', 'modelo', 'cor', 'vaga')
    list_filter = ('tipo', 'status', 'entrada_em')
    ordering = ('-entrada_em',)