import { Prototipo } from "../prototype/Prototipo";

export interface ComportamentoIA extends Prototipo<ComportamentoIA> {
  agir(): string;
  clone(): ComportamentoIA;
}
