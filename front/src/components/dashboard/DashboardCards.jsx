function DashboardCards({ dados = {} }) {
  const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(valor || 0));

  const cards = [
    { titulo: "Total de veículos", valor: dados.total_veiculos ?? 0 },
    { titulo: "Veículos ativos", valor: dados.veiculos_ativos ?? 0 },
    { titulo: "Finalizados", valor: dados.veiculos_finalizados ?? 0 },
    { titulo: "Lucro de hoje", valor: formatarMoeda(dados.lucro_hoje) },
    { titulo: "Lucro total", valor: formatarMoeda(dados.lucro_total) },
    { titulo: "Ticket médio", valor: formatarMoeda(dados.ticket_medio) },
  ];

  return (
    <section aria-label="Indicadores do dashboard">
      <div className="grid">
        {cards.map((card) => (
          <article key={card.titulo} className="card stats">
            <h3>{card.titulo}</h3>
            <strong>{card.valor}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DashboardCards;