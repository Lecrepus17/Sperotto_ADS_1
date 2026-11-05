import { UnidadeMilitar } from "./UnidadeMilitar";

export class Regimento implements UnidadeMilitar {
  private nome: string;
  private unidades: UnidadeMilitar[] = [];

  constructor(nome: string) {
    this.nome = nome;
  }

  adicionar(unidade: UnidadeMilitar): void {
    this.unidades.push(unidade);
  }

  remover(unidade: UnidadeMilitar): void {
    const index = this.unidades.indexOf(unidade);
    if (index !== -1) {
      this.unidades.splice(index, 1);
    }
  }

  atacar(): void {
    console.log(`\n--- Ordem de Ataque para o Regimento: ${this.nome} ---`);
    for (const unidade of this.unidades) {
      unidade.atacar();
    }
  }

  clone(): UnidadeMilitar {
    const novoRegimento = new Regimento(`${this.nome} (Clone)`);
    for (const unidade of this.unidades) {
      novoRegimento.adicionar(unidade.clone());
    }
    return novoRegimento;
  }
}
