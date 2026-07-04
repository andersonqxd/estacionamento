function Sidebar({ abaAtiva, onChangeAba }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>ParkAdmin</h2>
        <p>Controle do estacionamento</p>
      </div>

      <nav className="menu" aria-label="Navegação principal">
        <ul className="menu-list">
          <li>
            <button
              type="button"
              className={`menu-item ${abaAtiva === "veiculos" ? "active" : ""}`}
              aria-current={abaAtiva === "veiculos" ? "page" : undefined}
              onClick={() => onChangeAba("veiculos")}
            >
              Veículos
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`menu-item ${abaAtiva === "dashboard" ? "active" : ""}`}
              aria-current={abaAtiva === "dashboard" ? "page" : undefined}
              onClick={() => onChangeAba("dashboard")}
            >
              Dashboard
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;