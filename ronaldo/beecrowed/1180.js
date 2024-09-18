var input = require("fs").readFileSync("dev/stdin", "utf8");
var lines = input.split("\n");


numeroTotalLidos = Number(lines[0]);
numeros = lines[1].split(" ");
menor = numeros[0]
posicao = 0


for (i = 0; i < numeroTotalLidos; i++) {
  if(menor >  Number(numeros[i])){
    menor =  Number(numeros[i])
    posicao = i
  }
}
console.log('Menor valor: ' + menor)
console.log('Posicao: ' + posicao)