let a = Math.floor(Math.random() * 6 + 4);
let b = Math.floor(Math.random() * 6 + 4);
let c = Math.floor(Math.random() * 6 + 4);

let maior = Math.max([a], [b], [c]);
let soma = a + b + c - maior;

if (soma > maior) {
  funfa = "Existe e é ";
  if (a === b && b === c) console.log(funfa + "equilatero");
  else if (a === b || b === c || a === c) console.log(funfa + "isóceles");
  else console.log(funfa + "escaleno");
} else console.log("não existe");
console.log(a + " " + b + " " + c);
