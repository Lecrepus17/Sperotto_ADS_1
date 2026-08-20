export interface PagamentoStrategy {
  processarPagamento(valorTotal: number): number;
}