import { useEffect, useState } from "react";
import { getDashboard } from "../../services/api";
import DashboardCards from "./DashboardCards";

function Dashboard() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarDashboard() {
    try {
      setLoading(true);
      setErro("");
      const response = await getDashboard();
      setDados(response);
    } catch (error) {
      setErro("Não foi possível carregar o dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  if (loading) {
    return <p>Carregando dashboard...</p>;
  }

  if (erro) {
    return (
      <div className="alert">
        <p>{erro}</p>
        <button type="button" className="ghost" onClick={carregarDashboard}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <section>
      <div className="topbar">
        <button type="button" className="ghost" onClick={carregarDashboard}>
          Atualizar
        </button>
      </div>

      {!dados ? (
        <div className="card">
          <p>Nenhum dado disponível no dashboard.</p>
        </div>
      ) : (
        <DashboardCards dados={dados} />
      )}
    </section>
  );
}

export default Dashboard;