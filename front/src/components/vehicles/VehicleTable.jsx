function VehicleTable({
  veiculos,
  loading,
  onReload,
  onRegistrarSaida,
  onDelete,
  onEdit,
}) {
  function getStatusClass(status) {
    switch (status) {
      case "estacionado":
        return "badge is-estacionado";
      case "reservado":
        return "badge is-reservado";
      case "finalizado":
        return "badge is-finalizado";
      default:
        return "badge is-default";
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case "estacionado":
        return "Estacionado";
      case "reservado":
        return "Reservado";
      case "finalizado":
        return "Finalizado";
      default:
        return status || "Não definido";
    }
  }
  console.log(veiculos)
  return (
    <section className="card table-card">
      <div className="table-header">
        <div>
          <h2>Veículos cadastrados</h2>
          <p>Lista de veículos cadastrados no estacionamento.</p>
        </div>

        <button type="button" className="ghost" onClick={onReload}>
          Atualizar
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Vaga</th>
              <th>Entrada</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="table-feedback">
                  Carregando veículos...
                </td>
              </tr>
            ) : veiculos.length === 0 ? (
              <tr>
                <td colSpan="7" className="table-feedback">
                  Nenhum veículo cadastrado até o momento.
                </td>
              </tr>
            ) : (
              veiculos.map((veiculo) => (
                <tr key={veiculo.id}>
                  <td data-label="Placa">{veiculo.placa}</td>
                  <td data-label="Modelo">{veiculo.modelo}</td>
                  <td data-label="Cor">{veiculo.cor}</td>
                  <td data-label="Vaga">{veiculo.vaga_codigo || "-"}</td>
                  <td data-label="Entrada">
                    {veiculo.entrada_em_formatada || veiculo.entrada_em}
                  </td>
                  <td data-label="Status">
                    <span className={getStatusClass(veiculo.status)}>
                      {getStatusLabel(veiculo.status)}
                    </span>
                  </td>
                  <td data-label="Ações" className="actions">
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => onRegistrarSaida(veiculo.id)}
                    >
                      Saída
                    </button>

                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => onEdit(veiculo)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="action-btn danger"
                      onClick={() => onDelete(veiculo.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default VehicleTable;