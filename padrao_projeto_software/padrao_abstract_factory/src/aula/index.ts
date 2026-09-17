interface BrinquedoAcessorio {
  usar(): void;
}

interface BrinquedoTransporte {
  mudarDeLugar(): void;
}

class CapaceteAstronauta implements BrinquedoAcessorio {
  usar(): void {
    console.log("Capacete do astronauta sendo usado.");
  }
}
class EspacoNave implements BrinquedoTransporte {
  mudarDeLugar(): void {
    console.log("Espaço nave mudando de lugar.");
  }
}

class ChapeuPirata implements BrinquedoAcessorio {
  usar(): void {
    console.log("Chapéu de pirata sendo usado.");
  }
}
class Barco implements BrinquedoTransporte {
  mudarDeLugar(): void {
    console.log("Barco mudando de lugar.");
  }
}

interface FabricaBrinquedo {
  criarAcessorio(): BrinquedoAcessorio;
  criarTransporte(): BrinquedoTransporte;
}

class FabricaEspaco implements FabricaBrinquedo {
  criarAcessorio(): BrinquedoAcessorio {
    return new CapaceteAstronauta();
  }

  criarTransporte(): BrinquedoTransporte {
    return new EspacoNave();
  }
}

class FabricaPirata implements FabricaBrinquedo {
  criarAcessorio(): BrinquedoAcessorio {
    return new ChapeuPirata();
  }

  criarTransporte(): BrinquedoTransporte {
    return new Barco();
  }
}

class Pedido {
  fabrica: FabricaBrinquedo;
  constructor(fabrica: FabricaBrinquedo) {
    this.fabrica = fabrica;
  }

  montar(): void {
    const acessorio: BrinquedoAcessorio = this.fabrica.criarAcessorio();
    const transporte: BrinquedoTransporte = this.fabrica.criarTransporte();

    acessorio.usar();
    transporte.mudarDeLugar();
  }
}

const tema: string = "Espaço";
let fabrica = tema === "Espaço" ? new FabricaEspaco() : new FabricaPirata();

const pedido = new Pedido(fabrica);
pedido.montar();

const tema2: string = "Pirata";
let fabrica2 = tema2 === "Espaço" ? new FabricaEspaco() : new FabricaPirata();


const pedido2 = new Pedido(fabrica2);
pedido2.montar();


