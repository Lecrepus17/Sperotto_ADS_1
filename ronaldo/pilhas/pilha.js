class Pilha {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  // Adiciona um novo elemento no topo da pilha
  empilhar(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // Remove e retorna o elemento do topo da pilha
  desempilhar() {
    if (this.estavazia()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  // Retorna o elemento do topo da pilha sem removê-lo
  topo() {
    if (this.estavazia()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  // Verifica se a pilha está vazia
  estavazia() {
    return this.count === 0;
  }

  // Retorna o número de elementos na pilha
  getTamanho() {
    return this.count;
  }

  // Limpa todos os elementos da pilha
  clear() {
    this.itens = [];
  }

  toString() {
    if (this.estavazia()) {
      return "[]";
    }
    let objString = `[${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`; // {3}
    }
    return objString + ']';
  }
}
module.exports = {
    Pilha,
  };
  