class Pilha {
  constructor() {
    this.count = 0;
    this.items = {};
    this.pontos = 0;
  }

  // Adiciona um novo elemento no topo da pilha
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // Adiciona um novo elemento no topo da pilha
  addPonto(element) {
    this.pontos += element;
  }

  // Adiciona um novo elemento no topo da pilha
  pushRandom(element) {
    let i = 0;
    while (i < element) {
      this.items[this.count] = this.getRandom(1, 9);
      this.count++;
      i++;
    }
  }
  getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    this.itens = [];
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
let pilha1 = new Pilha();
let pilha2 = new Pilha();
let pilha3 = new Pilha();
let i = 0;
valorAnterior = 0;
while (i < 3) {
  let i2 = 0;
  pilha1.pushRandom(3);
  pilha2.pushRandom(3);
  pilha3.pushRandom(3);
  while (i2 < 3) {
    val1 = pilha1.pop();
    val2 = pilha2.pop();
    val3 = pilha3.pop();
    let valor = val1 + val2 + val3 + valorAnterior;
    if (val1 > val2 && val1 > val3) {
      pilha1.addPonto(valor);
      valorAnterior = 0;
    } else if (val2 > val1 && val2 > val3) {
      pilha2.addPonto(valor);
      valorAnterior = 0;
    } else if (val3 > val1 && val3 > val2) {
      pilha3.addPonto(valor);
      valorAnterior = 0;
    } else {
      valorAnterior = valor;
    }
    i2++;
  }
  i++;
}
console.log(pilha1);
console.log(pilha2);
console.log(pilha3);
