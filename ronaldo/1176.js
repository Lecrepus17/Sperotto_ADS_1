var input = require("fs").readFileSync("dev/stdin", "utf8");
var lines = input.split("\n");
delete lines[0]
lines.forEach(function (numero) {
  n = Number(numero);
  ultimo = 1;
  penultimo = 0;
  r = 0;
  if (n == 1) {
    r = 1;
  } else {
    for (i = 1; i < n; i++) {
      r = ultimo + penultimo;
      penultimo = ultimo;
      ultimo = r;
    }
  }

  console.log("Fib(" + n + ") = " + r);
});
