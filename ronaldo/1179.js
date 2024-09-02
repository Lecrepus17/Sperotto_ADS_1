var input = require("fs").readFileSync("dev/stdin", "utf8");
var lines = input.split("\n");
par = [];
impar = [];
lines.forEach(function (numero) {
  n = Number(numero);
  r = 0;
  if (n % 2 == 0) {
    par.push(n);
  } else {
    impar.push(n);
  }
  if (par.length == 5) {
    par.forEach(function (n, i) {
      console.log("par[" + i + "] = " + n);
    });
    par = []
  } else if (impar.length == 5) {
    impar.forEach(function (n, i) {
      console.log("impar[" + i + "] = " + n);
    });
    impar = []
  }
})
impar.forEach(function (n, i) {
  console.log("impar[" + i + "] = " + n);
});
par.forEach(function (n, i) {
  console.log("par[" + i + "] = " + n);
});
