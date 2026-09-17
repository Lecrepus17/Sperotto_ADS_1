import { Sobremesa } from "../interface/Sobremesa";

export class SobremesaPizzaria implements Sobremesa {
  preparar(): void {
    console.log("Sobremesa da Pizzaria (Pudim) sendo preparada.");
  }
}
