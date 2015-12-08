"use strict";

var readline = require('readline');
var fs = require('fs');

var total = 0;
var lines = 0;

var process = function(line) {
    lines++;

    if (line.trim() !== '') {
        let lwh = line.split('x');
        if (lwh.length != 3) {
            console.log('have strange line ' + line);
        }
        let l = lwh[0];
        let w = lwh[1];
        let h = lwh[2];

        let lw = l*w;
        let wh = w*h;
        let hl = h*l;

        let surfaceArea = 2*lw + 2*wh + 2*hl;
        let smallest = lw;
        if (wh < smallest) { smallest = wh; }
        if (hl < smallest) { smallest = hl; }
        
        total += (surfaceArea + smallest);
    }
};

var rl = readline.createInterface({
    input: fs.createReadStream(__dirname + '/input')
});

rl.on('line', (line) => {
    process(line);
});

rl.on('close', () => {
    console.log('Total sqf = ' + total);
    console.log('Processed ' + lines + ' lines');
});
