const { Stack } = require("../js/menorPilha");

describe("Menor da Pilha", () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test("Deve retornar 3 após a sequência de operações PUSH e MIN", () => {
    stack.push(5);
    stack.push(7);
    stack.push(3);
    stack.push(8);
    stack.push(10);
    expect(stack.getMin()).toBe(3);

    stack.pop();
    stack.pop();
    expect(stack.getMin()).toBe(3);

    stack.pop();
    expect(stack.getMin()).toBe(5);
  });

  test("Deve retornar 50 após a sequência de operações PUSH, POP e MIN", () => {
    stack.push(100);
    stack.push(50);
    expect(stack.getMin()).toBe(50);

    stack.push(45);
    expect(stack.getMin()).toBe(45);

    stack.pop();
    expect(stack.getMin()).toBe(50);

    stack.pop();
    expect(stack.getMin()).toBe(100);
  });
});
