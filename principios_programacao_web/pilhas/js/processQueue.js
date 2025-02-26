function processQueue(N, M, v, c) {
  const processingTimes = Array(N).fill(0); // Tempo de cada caixa

  c.forEach((clientItems) => {
    // Encontrar o caixa que terminará mais cedo
    let minTimeIndex = 0;
    for (let i = 1; i < N; i++) {
      if (processingTimes[i] < processingTimes[minTimeIndex]) {
        minTimeIndex = i;
      }
    }

    // Adicionar o tempo que o cliente levará no caixa
    processingTimes[minTimeIndex] += v[minTimeIndex] * clientItems;
  });

  // O tempo total será o maior tempo entre todos os caixas
  return Math.max(...processingTimes);
}

module.exports = { processQueue };
