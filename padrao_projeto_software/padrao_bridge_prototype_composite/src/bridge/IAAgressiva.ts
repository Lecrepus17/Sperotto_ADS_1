import { ComportamentoIA } from "./ComportamentoIA";

export class IAAgressiva implements ComportamentoIA {
  agir(): string {
    return "Atacando o inimigo com fúria cega!";
  }

  clone(): ComportamentoIA {
    return new IAAgressiva();
  }
}
