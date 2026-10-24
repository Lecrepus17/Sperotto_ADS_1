import { REGRAS_PADRAO } from '../../data/presetsOrdem';
import {
  ConfigAmuletoDecorator,
  ConfigCombatente,
  ConfigRegrasMesa,
  DetalheDecoratorAplicado,
  ElementoOrdem,
  ResultadoAcao,
} from '../../types/Elementos';
import { Entidade } from '../factory/Entidade';
import { TipoEntidadeEnum } from '../factory/TipoEntidadeEnum';
import { Observador } from '../observer/Observador';
import { EstrategiaAtaque } from '../strategy/EstrategiaAtaque';

export abstract class EquipamentoDecorator implements Entidade {
  constructor(protected entidadeEnvolvida: Entidade) {}

  public getEntidadeEnvolvida(): Entidade {
    return this.entidadeEnvolvida;
  }

  public getId(): string {
    return this.entidadeEnvolvida.getId();
  }

  public getNome(): string {
    return this.entidadeEnvolvida.getNome();
  }

  public getEmoji(): string {
    return this.entidadeEnvolvida.getEmoji();
  }

  public getSubtitulo(): string {
    return this.entidadeEnvolvida.getSubtitulo();
  }

  public getTipoEntidade(): TipoEntidadeEnum {
    return this.entidadeEnvolvida.getTipoEntidade();
  }

  public getElemento(): ElementoOrdem {
    return this.entidadeEnvolvida.getElemento();
  }

  public getConfigBase(): ConfigCombatente {
    return this.entidadeEnvolvida.getConfigBase();
  }

  public getVida(): number {
    return this.entidadeEnvolvida.getVida();
  }

  public getVidaMax(): number {
    return this.entidadeEnvolvida.getVidaMax();
  }

  public getPE(): number {
    return this.entidadeEnvolvida.getPE();
  }

  public getPEMax(): number {
    return this.entidadeEnvolvida.getPEMax();
  }

  public getSanidade(): number {
    return this.entidadeEnvolvida.getSanidade();
  }

  public getSanidadeMax(): number {
    return this.entidadeEnvolvida.getSanidadeMax();
  }

  public getDefesaTotal(): number {
    return this.entidadeEnvolvida.getDefesaTotal();
  }

  public getRDTotal(): number {
    return this.entidadeEnvolvida.getRDTotal();
  }

  public getDadosAtributoAcerto(): number {
    return this.entidadeEnvolvida.getDadosAtributoAcerto();
  }

  public receberDano(dano: number): void {
    this.entidadeEnvolvida.receberDano(dano);
  }

  public receberDanoSanidade(danoSan: number): void {
    this.entidadeEnvolvida.receberDanoSanidade(danoSan);
  }

  public curarVida(qtd: number): void {
    this.entidadeEnvolvida.curarVida(qtd);
  }

  public recuperarPEeSAN(qtd: number): void {
    this.entidadeEnvolvida.recuperarPEeSAN(qtd);
  }

  public aplicarBuffDefesaERD(bonusDef: number, bonusRD: number): void {
    this.entidadeEnvolvida.aplicarBuffDefesaERD(bonusDef, bonusRD);
  }

  public gastarPE(qtd: number): boolean {
    return this.entidadeEnvolvida.gastarPE(qtd);
  }

  public gastarSanidade(qtd: number): void {
    this.entidadeEnvolvida.gastarSanidade(qtd);
  }

  public inscrever(obs: Observador): void {
    this.entidadeEnvolvida.inscrever(obs);
  }

  public notificar(mensagem: string): void {
    this.entidadeEnvolvida.notificar(mensagem);
  }

  public setEstrategia(estrategia: EstrategiaAtaque): void {
    this.entidadeEnvolvida.setEstrategia(estrategia);
  }

  public getEstrategia(): EstrategiaAtaque {
    return this.entidadeEnvolvida.getEstrategia();
  }

  public getTipoAtaque(): ElementoOrdem {
    return this.entidadeEnvolvida.getTipoAtaque();
  }

  public avaliarDecoratorsParaAtaque(): DetalheDecoratorAplicado[] {
    return this.entidadeEnvolvida.avaliarDecoratorsParaAtaque();
  }

  public getAmuletosEquipados(): ConfigAmuletoDecorator[] {
    return this.entidadeEnvolvida.getAmuletosEquipados();
  }

  public atacar(
    alvo: Entidade,
    regras: ConfigRegrasMesa = REGRAS_PADRAO
  ): ResultadoAcao {
    return this.getEstrategia().executar(this, alvo, regras);
  }

  public resetarStatus(): void {
    this.entidadeEnvolvida.resetarStatus();
  }

  public estaVivo(): boolean {
    return this.entidadeEnvolvida.estaVivo();
  }

  public estaMachucado(): boolean {
    return this.entidadeEnvolvida.estaMachucado();
  }

  public estaEnlouquecendo(): boolean {
    return this.entidadeEnvolvida.estaEnlouquecendo();
  }
}
