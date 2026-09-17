import { Bebida } from "../interface/Bebida";

export class Refrigerante implements Bebida {
  servir(): void {
    console.log("Refrigerante gelado sendo servido.");
  }
}
