import { EstadoPedido } from "../interfaces/EstadoPedido";
import { Pedido } from "../Pedido";
import { PagoState } from "./PagoState";
import { CanceladoState } from "./CanceladoState";

export class AguardandoPagamentoState implements EstadoPedido {
  public readonly nome = "Aguardando Pagamento";

  constructor(private readonly pedido: Pedido) {}

  public pagar(): void {
    console.log("✔ Pagamento realizado e aprovado com sucesso!");
    this.pedido.mudarEstado(new PagoState(this.pedido));
  }

  public cancelar(): void {
    console.log("✔ Pedido cancelado pelo cliente antes da realização do pagamento.");
    this.pedido.mudarEstado(new CanceladoState(this.pedido));
  }

  public enviar(): void {
    console.warn("⚠️ [Transição Inválida] Não é possível enviar um pedido que está aguardando pagamento.");
  }

  public concluirEntrega(): void {
    console.warn("⚠️ [Transição Inválida] Não é possível concluir a entrega de um pedido que ainda não foi pago.");
  }
}
