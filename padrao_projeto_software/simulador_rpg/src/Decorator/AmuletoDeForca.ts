import { EquipamentoDecorator } from "./EquipamentoDecorator";

export class AmuletoDeForca extends EquipamentoDecorator {
    atacar(): number {
        const danoOriginal = this.entidadeEnvolvida.atacar();
        return danoOriginal + 5; // Adiciona bônus fixo
    }
}