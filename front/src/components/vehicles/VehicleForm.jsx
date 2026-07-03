function VehicleForm({
  form,
  editandoId,
  onChange,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <div className="card form-card">
      <h2>{editandoId ? 'Editar veículo' : 'Novo veículo'}</h2>

      <form onSubmit={onSubmit} className="form">
        <input
          name="placa"
          placeholder="Placa"
          value={form.placa}
          onChange={onChange}
          required
        />

        <input
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={onChange}
          required
        />

        <input
          name="cor"
          placeholder="Cor"
          value={form.cor}
          onChange={onChange}
          required
        />

        <select name="tipo" value={form.tipo} onChange={onChange}>
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
          <option value="suv">SUV</option>
          <option value="caminhonete">Caminhonete</option>
        </select>

        <input
          name="vaga"
          placeholder="Vaga"
          value={form.vaga}
          onChange={onChange}
        />

        <select name="status" value={form.status} onChange={onChange}>
          <option value="estacionado">Estacionado</option>
          <option value="reservado">Reservado</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <textarea
          name="observacao"
          placeholder="Observação"
          value={form.observacao}
          onChange={onChange}
        />

        <button type="submit" className="primary">
          {editandoId ? 'Salvar alterações' : 'Cadastrar veículo'}
        </button>

        {editandoId && (
          <button type="button" className="ghost" onClick={onCancelEdit}>
            Cancelar edição
          </button>
        )}
      </form>
    </div>
  );
}

export default VehicleForm;