class Queue {
  constructor() {
    this.elements = [];
  }

  // Enfileirar
  enqueue(element) {
    this.elements.push(element);
  }

  // Verifica se a fila está vazia
  isEmpty() {
    return this.elements.length === 0;
  }

  // Retorna o primeiro elemento da fila
  nextElement() {
    if (this.isEmpty()) {
      throw new Error("A fila está vazia");
    }
    return this.elements[0];
  }

  // Desenfileirar
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("A fila está vazia");
    }
    return this.elements.shift();
  }

  // Mostra todos os elementos
  toString() {
    return this.elements.join(", ");
  }
}
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

function identificarEstruturas(funcao, vetor) {
  isPilha = isFila = isFilaPrioridade = true;

  pilha = new Stack();
  fila = new Queue();
  filaPrioritaria = [];
  for (i = 0; i < funcao.length; i++) {
    if (funcao[i] == 1) {
      // 1 adiciona

      // pilha
      pilha.push(vetor[i]);

      // fila
      fila.enqueue(vetor[i]);

      // fila prioritária
      if (filaPrioritaria.length === 0) {
        filaPrioritaria.push(vetor[i]);
      } else {
        temp = vetor[i];
        for (p = 0; p <= filaPrioritaria.length; p++) {
          if (temp > filaPrioritaria[p]) {
            temp2 = filaPrioritaria[p];
            filaPrioritaria[p] = temp;
            temp = temp2;
          }
        }
        filaPrioritaria.push(temp);
      }
    } else if (funcao[i] == 2) {
      // 2 remove

      // pilha
      testePilha = pilha.pop();
      if (testePilha != vetor[i]) {
        isPilha = false;
      }

      // fila
      testeFila = fila.dequeue();
      if (testeFila != vetor[i]) {
        isFila = false;
      }

      // fila prioritária
      testeFilaPrioritaria = filaPrioritaria.shift();
      if (testeFilaPrioritaria != vetor[i]) {
        isFilaPrioridade = false;
      }
      if (isFilaPrioridade == false && isFila == false && isPilha == false) {
        break;
      }
    }
  }

  if (
    (isPilha && isFila) ||
    (isPilha && isFilaPrioridade) ||
    (isFilaPrioridade && isFila)
  ) {
    return "not sure";
  } else if (isPilha) {
    return "stack";
  } else if (isFila) {
    return "queue";
  } else if (isFilaPrioridade) {
    return "priority queue";
  } else {
    return "impossible";
  }
}

module.exports = identificarEstruturas;
