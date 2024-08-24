var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');

let a = Number(lines[0]);
let b = Number(lines[1]);
let n1 = a * .35
let n2 = b * .75
let x = (n1+n2) * 10 / 11
console.log('MEDIA = ' + x.toFixed(5));
