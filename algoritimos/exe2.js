let a = Math.floor(Math.random() * 100);
let b = Math.floor(Math.random() * 100);
let c = Math.floor(Math.random() * 100);

let max = Math.max([a], [b], [c]);
let min = Math.min([a], [b], [c]);
meio = a !== max && a !== min ? a : b !== max && b !== min ? b : c;
console.log(max + " " + meio + " " + min);

let h = 1.8;
sexo = "m";

if (sexo === "f") {
  peso = 62.1 * h - 44.7;
} else if (sexo === "m") {
  peso = 72.7 * h - 58;
}
console.log(peso);

let n1 = 6,
  n2 = 3,
  op = "*";

r =
  op === "-"
    ? n1 - n2
    : op === "+"
    ? n1 + n2
    : op === "/"
    ? n1 / n2
    : op === "*"
    ? n1 * n2
    : "operação inválida";
console.log(r);

let login = "aluno01",
  senha = "aluno01";
if (login === "aluno01" && senha === "aluno01") {
  console.log("aprovado");
} else {
  console.log("reprovado");
}
