import {
  CriarEncomendaPayload,
  Encomenda,
  NotificacaoSimulada,
  RegistroAuditoria,
  ResultadoFrete,
  SimularFretePayload,
  StatusEncomenda,
} from '../types/encomenda';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.erro || `Erro HTTP ${response.status}`);
  }

  return data as T;
}

export interface FiltrosConsulta {
  status?: string;
  modalidade?: string;
  busca?: string;
}

export const rotaFacilApi = {
  listarEncomendas(filtros: FiltrosConsulta = {}): Promise<Encomenda[]> {
    const params = new URLSearchParams();
    if (filtros.status && filtros.status !== 'TODOS') params.append('status', filtros.status);
    if (filtros.modalidade && filtros.modalidade !== 'TODAS') {
      params.append('modalidade', filtros.modalidade);
    }
    if (filtros.busca?.trim()) params.append('busca', filtros.busca.trim());

    const query = params.toString();
    return request<Encomenda[]>(`/encomendas${query ? `?${query}` : ''}`);
  },

  simularFrete(payload: SimularFretePayload): Promise<ResultadoFrete> {
    return request<ResultadoFrete>('/encomendas/simular', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  cadastrarEncomenda(payload: CriarEncomendaPayload): Promise<Encomenda> {
    return request<Encomenda>('/encomendas', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  atualizarStatus(
    id: string,
    status: StatusEncomenda,
    observacao?: string
  ): Promise<Encomenda> {
    return request<Encomenda>(`/encomendas/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, observacao }),
    });
  },

  listarAuditoria(): Promise<RegistroAuditoria[]> {
    return request<RegistroAuditoria[]>('/eventos/auditoria');
  },

  listarNotificacoes(): Promise<NotificacaoSimulada[]> {
    return request<NotificacaoSimulada[]>('/eventos/notificacoes');
  },
};
