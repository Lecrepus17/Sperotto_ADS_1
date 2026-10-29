import { EstadoPedido } from "../interfaces/EstadoPedido";
import { Pedido } from "../Pedido";

export class CanceladoState implements EstadoPedido {
  public readonly nome = "Cancelado";

  constructor(private readonly _pedido: Pedido) {}

  public pagar(): void {
    console.warn("⚠️ [Aviso] Operação inválida: O pedido foi cancelado e não aceita pagamentos.");
  }

  public enviar(): void {
    console.warn("⚠️ [Aviso] Operação inválida: Não é possível enviar um pedido cancelado.");
  }

  public concluirEntrega(): void {
    console.warn("⚠️ [Aviso] Operação inválida: Não é possível concluir a entrega de um pedido cancelado.");
  }

  public cancelar(): void {
    console.warn("⚠️ [Aviso] O pedido já se encontra cancelado. Nenhuma alteração permitida.");
  }
}
