class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
    this.minStack = []; // Armazena o histórico dos mínimos
  }

  // Adiciona um novo elemento no topo da pilha
  push(element) {
    this.items[this.count] = element;
    this.count++;

    // Atualiza a pilha de mínimos
    if (this.minStack.length === 0 || element <= this.getMin()) {
      this.minStack.push(element);
    }
  }

  // Remove e retorna o elemento do topo da pilha
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];

    // Atualiza a pilha de mínimos
    if (result === this.getMin()) {
      this.minStack.pop();
    }

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
    this.items = {};
    this.count = 0;
    this.minStack = [];
  }

  // Retorna o menor valor da pilha
  getMin() {
    if (this.minStack.length === 0) {
      return undefined;
    }
    return this.minStack[this.minStack.length - 1];
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

module.exports = {
  Stack,
};
