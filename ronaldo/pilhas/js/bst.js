const Node = require("./BSTNode");

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  insert(key) {
    if (this._root == null) {
      this._root = new Node(key);
    } else {
      this.insertNode(this._root, key);
    }
  }

  insertNode(node, key) {
    if (key < node._key) {
      if (node._left == null) {
        node._left = new Node(key);
      } else {
        this.insertNode(node._left, key);
      }
    } else {
      if (node._right == null) {
        node._right = new Node(key);
      } else {
        this.insertNode(node._right, key);
      }
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this._root, callback);
  }

  inOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node._key);
      this.inOrderTraverseNode(node._right, callback);
      this.inOrderTraverseNode(node._left, callback);
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this._root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node._key);
      this.preOrderTraverseNode(node._left, callback);
      this.preOrderTraverseNode(node._right, callback);
    }
  }

  min() {
    return console.log(this.minNode(this._root)._key);
  }

  minNode(node) {
    let current = node;
    while (current != null && current._left != null) {
      current = current._left;
    }
    return current;
  }

  max() {
    return console.log(this.maxNode(this._root)._key);
  }

  maxNode(node) {
    let current = node;
    while (current != null && current._right != null) {
      current = current._right;
    }
    return current;
  }

  specific(key) {
    const node = this.specificNode(this._root, key);
    if (node) {
      console.log(node);
    } else {
      console.log("Chave não encontrada");
    }
  }

  specificNode(node, key) {
    if (node === null) {
      return null;
    }

    if (key === node._key) {
      return node;
    } else if (key < node._key) {
      return this.specificNode(node._left, key);
    } else {
      return this.specificNode(node._right, key);
    }
  }
}

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

const printNode = (value) => console.log(value);
// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.min();
// tree.max();

// tree.specific(20);
