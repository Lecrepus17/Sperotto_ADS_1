class Node {
  constructor(node, element) {
    this._next = node;
    this._element = element;
  }
  setNextElement(node) {
    this._next = node;
  }
  getNextElement(node) {
    return this._next;
  }
  getElement(node) {
    return this._element;
  }
}
module.exports = { Node };
