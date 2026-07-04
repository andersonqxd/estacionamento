function VehicleForm({
  form,
  vagas = [],
  editandoId,
  error,
  submitting,
  onChange,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <form onSubmit={onSubmit} className="form" aria-label="Formulário de veículo">
      <p className="form-help">
        Campos marcados com <span aria-hidden="true">*</span> são obrigatórios.
      </p>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="placa">
            Placa <span aria-hidden="true">*</span>
          </label>
          <input
            id="placa"
            name="placa"
            placeholder="Ex.: ABC1D23"
            value={form.placa}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="modelo">
            Modelo <span aria-hidden="true">*</span>
          </label>
          <input
            id="modelo"
            name="modelo"
            placeholder="Ex.: Gol"
            value={form.modelo}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="cor">
            Cor <span aria-hidden="true">*</span>
          </label>
          <input
            id="cor"
            name="cor"
            placeholder="Ex.: Prata"
            value={form.cor}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="vaga">
            Vaga <span aria-hidden="true">*</span>
          </label>
          <select
            id="vaga"
            name="vaga"
            value={form.vaga}
            onChange={onChange}
            required
          >
            <option value="">Selecione uma vaga</option>
            {vagas.map((vaga) => (
              <option key={vaga.id} value={vaga.id}>
                {vaga.codigo}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={onChange}
          >
            <option value="estacionado">Estacionado</option>
            <option value="reservado">Reservado</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>

        <div className="form-field form-field-full">
          <label htmlFor="observacao">Observação</label>
          <textarea
            id="observacao"
            name="observacao"
            placeholder="Informações adicionais"
            value={form.observacao}
            onChange={onChange}
            rows="4"
          />
        </div>
      </div>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="primary" disabled={submitting}>
          {submitting
            ? "Salvando..."
            : editandoId
            ? "Salvar alterações"
            : "Cadastrar veículo"}
        </button>

        <button type="button" className="ghost" onClick={onCancelEdit}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default VehicleForm;