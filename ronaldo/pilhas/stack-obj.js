class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  // Adiciona um novo elemento no topo da pilha
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // Remove e retorna o elemento do topo da pilha
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  // Retorna o elemento do topo da pilha sem removê-lo
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  // Verifica se a pilha está vazia
  isEmpty() {
    return this.count === 0;
  }

  // Retorna o número de elementos na pilha
  size() {
    return this.count;
  }

  // Limpa todos os elementos da pilha
  clear() {
    this.itens = {};
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`; // {3}
    }
    return objString;
  }
}
module.exports = {
  Stack,
};
