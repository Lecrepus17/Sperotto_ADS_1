import { REGRAS_PADRAO } from '../../data/presetsOrdem';
import {
  ConfigAmuletoDecorator,
  ConfigCombatente,
  ConfigRegrasMesa,
  DetalheDecoratorAplicado,
  ElementoOrdem,
  ResultadoAcao,
} from '../../types/Elementos';
import { Observador } from '../observer/Observador';
import { EstrategiaAtaque } from '../strategy/EstrategiaAtaque';
import { Entidade } from './Entidade';
import { TipoEntidadeEnum } from './TipoEntidadeEnum';

export abstract class PersonagemBase implements Entidade {
  protected observadores: Observador[] = [];
  protected vidaAtual: number;
  protected peAtual: number;
  protected sanAtual: number;
  protected bonusDefesaTemp: number = 0;
  protected bonusRDTemp: number = 0;
  private jaAlertouMachucado: boolean = false;
  private jaAlertouDerrotado: boolean = false;
  private jaAlertouEnlouquecendo: boolean = false;

  constructor(
    protected config: ConfigCombatente,
    protected ataqueStrategy: EstrategiaAtaque
  ) {
    this.vidaAtual = config.vidaAtual ?? config.vidaMax;
    this.peAtual = config.peAtual ?? config.peMax;
    this.sanAtual = config.sanAtual ?? config.sanMax;
  }

  public abstract getTipoEntidade(): TipoEntidadeEnum;

  public inscrever(obs: Observador): void {
    if (!this.observadores.includes(obs)) {
      this.observadores.push(obs);
    }
  }

  public notificar(mensagem: string): void {
    this.observadores.forEach((obs) => obs.atualizar(mensagem));
  }

  public getId(): string {
    return this.config.id;
  }

  public getNome(): string {
    return this.config.nome;
  }

  public getEmoji(): string {
    return this.config.emoji;
  }

  public getSubtitulo(): string {
    return this.config.subtitulo;
  }

  public getElemento(): ElementoOrdem {
    return this.config.elemento;
  }

  public getConfigBase(): ConfigCombatente {
    return {
      ...this.config,
      vidaAtual: this.vidaAtual,
      peAtual: this.peAtual,
      sanAtual: this.sanAtual,
    };
  }

  public getVida(): number {
    return this.vidaAtual;
  }

  public getVidaMax(): number {
    return this.config.vidaMax;
  }

  public getPE(): number {
    return this.peAtual;
  }

  public getPEMax(): number {
    return this.config.peMax;
  }

  public getSanidade(): number {
    return this.sanAtual;
  }

  public getSanidadeMax(): number {
    return this.config.sanMax;
  }

  public getDefesaTotal(): number {
    return this.config.defesa + this.bonusDefesaTemp;
  }

  public getRDTotal(): number {
    return this.config.rd + this.bonusRDTemp;
  }

  public getDadosAtributoAcerto(): number {
    return this.config.dadosAtributoAcerto;
  }

  public receberDano(dano: number): void {
    if (dano <= 0) return;
    this.vidaAtual = Math.max(0, this.vidaAtual - dano);

    if (this.vidaAtual <= 0 && !this.jaAlertouDerrotado) {
      this.jaAlertouDerrotado = true;
      const msg =
        this.getTipoEntidade() === TipoEntidadeEnum.AGENTE
          ? `${this.config.emoji} ${this.config.nome} entrou em estado MORRENDO (0 PV)!`
          : `${this.config.emoji} ${this.config.nome} foi obliterado e banido de volta ao Outro Lado!`;
      this.notificar(msg);
    } else if (
      this.vidaAtual > 0 &&
      this.vidaAtual <= Math.floor(this.config.vidaMax / 2) &&
      !this.jaAlertouMachucado
    ) {
      this.jaAlertouMachucado = true;
      this.notificar(
        `${this.config.emoji} ${this.config.nome} está MACHUCADO (${this.vidaAtual}/${this.config.vidaMax} PV ≤ 50%)!`
      );
    }
  }

  public receberDanoSanidade(danoSan: number): void {
    if (danoSan <= 0) return;
    this.sanAtual = Math.max(0, this.sanAtual - danoSan);
    if (this.sanAtual <= 0 && !this.jaAlertouEnlouquecendo) {
      this.jaAlertouEnlouquecendo = true;
      this.notificar(
        `🌀 ${this.config.nome} zerou a Sanidade (0 SAN) e entrou em ENLOUQUECENDO pelo Outro Lado!`
      );
    }
  }

  public curarVida(qtd: number): void {
    if (qtd <= 0) return;
    this.vidaAtual = Math.min(this.config.vidaMax, this.vidaAtual + qtd);
    if (this.vidaAtual > 0) {
      this.jaAlertouDerrotado = false;
    }
    if (this.vidaAtual > Math.floor(this.config.vidaMax / 2)) {
      this.jaAlertouMachucado = false;
    }
  }

  public recuperarPEeSAN(qtd: number): void {
    if (qtd <= 0) return;
    this.peAtual = Math.min(this.config.peMax, this.peAtual + qtd);
    this.sanAtual = Math.min(this.config.sanMax, this.sanAtual + qtd);
    if (this.sanAtual > 0) {
      this.jaAlertouEnlouquecendo = false;
    }
  }

  public aplicarBuffDefesaERD(bonusDef: number, bonusRD: number): void {
    this.bonusDefesaTemp += Math.max(0, bonusDef);
    this.bonusRDTemp += Math.max(0, bonusRD);
  }

  public gastarPE(qtd: number): boolean {
    if (qtd <= 0) return true;
    if (this.peAtual < qtd) {
      this.peAtual = 0;
      return false;
    }
    this.peAtual -= qtd;
    return true;
  }

  public gastarSanidade(qtd: number): void {
    if (qtd <= 0) return;
    this.receberDanoSanidade(qtd);
  }

  public avaliarDecoratorsParaAtaque(): DetalheDecoratorAplicado[] {
    return [];
  }

  public getAmuletosEquipados(): ConfigAmuletoDecorator[] {
    return [];
  }

  public setEstrategia(estrategia: EstrategiaAtaque): void {
    this.ataqueStrategy = estrategia;
  }

  public getEstrategia(): EstrategiaAtaque {
    return this.ataqueStrategy;
  }

  public getTipoAtaque(): ElementoOrdem {
    return this.ataqueStrategy.getTipo();
  }

  public atacar(
    alvo: Entidade,
    regras: ConfigRegrasMesa = REGRAS_PADRAO
  ): ResultadoAcao {
    return this.ataqueStrategy.executar(this, alvo, regras);
  }

  public resetarStatus(): void {
    this.vidaAtual = this.config.vidaMax;
    this.peAtual = this.config.peMax;
    this.sanAtual = this.config.sanMax;
    this.bonusDefesaTemp = 0;
    this.bonusRDTemp = 0;
    this.jaAlertouMachucado = false;
    this.jaAlertouDerrotado = false;
    this.jaAlertouEnlouquecendo = false;
  }

  public estaVivo(): boolean {
    return this.vidaAtual > 0;
  }

  public estaMachucado(): boolean {
    return this.vidaAtual > 0 && this.vidaAtual <= Math.floor(this.config.vidaMax / 2);
  }

  public estaEnlouquecendo(): boolean {
    return this.sanAtual <= 0;
  }
}
