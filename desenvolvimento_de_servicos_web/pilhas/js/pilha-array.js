class Pilha {
  constructor() {
    this.items = [];
  }
  empilhar(element) {
    this.items.push(element);
  }

  desempilhar() {
    if (this.estavazia()) {
        return undefined;
    }
    return this.items.pop();
  }

  topo() {
    if (this.estavazia()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }
  estavazia() {
    return this.items.length === 0;
  }

  getTamanho() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
  toString() {
    if (this.estavazia()) {
      return "[]";
    }
    let objString = `[${this.items[0]}`;
    console.log(objString);
    for (let i = 1; i < this.items.length; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return `${objString}]`;
  }
}

module.exports = {
  Pilha,
};
