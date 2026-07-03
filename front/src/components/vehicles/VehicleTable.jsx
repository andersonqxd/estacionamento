import StatusBadge from './StatusBadge';

function VehicleTable({
  veiculos,
  loading,
  onReload,
  onRegistrarSaida,
  onDelete,
  onEdit,
}) {
  return (
    <div className="card table-card">
      <div className="table-header">
        <h2>Veículos cadastrados</h2>
        <button type="button" onClick={onReload} className="ghost">
          Atualizar
        </button>
      </div>

      {loading ? (
        <p>Carregando veículos...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Vaga</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {veiculos.map((veiculo) => (
                <tr key={veiculo.id}>
                  <td>{veiculo.placa}</td>
                  <td>{veiculo.modelo}</td>
                  <td>{veiculo.tipo}</td>
                  <td>{veiculo.vaga || '-'}</td>
                  <td>
                    <StatusBadge status={veiculo.status} />
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      className="small"
                      onClick={() => onRegistrarSaida(veiculo.id)}
                      disabled={veiculo.status === 'finalizado'}
                    >
                      Saída
                    </button>

                    <button
                      type="button"
                      className="small danger"
                      onClick={() => onDelete(veiculo.id)}
                    >
                      Excluir
                    </button>

                    <button
                      type="button"
                      className="small"
                      onClick={() => onEdit(veiculo)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}

              {veiculos.length === 0 && (
                <tr>
                  <td colSpan="6">Nenhum veículo cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VehicleTable;