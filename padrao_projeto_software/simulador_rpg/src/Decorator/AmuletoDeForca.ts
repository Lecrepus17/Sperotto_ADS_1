import { Entidade } from "../Factory/Entidade";
import { EquipamentoDecorator } from "./EquipamentoDecorator";

export class AmuletoDeForca extends EquipamentoDecorator {
    atacar(alvo?: Entidade): number {
        const danoOriginal = this.entidadeEnvolvida.atacar(alvo);
        return danoOriginal + 5; // Adiciona bônus fixo
    }
}
