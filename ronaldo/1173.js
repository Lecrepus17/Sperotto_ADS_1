var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');
n = Number(lines[0])

    for(i = 0; i < 10; i++){
        console.log('N[' + i + '] = ' + n)
        n = n + n
    }
    