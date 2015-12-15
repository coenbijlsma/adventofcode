"use strict";

var read = require(__dirname + '/read.js');

var matrix = {
    width: 1000,
    height: 1000,
    data: []
};

for (let x=0; x < matrix.width; x++) {
    matrix.data[x] = [];
    for (let y=0; y < matrix.height; y++) {
        matrix.data[x][y] = false;
    }
}

read.readByLine(__dirname + '/input', process);

function process(line) {
    if (line !== null) {
        updateMatrix(tokenize(line));
    } else {
        let count = 0;
        for (let x=0; x < matrix.width; x++) {
            for (let y=0; y < matrix.height; y++) {
                if (matrix.data[x][y] === true) {
                    count++;
                }
            }
        }
        console.log('Amount of lights on: ' + count);
    }
}

function updateMatrix(obj) {
    //console.log('Updating matrix with');
    //console.log(obj);
    for (let x=0; x < matrix.width; x++) {
        for (let y=0; y < matrix.height; y++) {
            let c = {x: x, y: y};
            if (isInRange(obj, c)) {
                switch(obj.type) {
                    case 'ON':
                        matrix.data[x][y] = true; break;
                    case 'OFF':
                        matrix.data[x][y] = false; break;
                    case 'TOGGLE':
                        matrix.data[x][y] = !matrix.data[x][y]; break;
                }
            }
        }
    }
}

function isInRange(range, coordinate) {
    return (coordinate.x >= range.from.x && coordinate.x <= range.to.x)
        && (coordinate.y >= range.from.y && coordinate.y <= range.to.y);
}

function tokenize(line) {
    let obj = {};
    let from = {};
    let to = {};
    let fcoords = null;
    let tcoords = null;

    if (line.substr(0, 7) === 'turn on') {
        obj.type = 'ON';
    } else if (line.substr(0, 8) === 'turn off') {
        obj.type = 'OFF';
    } else if (line.substr(0, 6) === 'toggle') {
        obj.type = 'TOGGLE';
    } else {
        obj.type = 'UNKNOWN';
    }

    let splitted = line.split(' through ');
    switch (obj.type) {
        case 'ON':
            fcoords = splitted[0].substring(8).split(',');
            tcoords = splitted[1].split(',');
            break;
        case 'OFF':
            fcoords = splitted[0].substring(9).split(',');
            tcoords = splitted[1].split(',');
            break;
        case 'TOGGLE':
            fcoords = splitted[0].substring(7).split(',');
            tcoords = splitted[1].split(',');
            break;
        default:
            fcoords = [-1,-1];
            tcoords = [-1,-1];
            break;
    }

    from.x = fcoords[0]; from.y = fcoords[1];
    to.x = tcoords[0]; to.y = tcoords[1];
    obj.from = from; obj.to = to;
    return obj;
}

