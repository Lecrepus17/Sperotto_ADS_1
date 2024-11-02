class DoublyNode {
  constructor(element) {
    this.element = element;
    this.next = undefined;
    this.previous = undefined;
  }
}

class DoublyLinkedList {
  constructor() {
    this.count = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  push(element) {
    const doublyNode = new DoublyNode(element);
    if (this.isEmpty()) {
      this.head = doublyNode;
      this.tail = doublyNode;
    } else {
      this.tail.next = doublyNode;
      doublyNode.previous = this.tail;
      this.tail = doublyNode;
    }
    this.count++;
  }
  removeAt(index) {
    // verifica valores fora do intervalo
    if (index >= 0 && index < this.count) {
      let current;
      //remove o primeiro item
      if (index === 0) {
        current = this.head;
        this.head = current.next;
        if (this.head) {
          //verificação de lista vazia
          this.head.previous = null;
        } else {
          this.next = null;
        }
      } else if (index === this.size() - 1) {
        current = this.tail;
        this.tail = current.previous; // atribui a tail o valor anterior a ela
        this.tail.next = null;
      } else {
        current = this.head;
        for (let i = 0; i < index; i++) {
          current = current.next;
        }
        current.previous.next = current.next; //espero q isso funcione
        current.next.previous = current.previous;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const doublyNode = new DoublyNode(element);
      if (index === 0) {
        // adiciona na primeira posição
        const current = this.head;
        doublyNode.next = current; // {2}
        this.head = doublyNode;
        if (current) {
          current.previous = this.head;
        } else {
          this.tail = doublyNode;
        }
      } else if (index === this.size()) {
        const current = this.tail;
        current.next = doublyNode;
        doublyNode.previous = current;
        this.tail = doublyNode;
      } else {
        const prev = this.getElementAt(index - 1);
        const next = prev.next;
        doublyNode.next = next;
        prev.next = doublyNode;
        doublyNode.previous = prev;
        next.previous = doublyNode;
      }
      // atualiza o tamanho da lista
      this.count++;
      return true;
    }
    return false;
  }
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (element === current.element) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next; // {3}
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString}, ${current.element}`;
      current = current.next;
    }
    return objString;
  }
}

module.exports = DoublyLinkedList;

// Cria uma nova lista de carros
const listaDeCarros = new DoublyLinkedList();

// Adiciona o carro "Uno Mille"
listaDeCarros.push("Uno Mille");

// Adiciona no fim da lista o carro "Corsa"
listaDeCarros.push("Corsa");

// Adiciona na posição 2 o carro "KA"
listaDeCarros.insert("KA", 1);

// Adiciona no início da lista o carro "Gol"
listaDeCarros.insert("Gol", 0);

// Imprime a lista
console.log("Lista de Carros:", listaDeCarros.toString());

// Imprime a quantidade de elementos
console.log("Quantidade de elementos:", listaDeCarros.size());

// Remove o carro da posição 3
listaDeCarros.removeAt(2);

// Imprime a lista após remoção
console.log(
  "Lista de Carros após remover o carro da posição 3:",
  listaDeCarros.toString()
);

// Remove o carro do início da lista
listaDeCarros.removeAt(0);

// Imprime o primeiro carro da lista
console.log("Primeiro carro da lista:", listaDeCarros.getHead().element);

// Remove o carro do final da lista
listaDeCarros.removeAt(listaDeCarros.size() - 1);

// Verifica se o carro "KA" existe na lista
const indexKA = listaDeCarros.indexOf("KA");
if (indexKA !== -1) {
  const carroKA = listaDeCarros.getElementAt(indexKA);
  console.log("Carro encontrado:", carroKA.element);
  console.log("Próximo carro:", carroKA.next ? carroKA.next.element : "Nenhum");
  console.log(
    "Carro anterior:",
    carroKA.previous ? carroKA.previous.element : "Nenhum"
  );
}

// Imprime novamente a lista
console.log("Lista de Carros final:", listaDeCarros.toString());