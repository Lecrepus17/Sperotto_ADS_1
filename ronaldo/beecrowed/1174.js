var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');

lines.forEach(function(numero, index) {
    n = Number(numero)
    if(n <= 10 && index != 100){
        console.log('A[' + index + '] = ' + n.toFixed(1))
    }
});
