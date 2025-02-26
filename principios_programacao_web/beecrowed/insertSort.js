let vetor = [
  199, 23, 9, 54, 123, 1965, -231, -165, 165, -231, 46, 23, -94, 564, 798,
];

function insertSort(vetor) {
  for (i = 0; i < vetor.length; i++) {
    if (vetor[i] > vetor[i + 1]) {
      [vetor[i + 1], vetor[i]] = [vetor[i], vetor[i + 1]];
      for (i2 = i - 1; i2 >= 0; i2--) {
        vetor[i2] > vetor[i2 + 1]
          ? ([vetor[i2], vetor[i2 + 1]] = [vetor[i2 + 1], vetor[i2]])
          : (i2 = 0);
      }
    }
  }
  return vetor;
}
console.log("saida: " + insertSort(vetor));
