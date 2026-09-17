import { Bebida } from "../interface/Bebida";
import { ProdutoPrincipal } from "../interface/ProdutoPrincipal";
import { RestauranteFactory } from "../interface/RestauranteFactory";
import { Sobremesa } from "../interface/Sobremesa";

export class Pedido {
  fabrica: RestauranteFactory;

  constructor(fabrica: RestauranteFactory) {
    this.fabrica = fabrica;
  }

  montar(): void {
    const produtoPrincipal: ProdutoPrincipal = this.fabrica.criarProdutoPrincipal();
    const bebida: Bebida = this.fabrica.criarBebida();
    const sobremesa: Sobremesa = this.fabrica.criarSobremesa();

    produtoPrincipal.preparar();
    bebida.servir();
    sobremesa.preparar();
  }
}
