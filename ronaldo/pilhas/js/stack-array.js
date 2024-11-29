// export default
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

const pilha = new Stack();
// console.log(pilha);
// console.log(pilha.isEmpty() ? "Está vazio" : "não está vazio");

pilha.push(17);
pilha.push(55);
pilha.push(27);
console.log(pilha.isEmpty());
console.log(pilha.size());
console.log(pilha.peek());
console.log(pilha.pop());
console.log(pilha.pop());
console.log(pilha.pop());
console.log(pilha.isEmpty());
console.log(pilha.size());

// console.log(pilha.toString());
// console.log(pilha.peek());

// pilha.push(12);
// pilha.push(32);
// pilha.push(1);

// console.log(pilha.isEmpty() ? "Está vazio" : "não está vazio");

// console.log(pilha.pop());
// console.log(pilha.peek());
// console.log(pilha.pop());

// console.log(pilha.toString());
// console.log(pilha.size());
