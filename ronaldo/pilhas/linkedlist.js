const { Node } = require("./outro");

class LinkedList {
  constructor() {
    this._count = 0;
    this._head = undefined;
  }

  addBeginning(element) {
    let new_node = new Node(this._head, element);
    this._head = new_node;
    if (this._length === 0) {
      this._last = this._head;
    }
    this._length++;
  }

  toString() {
    if (this._head == null) {
      return "";
    }
    let objString = `${this._head.element}`;
    let current = this._head.next; // {3}
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }

  removeAt(index) {
    // verifica valores fora do intervalo
    if (index >= 0 && index < this._count) {
      let current = this._head;
      //remove o primeiro item
      if (index === 0) {
        this._head = current.next;
      } else {
        let previous;
        for (let i = 0; i < index; i++) {
          previous = current;
          current = current.next;
        }
        // faz a ligação de previous com o next de current: pula esse elemento para removê-lo
        previous.next = current.next;
      }
      this._count--;
      return current.element;
    }
    return undefined;
  }
  getElementAt(index) {
    if (index >= 0 && index <= this._count) {
      let node = this._head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }

    return undefined;
  }

  insert(element, index) {
    if (index >= 0 && index <= this._count) {
      const node = new Node(element);
      if (index === 0) {
        // adiciona na primeira posição
        const current = this._head;
        node.next = current; // {2}
        this._head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
      // atualiza o tamanho da lista
      this._count++;
      return true;
    }
    return false;
  }
  indexOf(element) {
    let current = this._head;
    for (let i = 0; i < this._count && current != null; i++) {
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
    return this._count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  getHead() {
    return this._head;
  }

  push(element) {
    const node = new Node(element);
    let current;
    if (this._head == null) {
      this._head = node;
    } else {
      current = this._head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this._count++;
  }
}

let listaLigada = new LinkedList();
listaLigada.addBeginning("Ronaldo");
console.log(listaLigada.toString());
// listaLigada.insert("Carol", listaLigada.size);
// listaLigada.insert("Betty", 2);
// listaLigada.insert("Marina", listaLigada.getHead());
// console.log(listaLigada.toString());
// console.log(listaLigada.size());
// listaLigada.remove(listaLigada.getElementAt(2));
// console.log(listaLigada.toString());
// listaLigada.remove(listaLigada.getHead());
// console.log(listaLigada.getElementAt(listaLigada.getHead()));
// listaLigada.remove(listaLigada.size());

// if (listaLigada.indexOf("Betty") == -1) {
//   console.log("existe");
// } else {
//   console.log("não existe");
// }
// console.log(listaLigada.toString());
