import { EstrategiaAtaque } from "../Strategy/EstrategiaAtaque";
import { Agente } from "./Agente";
import { Criatura } from "./Criatura";
import { Entidade } from "./Entidade";
import { TipoEntidadeEnum } from "./TipoEntidadeEnum";

export class EntidadeFactory {
    public static criarEntidade(tipo: TipoEntidadeEnum, nome: string, vida: number, estrategia: EstrategiaAtaque): Entidade {
        if (tipo === TipoEntidadeEnum.AGENTE) {
            return new Agente(nome, vida, estrategia);
        }
        return new Criatura(nome, vida, estrategia);
    }
}