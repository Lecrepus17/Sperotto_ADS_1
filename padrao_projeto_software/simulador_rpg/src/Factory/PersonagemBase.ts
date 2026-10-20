import { Observador } from '../Observer/Observador';
import { EstrategiaAtaque, TipoDano } from '../Strategy/EstrategiaAtaque';
import { Entidade } from './Entidade';

export abstract class PersonagemBase implements Entidade {
    protected observadores: Observador[] = [];

    constructor(
        protected nome: string,
        protected vida: number,
        protected ataqueStrategy: EstrategiaAtaque
    ) {}

    inscrever(obs: Observador) {
        this.observadores.push(obs);
    }

    notificar(mensagem: string) {
        this.observadores.forEach(obs => obs.atualizar(mensagem));
    }

    getNome(): string { return this.nome; }
    getVida(): number { return this.vida; }
    
    receberDano(dano: number): void {
        this.vida = Math.max(0, this.vida - dano);
        if (this.vida <= 0) {
            this.notificar(`${this.nome} foi derrotado em combate!`);
        }
    }

    setEstrategia(estrategia: EstrategiaAtaque): void {
        this.ataqueStrategy = estrategia;
    }

    getEstrategia(): EstrategiaAtaque {
        return this.ataqueStrategy;
    }

    getTipoAtaque(): TipoDano {
        return this.ataqueStrategy.getTipo();
    }

    atacar(alvo?: Entidade): number {
        return this.ataqueStrategy.executar(0, alvo);
    }
}
