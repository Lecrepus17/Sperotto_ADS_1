var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');

let a = Number(lines[0]);

let x = a * a * 3.14159


console.log('A=' + x.toFixed(4));
