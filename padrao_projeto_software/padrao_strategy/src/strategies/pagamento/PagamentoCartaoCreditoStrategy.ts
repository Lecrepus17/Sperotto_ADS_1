import { PagamentoStrategy } from "./PagamentoStrategy";

export class PagamentoCartaoCreditoStrategy implements PagamentoStrategy {
  processarPagamento(valorTotal: number): number {
    const totalComTaxa = valorTotal * 1.025; // 2.5% de taxa
    console.log(
      `[Cartão] Pagamento aprovado. Valor total (com 2.5% taxa): R$ ${totalComTaxa.toFixed(2)}`,
    );
    return totalComTaxa;
  }
}
