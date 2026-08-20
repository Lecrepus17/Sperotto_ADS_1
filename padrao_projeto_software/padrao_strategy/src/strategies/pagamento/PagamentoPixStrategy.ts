import { PagamentoStrategy } from "./PagamentoStrategy";

export class PagamentoPixStrategy implements PagamentoStrategy {
  processarPagamento(valorTotal: number): number {
    // Usando a API nativa do JavaScript/TypeScript (Node.js 15.6+ ou navegadores modernos)

    const chavePix = crypto.randomUUID();
    console.log(
      `[PIX] Gerando Chave Pix simbólica: ${chavePix}. Valor a pagar: R$ ${valorTotal.toFixed(2)}`,
    );
    return valorTotal;
  }
}
