import { ComportamentoIA } from "./ComportamentoIA";

export class IADefensiva implements ComportamentoIA {
  agir(): string {
    return "Mantendo posição e erguendo escudos!";
  }

  clone(): ComportamentoIA {
    return new IADefensiva();
  }
}
