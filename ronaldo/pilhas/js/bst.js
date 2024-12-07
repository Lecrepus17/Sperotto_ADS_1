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
      this.inOrderTraverseNode(node._left, callback);
      callback(node._key);
      this.inOrderTraverseNode(node._right, callback);
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

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this._root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node._left, callback);
      this.postOrderTraverseNode(node._right, callback);
      callback(node._key);
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

  search(key) {
    const node = this.searchNode(this._root, key);
    if (node && node._key == key) {
      console.log(node);
    } else {
      console.log("Chave não encontrada");
    }
  }

  searchNode(node, key) {
    if (node === null) {
      return null;
    }

    if (key === node._key) {
      return node;
    } else if (key < node._key) {
      return this.searchNode(node._left, key);
    } else {
      return this.searchNode(node._right, key);
    }
  }

  remove(key) {
    const node = this.removeNode(this._root, key);
    if (node) {
      return node;
    } else {
      return "Chave não encontrada";
    }
  }

  removeNode(node, key) {
    if (node == null) {
      return null;
    }
    if (node._key > key) {
      node._left = this.removeNode(node._left, key);
      return node;
    } else if (node._key < key) {
      node._right = this.removeNode(node._right, key);
      return node;
    } else {
      // cenario 1
      if (node._left == null && node._right == null) {
        node = null;
        return node;
      }

      // cenario 2
      if (node._left == null) {
        node = node._right;
        return node;
      } else if (node._right == null) {
        node = node._left;
        return node;
      }
      // cenario 3
      const aux = this.minNode(node._right);
      node._key = aux._key;
      node._right = this.removeNode(node._right, aux._key);
      return node;
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

// const printNode = (value) => console.log(value);
// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.postOrderTraverse(printNode);
// tree.min();
// tree.max();

// tree.search(25436436);
tree.search(13);
tree.remove(12);
tree.search(13);
// tree.remove(5);
// tree.remove(12);
