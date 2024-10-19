const { Node } = require("./node");

class LinkedList {
  constructor() {
    this._head = undefined;
    this._last = undefined;
    this._length = 0;
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
    if (this._length === 0) {
      return "[]";
    }
    let str = "[";
    let node = this._head;
    for (let i = 0; i < this._length - 1; i++) {
      str += node.getElement();
      str += ", ";
      str += node.getNextElement();
    }
    str += node.getElement();
    str += "]";
    return str;
  }
}

let listaLigada = new LinkedList();
listaLigada.addBeginning("Sperotto");
listaLigada.addBeginning("Lealdade");
console.log(listaLigada.toString());
