import { Prototipo } from "../prototype/Prototipo";

export interface UnidadeMilitar extends Prototipo<UnidadeMilitar> {
  atacar(): void;
  clone(): UnidadeMilitar;
  adicionar(unidade: UnidadeMilitar): void;
  remover(unidade: UnidadeMilitar): void;
}
