var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');

let a = Number(lines[0]);
let b = Number(lines[1]);
let x = a * b
console.log('PROD = ' + x);
