const { processQueue } = require("../processQueue");

describe("Fila do Supermercado", () => {
  test("Exemplo 1: deve retornar 18", () => {
    const N = 1;
    const M = 1;
    const temposDeCaixa = [3]; // Tempo para processar 1 item
    const clientes = [6]; // Cliente com 6 itens

    const resultado = processQueue(N, M, temposDeCaixa, clientes);
    expect(resultado).toBe(18); // 6 itens * 3 por item
  });

  test("Exemplo 2: deve retornar 8", () => {
    const N = 1;
    const M = 2;
    const temposDeCaixa = [1, 5];
    const clientes = [3, 5];

    const resultado = processQueue(N, M, temposDeCaixa, clientes);
    expect(resultado).toBe(8); // Melhor distribuição possível
  });

  test("Exemplo 3: deve retornar 13", () => {
    const N = 2;
    const M = 3;
    const temposDeCaixa = [1, 2];
    const clientes = [10, 5, 3];

    const resultado = processQueue(N, M, temposDeCaixa, clientes);
    expect(resultado).toBe(13);
  });
});
