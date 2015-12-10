"use strict";

var crypto = require('crypto');
var input = 'yzbqklnj';

for (let i = 0; true; i++) {
    let hash = crypto.createHash('md5');
    hash.update(input + i, 'ascii');

    let output = hash.digest('hex');
    if (output.substr(0, 6) === '000000') {
        console.log('Answer = ' + i + ' (' + output + ')');
        break;
    }
}
