function DashboardCards({ dados }) {
    return (
        <section className="grid">
            <div className="card stats">
                <h3>Total de veículos</h3>
                <strong>{dados.total_veiculos}</strong>
            </div>

            <div className="card stats">
                <h3>Veículos ativos</h3>
                <strong>{dados.veiculos_ativos}</strong>
            </div>

            <div className="card stats">
                <h3>Finalizados</h3>
                <strong>{dados.veiculos_finalizados}</strong>
            </div>

            <div className="card stats">
                <h3>Lucro de hoje</h3>
                <strong>R$ {Number(dados.lucro_hoje || 0).toFixed(2)}</strong>
            </div>

            <div className="card stats">
                <h3>Lucro total</h3>
                <strong>R$ {Number(dados.lucro_total || 0).toFixed(2)}</strong>
            </div>

            <div className="card stats">
                <h3>Ticket médio</h3>
                <strong>R$ {Number(dados.ticket_medio || 0).toFixed(2)}</strong>
            </div>
        </section>
    )
}

export default DashboardCards;
