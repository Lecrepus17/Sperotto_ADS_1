var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');

lines.forEach(function(numero, index) {
    n = Number(numero)
    if(n <= 0){
        n = 1
    }
    console.log('X[' + index + '] = ' + n)
});
