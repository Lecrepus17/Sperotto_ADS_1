import { EstadoPedido } from "../interfaces/EstadoPedido";
import { Pedido } from "../Pedido";
import { EnviadoState } from "./EnviadoState";
import { CanceladoState } from "./CanceladoState";

export class PagoState implements EstadoPedido {
  public readonly nome = "Pago";

  constructor(private readonly pedido: Pedido) {}

  public pagar(): void {
    console.warn("⚠️ [Aviso] O pedido já está pago.");
  }

  public enviar(): void {
    console.log("✔ Pedido despachado e enviado com sucesso!");
    this.pedido.mudarEstado(new EnviadoState(this.pedido));
  }

  public concluirEntrega(): void {
    console.warn("⚠️ [Transição Inválida] Não é possível concluir a entrega de um pedido que ainda não foi enviado.");
  }

  public cancelar(): void {
    console.log("✔ Pedido cancelado com sucesso. Reembolso do valor efetuado!");
    this.pedido.mudarEstado(new CanceladoState(this.pedido));
  }
}
