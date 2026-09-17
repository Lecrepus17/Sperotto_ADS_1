import { Sobremesa } from "../interface/Sobremesa";

export class SobremesaHamburgueria implements Sobremesa {
  preparar(): void {
    console.log("Sobremesa da Hamburgueria (Sorvete) sendo preparada.");
  }
}