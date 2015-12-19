"use strict";

var readline = require('readline');
var fs = require('fs');

exports.readByLine = function(name, cb) {
    var rl = readline.createInterface({
        input: fs.createReadStream(name)
    });

    rl.on('line', (line) => { cb(line) });
    rl.on('close', () => { cb(null) });
};

exports.readByChar = function(name, cb) {
    var rs = fs.createReadStream(name);
    rs.on('data', (chunk) => {
        if (chunk instanceof Buffer) {
            chunk = chunk.toString();
        }
        
        for (let i=0; i < chunk.length; i++) {
            cb(chunk.charAt(i));
        }
    });
    
    rs.on('end', () => {
        cb(null);
    });
};

