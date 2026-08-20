import { Pedido } from "../../models/Pedido";
import { DescontoStrategy } from "./DescontoStrategy";

export class DescontoClienteVIPStrategy implements DescontoStrategy {
  calcularDesconto(pedido: Pedido): number {
    return pedido.valorTotalBruto * 0.15;
  }
}