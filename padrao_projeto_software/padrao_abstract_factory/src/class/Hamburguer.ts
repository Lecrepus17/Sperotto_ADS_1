import { ProdutoPrincipal } from "../interface/ProdutoPrincipal";

export class Hamburguer implements ProdutoPrincipal {
  preparar(): void {
    console.log("Hambúrguer sendo preparado na chapa.");
  }
}
