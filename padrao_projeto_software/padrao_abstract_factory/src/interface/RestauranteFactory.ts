import { Bebida } from "./Bebida";
import { ProdutoPrincipal } from "./ProdutoPrincipal";
import { Sobremesa } from "./Sobremesa";

export interface RestauranteFactory {
  criarProdutoPrincipal(): ProdutoPrincipal;
  criarBebida(): Bebida;
  criarSobremesa(): Sobremesa;
}