import { EstadoPedido } from "../interfaces/EstadoPedido";
import { Pedido } from "../Pedido";

export class EntregueState implements EstadoPedido {
  public readonly nome = "Entregue";

  constructor(private readonly _pedido: Pedido) {}

  public pagar(): void {
    console.log("ℹ️ [Informativo] O pedido já foi pago e entregue. Nenhuma alteração permitida.");
  }

  public enviar(): void {
    console.log("ℹ️ [Informativo] O pedido já foi entregue ao cliente.");
  }

  public concluirEntrega(): void {
    console.log("ℹ️ [Informativo] A entrega deste pedido já foi finalizada com sucesso.");
  }

  public cancelar(): void {
    console.log("ℹ️ [Informativo] Não é possível cancelar um pedido que já foi entregue.");
  }
}
