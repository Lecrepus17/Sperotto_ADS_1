import { PagamentoStrategy } from "./PagamentoStrategy";

export class PagamentoBoletoStrategy implements PagamentoStrategy {
  processarPagamento(valorTotal: number): number {
    const totalComTaxa = valorTotal + 2.5; // R$ 2,50 de taxa fixa
    console.log(
      `[Boleto] Boleto gerado. Valor total (+ R$2.50 taxa): R$ ${totalComTaxa.toFixed(2)}`,
    );
    return totalComTaxa;
  }
}
