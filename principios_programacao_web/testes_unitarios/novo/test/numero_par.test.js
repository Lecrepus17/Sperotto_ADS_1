const { par } = require("../js/numero_par.js");

describe("Função par", () => {
  test("verifica se um número é par", () => {
    expect(par(2)).toBe(true);
    expect(par(4)).toBe(true);
  });

  test("verifica se um número é ímpar", () => {
    expect(par(1)).toBe(false);
    expect(par(3)).toBe(false);
  });
});
