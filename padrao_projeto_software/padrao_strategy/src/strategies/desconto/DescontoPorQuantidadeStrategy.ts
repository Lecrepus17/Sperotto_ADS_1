import { Pedido } from "../../models/Pedido";
import { DescontoStrategy } from "./DescontoStrategy";

export class DescontoPorQuantidadeStrategy implements DescontoStrategy {
  calcularDesconto(pedido: Pedido): number {
    return pedido.quantidadeTotalItens > 5 ? pedido.valorTotalBruto * 0.1 : 0;
  }
}
