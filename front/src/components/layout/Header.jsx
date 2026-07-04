function Header({ abaAtiva }) {
  const content =
    abaAtiva === "dashboard"
      ? {
          title: "Dashboard",
          description: "Indicadores operacionais e financeiros do estacionamento.",
        }
      : {
          title: "Smart Parking",
          description: "Cadastro, listagem e controle de saída de veículos.",
        };

  return (
    <header className="topbar">
      <div>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </div>
    </header>
  );
}

export default Header;