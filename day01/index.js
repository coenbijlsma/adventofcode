var fs = require('fs');

var stack = 0;
var basementAt = 0;
var read = 0;

var process = function(char) {
    if (char === '(') {
        stack++;
    } else if (char === ')') {
        stack--;
    }

    read++;
    if (stack == -1 && basementAt == 0) {
        basementAt = read;
    }
};

var rs = fs.createReadStream(__dirname + '/input');
rs.on('data', (chunk) => {
    if (chunk instanceof Buffer) {
        chunk = chunk.toString();
    }

    console.log('Got chunk of ' + chunk.length + ' bytes');
    for (i=0; i < chunk.length; i++) {
        process(chunk.charAt(i));
    }
});

rs.on('end', () => {
    console.log('Answer = ' + stack);
    console.log('Entered basement first at position ' + basementAt);
    console.log('Read ' + read + ' bytes');
});
