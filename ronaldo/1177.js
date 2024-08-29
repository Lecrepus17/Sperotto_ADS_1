var input = require("fs").readFileSync("dev/stdin", "utf8");
var lines = input.split("\n");
n = Number(lines[0]);
x = 0;
for (i = 0; i < 1000; i++) {
  console.log("N[" + i + "] = " + x);
  x++;
  if (x == n) {
    x = 0;
  }
}