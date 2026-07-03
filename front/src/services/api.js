const  API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function getVeiculos() {
    const response = await fetch(`${API_BASE_URL}/veiculos/`, {
       cache: 'no-store',
    });

    if(!response.ok) {
        throw new Error('Erro ao buscar veiculos');
    }
    return response.json()
}

export async function criarVeiculo(dados) {
    const response = await fetch(`${API_BASE_URL}/veiculos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar veículo.');
  }

  return response.json();
}

export async function excluirVeiculo(id) {
  const response = await fetch(`${API_BASE_URL}/veiculos/${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir veículo.');
  }

  return true;
}

export async function registrarSaida(id, valor_pago = null) {
  const response = await fetch(`${API_BASE_URL}/veiculos/${id}/registrar_saida/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ valor_pago }),
  });

  if (!response.ok) {
    throw new Error('Erro ao registrar saída.');
  }

  return response.json();
}
export async function atualizarVeiculo(id, dados) {
  const   response = await fetch (`${API_BASE_URL}/veiculos/${id}/`, {
    method: 'PATCH',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if(!response.ok) {
    throw new Error('Erro ao atualizar o veiculo,')
  }
  return response.json();
}

export async function getDashboard() {
  const response = await fetch(`${API_BASE_URL}/dashboard/`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar dashboard.');
  }

  return response.json();
}