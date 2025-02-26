class QueueObj {
  constructor() {
    this.elements = {};
    this.front = 0; // Indica o início da fila
    this.rear = 0; // Indica o final da fila
  }

  // Enfileirar
  enqueue(element) {
    this.elements[this.rear] = element;
    this.rear++;
  }

  // Verifica se a fila está vazia
  isEmpty() {
    return this.front === this.rear;
  }

  // Retorna o primeiro elemento da fila
  nextElement() {
    if (this.isEmpty()) {
      throw new Error("A fila está vazia");
    }
    return this.elements[this.front];
  }

  // Desenfileirar
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("A fila está vazia");
    }
    const element = this.elements[this.front];
    delete this.elements[this.front]; // Remove o elemento
    this.front++;
    return element;
  }

  // Mostra todos os elementos
  toString() {
    const elementsArray = [];
    for (let i = this.front; i < this.rear; i++) {
      elementsArray.push(this.elements[i]);
    }
    return elementsArray.join(", ");
  }
}

module.exports = QueueObj;
