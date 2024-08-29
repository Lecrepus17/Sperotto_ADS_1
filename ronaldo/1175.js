var input = require('fs').readFileSync('dev/stdin', 'utf8');
var lines = input.split('\n');
n = 0
for(i = 19; i >= 0; i--){
        console.log('N[' + n + '] = ' + lines[i])
        n++
}