const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

  return data;
}

export function getVeiculos() {
  return request("/veiculos/");
}

export function criarVeiculo(payload) {
  return request("/veiculos/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function atualizarVeiculo(id, payload) {
  return request(`/veiculos/${id}/`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function excluirVeiculo(id) {
  return request(`/veiculos/${id}/`, {
    method: "DELETE",
  });
}

export function registrarSaida(id, valor_pago) {
  return request(`/veiculos/${id}/registrar_saida/`, {
    method: "POST",
    body: JSON.stringify({ valor_pago }),
  });
}

export function getVagasAtivas() {
  return request("/vagas/?ativa=true");
}

export function getDashboard() {
  return request("/dashboard/");
}