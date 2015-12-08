"use strict";

var readline = require('readline');
var fs = require('fs');

var total = 0;
var lines = 0;

var process = function(line) {
    lines++;

    if (line.trim() !== '') {
        let lwh = line.split('x').map((value, index, subject) => {
            return parseInt(value);
        });

        lwh.sort((l, r) => {
            return (l === r ? 0 : (l > r ? 1 : -1));
        });

        let presentWrap = 2*(lwh[0] + lwh[1]);
        let bowWrap = lwh[0] * lwh[1] * lwh[2];

        total += (presentWrap + bowWrap);
    }
};

var rl = readline.createInterface({
    input: fs.createReadStream(__dirname + '/input')
});

rl.on('line', (line) => {
    process(line);
});

rl.on('close', () => {
    console.log('Total feet = ' + total);
    console.log('Processed ' + lines + ' lines');
});
