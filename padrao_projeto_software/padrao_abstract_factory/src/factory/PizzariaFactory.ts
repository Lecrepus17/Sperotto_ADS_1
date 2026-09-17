import { Bebida } from "../interface/Bebida";
import { ProdutoPrincipal } from "../interface/ProdutoPrincipal";
import { RestauranteFactory } from "../interface/RestauranteFactory";
import { Sobremesa } from "../interface/Sobremesa";
import { Pizza } from "../class/Pizza";
import { SobremesaPizzaria } from "../class/SobremesaPizzaria";
import { Refrigerante } from "../class/Refrigerante";

export class PizzariaFactory implements RestauranteFactory {
  criarProdutoPrincipal(): ProdutoPrincipal {
    return new Pizza();
  }

  criarBebida(): Bebida {
    return new Refrigerante();
  }

  criarSobremesa(): Sobremesa {
    return new SobremesaPizzaria();
  }
}
