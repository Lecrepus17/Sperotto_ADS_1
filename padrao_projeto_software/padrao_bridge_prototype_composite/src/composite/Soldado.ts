import { ComportamentoIA } from "../bridge/ComportamentoIA";
import { UnidadeMilitar } from "./UnidadeMilitar";

export class Soldado implements UnidadeMilitar {
  private nome: string;
  private ia: ComportamentoIA;

  constructor(nome: string, ia: ComportamentoIA) {
    this.nome = nome;
    this.ia = ia;
  }

  atacar(): void {
    console.log(`[Soldado ${this.nome}] ${this.ia.agir()}`);
  }

  clone(): UnidadeMilitar {
    return new Soldado(this.nome, this.ia.clone());
  }

  adicionar(unidade: UnidadeMilitar): void {
    throw new Error(
      "Operação inválida: Soldados individuais não possuem sub-unidades.",
    );
  }

  remover(unidade: UnidadeMilitar): void {
    throw new Error(
      "Operação inválida: Soldados individuais não possuem sub-unidades.",
    );
  }
}
