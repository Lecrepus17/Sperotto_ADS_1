var input = require("fs").readFileSync("dev/stdin", "utf8");
var lines = input.split("\n");
numeroTotalLidos = lines[0];
numeros = lines[1].split(" ");
menor = null
posicao = null
for (i = 0; i < numeroTotalLidos; i++) {
  if(menor > numeros[i]){
    menor = numeros[i]
    posicao = i
  }
}
console.log('Menor valor: ' + menor)
console.log('Posicao: ' + posicao)