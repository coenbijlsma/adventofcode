var read = require(__dirname + '/read.js');

read.readByLine(__dirname + '/input', process);

var nice = 0;

function process(line) {
    if (line === null) {
        console.log('Have ' + nice + ' nice strings');
    } else {
        if (line.match(/^(([^aeiou]*[a|e|i|o|u]){3,}[^aeiou]*)/)
            && line.match(/([a-z])\1/)
            && !line.match(/(ab|cd|pq|xy)/)) {
            nice++;
        }
    }
};
