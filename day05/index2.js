var read = require(__dirname + '/read.js');

read.readByLine(__dirname + '/input', process);

var nice = 0;

function process(line) {
    if (line === null) {
        console.log('Have ' + nice + ' nice strings');
    } else {
        if (line.match(/([a-z][a-z])(?:.*)\1/)
            && line.match(/([a-z])([a-z]){1}\1/)) {
            nice++;
        }
    }
};
