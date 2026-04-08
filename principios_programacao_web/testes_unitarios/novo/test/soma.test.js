const { soma } = require("../js/soma.js");

describe("Função soma", () => {
  test("soma de dois números", () => {
    expect(soma(1, 2)).toBe(3);
    expect(soma(5, 10)).toBe(15);
  });

  test("soma de números negativos", () => {
    expect(soma(-1, -2)).toBe(-3);
    expect(soma(-5, -10)).toBe(-15);
  });

  test("soma de zero e um número", () => {
    expect(soma(0, 5)).toBe(5);
  });
});
