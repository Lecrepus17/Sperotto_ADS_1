import { Bebida } from "../interface/Bebida";
import { ProdutoPrincipal } from "../interface/ProdutoPrincipal";
import { RestauranteFactory } from "../interface/RestauranteFactory";
import { Sobremesa } from "../interface/Sobremesa";
import { Hamburguer } from "../class/Hamburguer";
import { SobremesaHamburgueria } from "../class/SobremesaHamburgueria";
import { Refrigerante } from "../class/Refrigerante";

export class HamburgueriaFactory implements RestauranteFactory {
  criarProdutoPrincipal(): ProdutoPrincipal {
    return new Hamburguer();
  }

  criarBebida(): Bebida {
    return new Refrigerante();
  }

  criarSobremesa(): Sobremesa {
    return new SobremesaHamburgueria();
  }
}
