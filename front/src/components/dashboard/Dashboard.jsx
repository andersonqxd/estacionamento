import { useEffect, useState } from 'react';
import { getDashboard } from '../../services/api';
import DashboardCards from './DashboardCards';

function Dashboard() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setLoading(true);
        setErro('');
        const response = await getDashboard();
        setDados(response);
      } catch (error) {
        setErro('Não foi possível carregar o dashboard.');
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  if (loading) {
    return <p>Carregando dashboard...</p>;
  }

  if (erro) {
    return <div className="alert">{erro}</div>;
  }

  return (
    <section>
      <div className="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Indicadores operacionais e financeiros do estacionamento.</p>
        </div>
      </div>

      {dados && <DashboardCards dados={dados} />}
    </section>
  );
}

export default Dashboard;