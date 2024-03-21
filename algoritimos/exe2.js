// let a = Math.floor(Math.random() * 100);
// let b = Math.floor(Math.random() * 100);
// let c = Math.floor(Math.random() * 100);

// let max = Math.max([a], [b], [c]);
// let min = Math.min([a], [b], [c]);
// meio = a !== max && a !== min ? a : b !== max && b !== min ? b : c;
// console.log(max + " " + meio + " " + min);

// let h = 1.8;
// sexo = "m";

// if (sexo === "f") {
//   peso = 62.1 * h - 44.7;
// } else if (sexo === "m") {
//   peso = 72.7 * h - 58;
// }
// console.log(peso);

// let n1 = 6,
//   n2 = 3,
//   op = "*";

// r =
//   op === "-"
//     ? n1 - n2
//     : op === "+"
//     ? n1 + n2
//     : op === "/"
//     ? n1 / n2
//     : op === "*"
//     ? n1 * n2
//     : "operação inválida";
// console.log(r);

// let login = "aluno01",
//   senha = "aluno01";
// if (login === "aluno01" && senha === "aluno01") {
//   console.log("aprovado");
// } else {
//   console.log("reprovado");
// }

// let maca = 12;
// console.log(maca < 12 ? "0,3" : "0,25");

// let n = 4;
// console.log(n % 2 === 0 ? "par" : "impar");

// let r = -6;
// console.log(r > 0 ? "+" : r < 0 ? "-" : "zero");

// if( r > 0){
//   console.log( '+')
// }else if(r < 0){
//   console.log('-' )
// }else{
//   console.log( 'zero')
// }

// let gremio = 3;
// let inter = 1;
// console.log(gremio > inter ? "Gremio" : gremio < inter ? "inter" : "empate");

// let n1 = 15;
// let n2 = 20;
// let soma = n1 + n2;
// console.log(soma > 20 ? soma + 8 : soma - 5);

let inss = 2500
console.log("Desconto: ", inss <= 600 ? "isento" : inss <= 1200 ? inss*0.2 : inss <= 2000 ? inss*0.25 : inss*0.3);