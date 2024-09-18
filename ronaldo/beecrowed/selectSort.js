let vetor = [
  199, 23, 9, 54, 123, 1965, -231, -165, 165, -231, 46, 23, -94, 564, 798,
];

function SelectionSort(vetor) {
  for (i = 0; i < vetor.length; i++) {
    for (a = i + 1; a < vetor.length; a++) {
      if (vetor[a] < vetor[i]) {
        [vetor[a], vetor[i]] = [vetor[i], vetor[a]];
      }
    }
  }
  return vetor
}
console.log('saida: ' + SelectionSort(vetor))