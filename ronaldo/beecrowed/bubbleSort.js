let vetor = [
  199, 23, 9, 54, 123, 1965, -231, -165, 165, -231, 46, 23, -94, 564, 798,
];

function bubbleSort(vetor) {
  for (i = vetor.length; i > 0; i--) {
    naoAlterado = true;
    for (i2 = 0; i2 < i; i2++) {
      vetor[i2] > vetor[i2 + 1] ? ([vetor[i2 + 1], vetor[i2]] = [vetor[i2], vetor[i2 + 1]]) : naoAlterado = false;
    }
    if(naoAlterado){
      return vetor
    }
  }
  return vetor;
}
console.log("saida: " + bubbleSort(vetor));
