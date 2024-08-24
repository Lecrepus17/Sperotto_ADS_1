var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');

let a = Number(lines[0]);
let b = Number(lines[1]);
let c = Number(lines[2]);
let n1 = a * .2
let n2 = b * .3
let n3 = c * .5
let x = n1+n2+n3
console.log('MEDIA = ' + x.toFixed(1));