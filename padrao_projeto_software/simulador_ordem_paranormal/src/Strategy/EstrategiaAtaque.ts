import {
  ConfigAcao,
  ConfigRegrasMesa,
  DetalheDecoratorAplicado,
  ElementoOrdem,
  ResultadoAcao,
} from '../types/Elementos';

export interface CombatenteAlvo {
  getId(): string;
  getNome(): string;
  getEmoji(): string;
  getElemento(): ElementoOrdem;
  getVida(): number;
  getVidaMax(): number;
  getPE(): number;
  getPEMax(): number;
  getSanidade(): number;
  getSanidadeMax(): number;
  getDefesaTotal(): number;
  getRDTotal(): number;
  getDadosAtributoAcerto(): number;
  receberDano(dano: number): void;
  receberDanoSanidade(danoSan: number): void;
  curarVida(qtd: number): void;
  recuperarPEeSAN(qtd: number): void;
  aplicarBuffDefesaERD(bonusDef: number, bonusRD: number): void;
  gastarPE(qtd: number): boolean;
  gastarSanidade(qtd: number): void;
  avaliarDecoratorsParaAtaque(): DetalheDecoratorAplicado[];
}

export interface EstrategiaAtaque {
  getTipo(): ElementoOrdem;
  getConfig(): ConfigAcao;
  executar(
    atacante: CombatenteAlvo,
    alvo: CombatenteAlvo,
    regras: ConfigRegrasMesa
  ): ResultadoAcao;
}
