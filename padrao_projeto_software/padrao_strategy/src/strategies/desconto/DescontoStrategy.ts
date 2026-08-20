import { Pedido } from "../../models/Pedido";

export interface DescontoStrategy {
  calcularDesconto(pedido: Pedido): number;
}
