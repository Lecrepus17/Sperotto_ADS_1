import { ItemPedido } from "./ItemPedido";

export class Pedido {
  constructor(
    public readonly id: string,
    public readonly itens: ItemPedido[],
    public readonly destinatario: string,
  ) {}

  get valorTotalBruto(): number {
    return this.itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0,
    );
  }

  get quantidadeTotalItens(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }
}
