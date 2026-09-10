interface Transporte {
    entregar(): string
}

class Caminhao implements Transporte {
    entregar(): string {
        console.log("Transporte efetuado via Caminhão");
        return "Caminhão";
    }
}
class Navio implements Transporte {
    entregar(): string {
        console.log("Transporte efetuado via Navio");
        return "Navio";
    }
}

abstract class Logistica {
    abstract criarTransporte(): Transporte;
    executarEntrega() {
        const transporte = this.criarTransporte();
        return 'Logística: ' + transporte.entregar();
    }
}

class LogisticaTerrestre extends Logistica {
    criarTransporte(): Transporte {
        return new Caminhao();
    }
}

class LogisticaMaritima extends Logistica {
    criarTransporte(): Transporte {
        return new Navio();
    }
}

const logistica = new LogisticaTerrestre();
console.log(logistica.executarEntrega());

const logisticaMaritima = new LogisticaMaritima();
console.log(logisticaMaritima.executarEntrega());