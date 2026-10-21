export type ElementoOrdem =
  | 'SANGUE'
  | 'MORTE'
  | 'CONHECIMENTO'
  | 'ENERGIA'
  | 'MEDO'
  | 'FISICO';

export type FaceDado = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export const FACES_DADOS: FaceDado[] = [4, 6, 8, 10, 12, 20, 100];

export type TipoEfeitoAcao =
  | 'DANO_PV'
  | 'DANO_SAN'
  | 'CURA_PV'
  | 'RECUPERAR_PE_SAN'
  | 'BUFF_DEFESA_RD';

export type CategoriaAcao =
  | 'ARMA'
  | 'RITUAL'
  | 'HABILIDADE'
  | 'TATICA'
  | 'CRIATURA';

export type ClasseAgente =
  | 'Combatente'
  | 'Especialista'
  | 'Ocultista'
  | 'Sobrevivente'
  | 'Mundano';

export interface ElementoMetadata {
  id: ElementoOrdem;
  nome: string;
  emoji: string;
  cor: string;
  corFundo: string;
  corBorda: string;
  oprime?: ElementoOrdem;
  oprimidoPor?: ElementoOrdem;
  resumoRegra: string;
}

export const ELEMENTOS_ORDEM: Record<ElementoOrdem, ElementoMetadata> = {
  SANGUE: {
    id: 'SANGUE',
    nome: 'Sangue',
    emoji: '🩸',
    cor: '#FF4D6D',
    corFundo: '#3B0A18',
    corBorda: '#C9184A',
    oprime: 'CONHECIMENTO',
    oprimidoPor: 'MORTE',
    resumoRegra: 'Oprime Conhecimento (2x) • Oprimido por Morte',
  },
  MORTE: {
    id: 'MORTE',
    nome: 'Morte',
    emoji: '💀',
    cor: '#CBD5E1',
    corFundo: '#1E293B',
    corBorda: '#64748B',
    oprime: 'SANGUE',
    oprimidoPor: 'ENERGIA',
    resumoRegra: 'Oprime Sangue (2x) • Oprimido por Energia',
  },
  CONHECIMENTO: {
    id: 'CONHECIMENTO',
    nome: 'Conhecimento',
    emoji: '🧠',
    cor: '#FDE047',
    corFundo: '#3B2F06',
    corBorda: '#EAB308',
    oprime: 'ENERGIA',
    oprimidoPor: 'SANGUE',
    resumoRegra: 'Oprime Energia (2x) • Oprimido por Sangue',
  },
  ENERGIA: {
    id: 'ENERGIA',
    nome: 'Energia',
    emoji: '⚡',
    cor: '#E879F9',
    corFundo: '#340D49',
    corBorda: '#C026D3',
    oprime: 'MORTE',
    oprimidoPor: 'CONHECIMENTO',
    resumoRegra: 'Oprime Morte (2x) • Oprimido por Conhecimento',
  },
  MEDO: {
    id: 'MEDO',
    nome: 'Medo',
    emoji: '👁️',
    cor: '#67E8F9',
    corFundo: '#083344',
    corBorda: '#06B6D4',
    resumoRegra: 'Elemento Absoluto do Outro Lado • Ignora RD comum',
  },
  FISICO: {
    id: 'FISICO',
    nome: 'Físico / Balístico',
    emoji: '🗡️',
    cor: '#94A3B8',
    corFundo: '#1E1B2E',
    corBorda: '#475569',
    resumoRegra: 'Dano Mundano (Corte, Impacto, Perfuração, Balístico)',
  },
};

export type RelacaoElemental = 'OPRIME' | 'RESISTE' | 'NEUTRO' | 'MEDO_ABSOLUTO';

/**
 * Calcula a relação elemental segundo o livro de regras de Ordem Paranormal RPG:
 * Sangue > Conhecimento > Energia > Morte > Sangue.
 */
export function calcularRelacaoElemental(
  elementoAtaque: ElementoOrdem,
  elementoAlvo: ElementoOrdem
): RelacaoElemental {
  if (elementoAtaque === 'MEDO') {
    return 'MEDO_ABSOLUTO';
  }
  const metaAtaque = ELEMENTOS_ORDEM[elementoAtaque];
  if (metaAtaque.oprime && metaAtaque.oprime === elementoAlvo) {
    return 'OPRIME';
  }
  // Mesmo elemento paranormal ou ataque físico contra criatura paranormal pura
  if (
    (elementoAtaque !== 'FISICO' && elementoAtaque === elementoAlvo) ||
    (elementoAtaque === 'FISICO' && elementoAlvo !== 'FISICO')
  ) {
    return 'RESISTE';
  }
  // Se o ataque for do elemento que é oprimido pelo elemento do alvo, o alvo também resiste
  if (metaAtaque.oprimidoPor && metaAtaque.oprimidoPor === elementoAlvo) {
    return 'RESISTE';
  }
  return 'NEUTRO';
}

export interface DadoIndividual {
  faces: FaceDado;
  valor: number;
  origem: 'BASE' | 'CRITICO' | 'DECORATOR' | 'ACERTO';
  rotulo?: string;
}

export interface DetalheDecoratorAplicado {
  id: string;
  nome: string;
  emoji: string;
  elemento: ElementoOrdem;
  bonusFixoDano: number;
  dadosExtrasRolados: DadoIndividual[];
  subtotalDadosExtras: number;
  bonusAcerto: number;
  bonusDefesa: number;
  bonusRD: number;
}

export interface ConfigAcao {
  id: string;
  nome: string;
  emoji: string;
  categoria: CategoriaAcao;
  elemento: ElementoOrdem;
  efeito: TipoEfeitoAcao;
  qtdDados: number;
  faceDado: FaceDado;
  bonusFixo: number;
  bonusAcerto: number;
  margemCritico: number; // ex: 19 ou 20
  multiplicadorCritico: number; // ex: 2, 3, 4
  custoPE: number;
  custoSAN: number;
  descricao?: string;
}

export interface ConfigAmuletoDecorator {
  id: string;
  nome: string;
  emoji: string;
  elemento: ElementoOrdem;
  bonusDanoFixo: number;
  qtdDadosExtras: number;
  faceDadoExtra: FaceDado;
  bonusAcerto: number;
  bonusDefesa: number;
  bonusRD: number;
  descricao?: string;
}

export interface ConfigCombatente {
  id: string;
  nome: string;
  emoji: string;
  tipo: 'AGENTE' | 'CRIATURA';
  subtitulo: string; // ex: "Combatente NEX 50%" ou "VD 120"
  elemento: ElementoOrdem;
  vidaMax: number;
  vidaAtual?: number;
  peMax: number;
  peAtual?: number;
  sanMax: number;
  sanAtual?: number;
  defesa: number;
  rd: number;
  dadosAtributoAcerto: number; // ex: 3 (rola 3d20 e pega o maior)
  acaoPadraoId: string;
  amuletosIds?: string[];
}

export interface ConfigRegrasMesa {
  usarTesteAcerto: boolean;
  multiplicadorVulnerabilidade: number; // Padrão 2
  multiplicadorResistencia: number; // Padrão 0.5
  aplicarRD: boolean;
  gastarPEeSAN: boolean;
  contraAtaqueAutomatico: boolean;
  contraAtaqueTodosVivos: boolean;
}

export interface ResultadoAcao {
  id: string;
  timestamp: string;
  atacanteNome: string;
  atacanteEmoji: string;
  alvoNome: string;
  alvoEmoji: string;
  acaoNome: string;
  acaoEmoji: string;
  elementoAtaque: ElementoOrdem;
  elementoAlvo: ElementoOrdem;
  efeito: TipoEfeitoAcao;

  // Teste de Ataque (Xd20 + perícia vs Defesa)
  usouTesteAcerto: boolean;
  dadosAcerto: number[];
  maiorDadoAcerto: number;
  bonusAcertoTotal: number;
  totalAcerto: number;
  defesaAlvo: number;
  acertou: boolean;
  critico: boolean;
  margemCriticoUsada: number;
  multiplicadorCriticoUsado: number;

  // Cálculo detalhado de Dano / Cura
  dadosBaseRolados: DadoIndividual[];
  dadosCriticoRolados: DadoIndividual[];
  somaDadosArma: number;
  bonusFixoAcao: number;
  decoratorsAplicados: DetalheDecoratorAplicado[];
  somaBonusFixoDecorators: number;
  somaDadosDecorators: number;
  subtotalAntesElemento: number;

  relacaoElemental: RelacaoElemental;
  multiplicadorElementalAplicado: number;
  subtotalAposElemento: number;

  rdAlvoAplicada: number;
  valorFinal: number; // Dano final causado ou cura aplicada

  custoPEPago: number;
  custoSANPago: number;
  resumoTexto: string;
}

export function rolarDado(faces: FaceDado): number {
  return Math.floor(Math.random() * faces) + 1;
}
