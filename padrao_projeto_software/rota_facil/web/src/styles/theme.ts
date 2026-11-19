import { ModalidadeEntrega, StatusEncomenda } from '../types/encomenda';

export const COLORS = {
  bg: '#F1F5F9',
  surface: '#FFFFFF',
  surfaceAlt: '#F8FAFC',
  border: '#E2E8F0',
  primary: '#0F4C81',
  primaryLight: '#E0F2FE',
  accent: '#D97706',
  accentLight: '#FEF3C7',
  text: '#0F172A',
  textMuted: '#475569',
  textSubtle: '#64748B',
  success: '#15803D',
  successBg: '#DCFCE7',
  warning: '#B45309',
  warningBg: '#FEF3C7',
  info: '#1D4ED8',
  infoBg: '#DBEAFE',
  danger: '#B91C1C',
  dangerBg: '#FEE2E2',
};

export const STATUS_META: Record<
  StatusEncomenda,
  { label: string; color: string; bg: string }
> = {
  PENDENTE: { label: 'Pendente', color: COLORS.warning, bg: COLORS.warningBg },
  EM_ROTA: { label: 'Em rota', color: COLORS.info, bg: COLORS.infoBg },
  ENTREGUE: { label: 'Entregue', color: COLORS.success, bg: COLORS.successBg },
  CANCELADA: { label: 'Cancelada', color: COLORS.danger, bg: COLORS.dangerBg },
};

export const MODALIDADE_LABEL: Record<ModalidadeEntrega, string> = {
  PADRAO: 'Padrão',
  EXPRESSA: 'Expressa',
  BALCAO: 'Retirada no Balcão',
};

export function formatarMoeda(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function formatarDataHora(iso: string): string {
  const data = new Date(iso);
  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
