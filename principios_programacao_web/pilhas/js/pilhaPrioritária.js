class Queue {
  constructor() {
    this.count = 0;
    this.items = {};
    this.priority = 0;
    this.front = 0;
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  priorityEnqueue(element) {
    for (let i = this.count; i > this.front; i--) {
      [this.items[i]] = [this.items[i - 1]];
    }
    this.count++;
    this.items[this.front] = element;
    this.priority++;
  }

  size() {
    return this.count - this.front;
  }

  isEmpty() {
    return this.count - this.front === 0;
  }

  clear() {
    this.count = 0;
    this.items = {};
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.front];
    if (this.priority >= 1) {
      this.priority--;
    }
    delete this.items[this.front];
    this.front++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - this.front - 1];
  }

  toString() {
    if (this.isEmpty()) {
      return ``;
    }
    let objString = `${this.items[this.front]}`;
    for (let i = this.front + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

module.exports = Queue;

let f = new Queue();

f.enqueue(1);
f.enqueue(2);
f.toString();
f.priorityEnqueue(33);
f.enqueue(4);
f.toString();
f.priorityEnqueue(55);
f.enqueue(6);
f.enqueue(7);
f.toString();
f.priorityEnqueue(88);
f.toString();
f.enqueue(9);
f.enqueue(1);
f.dequeue();
f.toString();
f.dequeue();
f.toString();
f.dequeue();
f.toString();
f.dequeue();
f.toString();
f.dequeue();
f.toString();
