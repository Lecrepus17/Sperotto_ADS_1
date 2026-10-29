import { EstadoPedido } from "./interfaces/EstadoPedido";
import { AguardandoPagamentoState } from "./states/AguardandoPagamentoState";

export class Pedido {
  private estado!: EstadoPedido;
  private readonly id: string;

  constructor(id: string = "PED-001") {
    this.id = id;
    this.mudarEstado(new AguardandoPagamentoState(this));
  }

  public mudarEstado(novoEstado: EstadoPedido): void {
    const estadoAnterior = this.estado ? this.estado.nome : "Novo";
    this.estado = novoEstado;
    console.log(`[Pedido ${this.id}] Transição de Estado: ${estadoAnterior} ➔ ${novoEstado.nome}`);
  }

  public pagar(): void {
    console.log(`\n> Tentando [pagar] pedido ${this.id} (Estado atual: ${this.estado.nome}):`);
    this.estado.pagar();
  }

  public enviar(): void {
    console.log(`\n> Tentando [enviar] pedido ${this.id} (Estado atual: ${this.estado.nome}):`);
    this.estado.enviar();
  }

  public concluirEntrega(): void {
    console.log(`\n> Tentando [concluirEntrega] pedido ${this.id} (Estado atual: ${this.estado.nome}):`);
    this.estado.concluirEntrega();
  }

  public cancelar(): void {
    console.log(`\n> Tentando [cancelar] pedido ${this.id} (Estado atual: ${this.estado.nome}):`);
    this.estado.cancelar();
  }

  public getEstado(): EstadoPedido {
    return this.estado;
  }

  public getId(): string {
    return this.id;
  }
}
