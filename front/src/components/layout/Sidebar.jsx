function Sidebar({ abaAtiva, onChangeAba }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>ParkAdmin</h2>
        <p>Controle do estacionamento</p>
      </div>

      <nav className="menu">
        <button
          type="button"
          className={`menu-item ${abaAtiva === 'veiculos' ? 'active' : ''}`}
          onClick={() => onChangeAba('veiculos')}
        >
          Veículos
        </button>

        <button
          type="button"
          className={`menu-item ${abaAtiva === 'dashboard' ? 'active' : ''}`}
          onClick={() => onChangeAba('dashboard')}
        >
          Dashboard
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;