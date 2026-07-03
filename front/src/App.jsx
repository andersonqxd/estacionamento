import { useEffect, useState } from 'react';
import {
  criarVeiculo,
  excluirVeiculo,
  getVeiculos,
  registrarSaida,
  atualizarVeiculo,
} from './services/api';
import './index.css';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import VehicleForm from './components/vehicles/VehicleForm';
import VehicleTable from './components/vehicles/VehicleTable';

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState('veiculos');
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');
  const [form, setForm] = useState({
    placa: '',
    modelo: '',
    cor: '',
    tipo: 'carro',
    vaga: '',
    status: 'estacionado',
    observacao: '',
  });

  async function carregarVeiculos() {
    try {
      setLoading(true);
      setErro('');
      const data = await getVeiculos();
      setVeiculos(data.results || data);
    } catch (error) {
      setErro('Não foi possível carregar os veículos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarVeiculos();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function limparFormulario() {
    setForm({
      placa: '',
      modelo: '',
      cor: '',
      tipo: 'carro',
      vaga: '',
      status: 'estacionado',
      observacao: '',
    });
    setEditandoId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editandoId) {
        const atualizado = await atualizarVeiculo(editandoId, form);
        setVeiculos((prev) =>
          prev.map((item) => (item.id === editandoId ? atualizado : item))
        );
      } else {
        const novo = await criarVeiculo(form);
        setVeiculos((prev) => [novo, ...prev]);
      }

      await carregarVeiculos();
      limparFormulario();
      setErro('');
    } catch (error) {
      setErro(editandoId ? 'Erro ao atualizar veículo.' : 'Erro ao cadastrar veículo.');
    }
  }

  async function handleDelete(id) {
    try {
      await excluirVeiculo(id);
      await carregarVeiculos();
    } catch (error) {
      setErro('Erro ao excluir veículo.');
    }
  }

  async function handleRegistrarSaida(id) {
    try {
      await registrarSaida(id, '25.00');
      await carregarVeiculos();
    } catch (error) {
      setErro('Erro ao registrar saída.');
    }
  }

  function handleEdit(veiculo) {
    setEditandoId(veiculo.id);
    setForm({
      placa: veiculo.placa || '',
      modelo: veiculo.modelo || '',
      cor: veiculo.cor || '',
      tipo: veiculo.tipo || 'carro',
      vaga: veiculo.vaga || '',
      status: veiculo.status || 'estacionado',
      observacao: veiculo.observacao || '',
    });
  }

  return (
  <div className="app">
    <Sidebar abaAtiva={abaAtiva} onChangeAba={setAbaAtiva} />

    <main className="content">
      <Header />

      {abaAtiva === 'dashboard' ? (
        <Dashboard />
      ) : (
        <>
          {erro && <div className="alert">{erro}</div>}

  

          <section className="layout">
            <VehicleForm
              form={form}
              editandoId={editandoId}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancelEdit={limparFormulario}
            />

            <VehicleTable
              veiculos={veiculos}
              loading={loading}
              onReload={carregarVeiculos}
              onRegistrarSaida={handleRegistrarSaida}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </section>
        </>
      )}
    </main>
  </div>
);
}

export default App;