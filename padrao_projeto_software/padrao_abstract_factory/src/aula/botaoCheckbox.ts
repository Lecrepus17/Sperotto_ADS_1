interface Botao {
  renderizar(): void;
}

interface Checkbox {
  marcar(): void;
}

class BotaoWindows implements Botao {
  renderizar(): void {
    console.log("Botão do Windows sendo renderizado.");
  }
}
class BotaoMac implements Botao {
  renderizar(): void {
    console.log("Botão do Mac sendo renderizado.");
  }
}

class CheckboxWindows implements Checkbox {
  marcar(): void {
    console.log("Checkbox do Windows sendo marcado.");
  }
}

class CheckboxMac implements Checkbox {
  marcar(): void {
    console.log("Checkbox do Mac sendo marcado.");
  }
}

interface GUIFactory {
  criarBotao(): Botao;
  criarCheckbox(): Checkbox;
}

class GUIFabricaWindows implements GUIFactory {
  criarBotao(): Botao {
    return new BotaoWindows();
  }

  criarCheckbox(): Checkbox {
    return new CheckboxWindows();
  }
}

class GUIFabricaMac implements GUIFactory {
  criarBotao(): Botao {
    return new BotaoMac();
  }

  criarCheckbox(): Checkbox {
    return new CheckboxMac();
  }
}

class Aplicacao {
  fabrica: GUIFactory;
  constructor(fabrica: GUIFactory) {
    this.fabrica = fabrica;
  }

  desenharTela(): void {
    const botao: Botao = this.fabrica.criarBotao();
    const checkbox: Checkbox = this.fabrica.criarCheckbox();

    botao.renderizar();
    checkbox.marcar();
  }
}

const tema: string = "Windows";
let app = tema === "Windows" ? new GUIFabricaWindows() : new GUIFabricaMac();

const aplicacao = new Aplicacao(app);
aplicacao.desenharTela();

const tema2: string = "Mac";
let app2 = tema2 === "Windows" ? new GUIFabricaWindows() : new GUIFabricaMac();


const aplicacao2 = new Aplicacao(app2);
aplicacao2.desenharTela();