import { ProdutoPrincipal } from "../interface/ProdutoPrincipal";

export class Pizza implements ProdutoPrincipal {
  preparar(): void {
    console.log("Pizza sendo preparada e levada ao forno.");
  }
}