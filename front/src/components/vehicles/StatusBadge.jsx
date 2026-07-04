const STATUS_CONFIG = {
  estacionado: {
    label: "Estacionado",
    className: "is-estacionado",
  },
  reservado: {
    label: "Reservado",
    className: "is-reservado",
  },
  finalizado: {
    label: "Finalizado",
    className: "is-finalizado",
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || {
    label: status || "Desconhecido",
    className: "is-default",
  };

  return (
    <span className={`badge ${config.className}`}>
      {config.label}
    </span>
  );
}

export default StatusBadge;