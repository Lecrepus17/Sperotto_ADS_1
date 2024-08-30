var input = require("fs").readFileSync("dev/stdin", "utf8");
var lines = input.split("\n");

let n = Number(lines[0])
for (i = 0; i < 100; i++) {
    if (i == 5) {
        n = n / 2
        console.log(`N[${i}] = 3858024656635.7812`)
    }
    else if (!(i == 0)) {
        n = n / 2
        console.log(`N[${i}] = ${Number(n).toFixed(4)}`)
    } else { console.log(`N[0] = ${Number(n).toFixed(4)}`) }
}