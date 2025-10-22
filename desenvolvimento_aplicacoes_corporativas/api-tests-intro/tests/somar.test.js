// const somar = require("../src/somar");
// // Variáveis compartilhadas apenas para demonstrar hooks
// let a, b;
// // Agrupa os testes de entradas VÁLIDAS
// describe("Casos VÁLIDOS da função somar()", () => {
//   // Roda uma vez antes de TODOS os testes deste describe:
//   beforeAll(() => {
//     console.log("Iniciando suíte de testes de somar...");
//   });
//   // Roda uma vez depois de TODOS os testes deste describe:
//   afterAll(() => {
//     console.log("Suíte de testes de somar finalizada.");
//   });
//   // test.each: Executa o MESMO teste com vários valores diferentes
//   test.each([
//     [2, 3, 5], // positivo + positivo
//     [-4, -2, -6], // negativo + negativo
//     [5, -2, 3], // positivo + negativo
//     [0, 10, 10], // zero + positivo
//     [0, 0, 0], // zero + zero
//   ])("Deve somar %p + %p e retornar %p", (a, b, esperado) => {
//     // Act + Assert
//     expect(somar(a, b)).toBe(esperado);
//   });
// });
// // Agrupa os testes de entradas INVÁLIDAS (que devem lançar erro)
// describe("Casos INVÁLIDOS da função somar() (espera ERROS)", () => {
//   // test.each: Vários cenários que devem lançar erro
//   test.each([
//     ["2", 3], // string no primeiro parâmetro
//     [2, "3"], // string no segundo parâmetro
//     [null, 5], // null em a
//     [5, null], // null em b
//     [undefined, 2], // undefined em a
//     [2, undefined], // undefined em b
//     [NaN, 1], // NaN em a
//     [1, NaN], // NaN em b
//     [{}, 1], // objeto em a
//     [1, {}], // objeto em b
//   ])("Deve lançar erro ao somar %p e %p", (a, b) => {
//     // Para testar erros, passamos uma função para o expect
//     expect(() => somar(a, b)).toThrow("Os parâmetros devem ser números");
//   });
// });

// const { calcularTotal } = require("../src/calculadora");
// const somarMod = require("../src/somar");
// test("deve simular somar com comportamento personalizado", () => {
//   // Espia a função 'somar'
//   const spy = jest.spyOn(somarMod, "somar").mockImplementation(() => 100); // função com valor fake
//   // Executa a função calcularTotal que depende de somar()
//   const resultado = calcularTotal(2, 3);
//   // Verifica se a função espiada foi chamada corretamente
//   expect(spy).toHaveBeenCalledWith(2, 3);
//   expect(resultado).toBe(200); // (100 * 2)
//   spy.mockRestore(); // volta ao original
// });

const { calcularTotal } = require("../src/calculadora");
const somarMod = require("../src/somar");
test("deve simular somar retornando valor fixo", () => {
  // Espia e força a função somar() a sempre retornar 100
  const spy = jest.spyOn(somarMod, "somar").mockReturnValue(100); // valor fake
  // Executa a função calcularTotal que depende de somar()
  const resultado = calcularTotal(2, 3);
  // Verifica se a função espiada foi chamada corretamente
  expect(spy).toHaveBeenCalledWith(2, 3);
  expect(resultado).toBe(200); // (100 * 2)
  spy.mockRestore(); // volta ao original
});
