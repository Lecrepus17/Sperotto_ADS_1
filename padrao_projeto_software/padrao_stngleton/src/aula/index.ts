class CoordenadorCurso {
    private nome: string;
    private curso: string;

    private static instancia: CoordenadorCurso

    private constructor(nome: string, curso: string) {
        this.nome = nome;
        this.curso = curso;
    }

    static getInstancia(): CoordenadorCurso {
        if (!CoordenadorCurso.instancia) {
            CoordenadorCurso.instancia = new CoordenadorCurso('Thyago', 'ADS');
        }
        return CoordenadorCurso.instancia;
    }

    darAviso():void {
        // console.log(`Coordenador ${this.nome} está avisando sobre o curso de ${this.curso}.`);
    }

}

// exemplos
const Coordenador = CoordenadorCurso.getInstancia();
const Coordenador1 = CoordenadorCurso.getInstancia();
Coordenador.darAviso()

// console.log(Coordenador == Coordenador1);


class Lanche {
    public pao: string;
    public carne: string;
    public queijo: boolean;
    public salada: boolean;
    public molho: boolean;

    constructor(
        builder: LancheBuilder
    ) {
        this.pao = builder.pao;
        this.carne = builder.carne;
        this.queijo = builder.queijo;
        this.salada = builder.salada;
        this.molho = builder.molho;
    }

    detalhar() {
        console.log(`Pão: ${this.pao}, Carne: ${this.carne}, Queijo: ${this.queijo}, Salada: ${this.salada}, Molho: ${this.molho}`);
    }
}

class LancheDiretor {
    public builder: LancheBuilder;
    constructor(
        builder: LancheBuilder
    ) {
        this.builder = builder;
    }

    criarLancheCompleto() {
        return this.builder
        .comQueijo()
        .comSalada()
        .comMolho()
        .build()
    }

    criarLancheCarneEQueijo() {
        return this.builder
        .comQueijo()
        .comMolho(false)
        .comSalada(false)
        .build()
    }
}

class LancheBuilder {
    public pao: string;
    public carne: string;
    public queijo: boolean = false;
    public salada: boolean = false;
    public molho: boolean = false;

    constructor(pao: string, carne: string) {
        this.pao = pao;
        this.carne = carne;
    }

    comQueijo(queijo: boolean = true) {
        this.queijo = queijo;
        return this;
    }
    comSalada(salada: boolean = true) {
        this.salada = salada;
        return this;
    }
    comMolho(molho: boolean = true) {
        this.molho = molho;
        return this;
    }

    build(): Lanche {
        const lanche = new Lanche(this);
        return lanche;
    }
}


const builder = new LancheBuilder('Pão', 'Carne');

const lanche2 = new LancheDiretor(builder);
lanche2.criarLancheCompleto().detalhar();

const lanche3 = new LancheDiretor(builder);
lanche3.criarLancheCarneEQueijo().detalhar();
