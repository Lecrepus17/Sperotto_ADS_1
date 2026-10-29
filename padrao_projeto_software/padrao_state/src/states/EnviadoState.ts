import { EstadoPedido } from "../interfaces/EstadoPedido";
import { Pedido } from "../Pedido";
import { EntregueState } from "./EntregueState";

export class EnviadoState implements EstadoPedido {
  public readonly nome = "Enviado";

  constructor(private readonly pedido: Pedido) {}

  public pagar(): void {
    console.warn("⚠️ [Aviso] O pedido já foi pago e já se encontra em trânsito.");
  }

  public enviar(): void {
    console.warn("⚠️ [Aviso] O pedido já foi enviado e está a caminho.");
  }

  public concluirEntrega(): void {
    console.log("✔ Entrega concluída com sucesso! Destinatário recebeu o pacote.");
    this.pedido.mudarEstado(new EntregueState(this.pedido));
  }

  public cancelar(): void {
    console.warn("⚠️ [Aviso] Não é possível cancelar um pedido que já está em trânsito.");
  }
}
