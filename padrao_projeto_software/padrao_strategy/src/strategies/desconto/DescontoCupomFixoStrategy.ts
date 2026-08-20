import { Pedido } from "../../models/Pedido";
import { DescontoStrategy } from "./DescontoStrategy";

export class DescontoCupomFixoStrategy implements DescontoStrategy {
  constructor(private valorCupom: number) {}
  calcularDesconto(pedido: Pedido): number {
    return Math.min(this.valorCupom, pedido.valorTotalBruto);
  }
}
