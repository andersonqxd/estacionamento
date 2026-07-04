import { useEffect, useMemo, useState } from "react";
import {
  criarVeiculo,
  excluirVeiculo,
  getVeiculos,
  getVagasAtivas,
  registrarSaida,
  atualizarVeiculo,
} from "./services/api";
import "./index.css";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./components/dashboard/Dashboard";
import VehicleForm from "./components/vehicles/VehicleForm";
import VehicleTable from "./components/vehicles/VehicleTable";

const FORM_INICIAL = {
  placa: "",
  modelo: "",
  cor: "",
  vaga: "",
  status: "estacionado",
  observacao: "",
};

function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("veiculos");
  const [editandoId, setEditandoId] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [erroGeral, setErroGeral] = useState("");
  const [form, setForm] = useState(FORM_INICIAL);

  function extrairMensagemErro(error, fallback) {
    if (error?.data) {
      if (error.data.detail) return error.data.detail;

      const primeiroCampo = Object.keys(error.data)[0];
      const primeiraMensagem = error.data[primeiroCampo]?.[0];

      if (primeiraMensagem) return primeiraMensagem;
    }

    return fallback;
  }

  async function carregarDadosIniciais() {
    try {
      setLoading(true);
      setErroGeral("");

      const [veiculosData, vagasData] = await Promise.all([
        getVeiculos(),
        getVagasAtivas(),
      ]);

      setVeiculos(veiculosData.results || veiculosData);
      setVagas(vagasData.results || vagasData);
    } catch (error) {
      setErroGeral("Não foi possível carregar os dados do sistema.");
    } finally {
      setLoading(false);
    }
  }

  async function recarregarDados() {
    const [veiculosData, vagasData] = await Promise.all([
      getVeiculos(),
      getVagasAtivas(),
    ]);

    setVeiculos(veiculosData.results || veiculosData);
    setVagas(vagasData.results || vagasData);
  }

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        fecharModal();
      }
    }

    if (modalAberto) {
      document.body.classList.add("modal-open");
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalAberto]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "vaga" ? Number(value) || "" : value,
    }));
  }

  function abrirModalNovo() {
    setForm(FORM_INICIAL);
    setEditandoId(null);
    setErroGeral("");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setForm(FORM_INICIAL);
    setEditandoId(null);
    setErroGeral("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      setErroGeral("");

      if (editandoId) {
        await atualizarVeiculo(editandoId, form);
      } else {
        await criarVeiculo(form);
      }

      await recarregarDados();
      fecharModal();
    } catch (error) {
      setErroGeral(
        extrairMensagemErro(
          error,
          editandoId
            ? "Erro ao atualizar veículo."
            : "Erro ao cadastrar veículo."
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      setErroGeral("");
      await excluirVeiculo(id);
      await recarregarDados();
    } catch (error) {
      setErroGeral(extrairMensagemErro(error, "Erro ao excluir veículo."));
    }
  }

  async function handleRegistrarSaida(id) {
    try {
      setErroGeral("");
      await registrarSaida(id, "25.00");
      await recarregarDados();
    } catch (error) {
      setErroGeral(extrairMensagemErro(error, "Erro ao registrar saída."));
    }
  }

  function handleEdit(veiculo) {
    setEditandoId(veiculo.id);
    setErroGeral("");
    setForm({
      placa: veiculo.placa || "",
      modelo: veiculo.modelo || "",
      cor: veiculo.cor || "",
      vaga: veiculo.vaga || "",
      status: veiculo.status || "estacionado",
      observacao: veiculo.observacao || "",
    });
    setModalAberto(true);
  }

  const vagasDisponiveis = useMemo(() => {
    if (editandoId) {
      return vagas.filter(
        (vaga) => !vaga.ocupada || Number(vaga.id) === Number(form.vaga)
      );
    }

    return vagas.filter((vaga) => !vaga.ocupada);
  }, [vagas, editandoId, form.vaga]);

  return (
    <div className="app">
      <Sidebar abaAtiva={abaAtiva} onChangeAba={setAbaAtiva} />

      <main className="content">
        <Header abaAtiva={abaAtiva} />

        {abaAtiva === "dashboard" ? (
          <Dashboard />
        ) : (
          <>
            {erroGeral && <div className="alert">{erroGeral}</div>}

            <section className="page-actions">
              <button type="button" className="primary" onClick={abrirModalNovo}>
                Novo veículo
              </button>
            </section>

            <section className="vehicles-section">
              <VehicleTable
                veiculos={veiculos}
                loading={loading}
                onReload={carregarDadosIniciais}
                onRegistrarSaida={handleRegistrarSaida}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </section>
          </>
        )}
      </main>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 id="modal-title">
                  {editandoId ? "Editar veículo" : "Cadastrar veículo"}
                </h2>
                <p>
                  Preencha os dados para {editandoId ? "atualizar" : "registrar"} o veículo.
                </p>
              </div>

              <button
                type="button"
                className="icon-button"
                aria-label="Fechar modal"
                onClick={fecharModal}
              >
                ×
              </button>
            </div>

            <VehicleForm
              form={form}
              vagas={vagasDisponiveis}
              editandoId={editandoId}
              error={erroGeral}
              submitting={submitting}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancelEdit={fecharModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;