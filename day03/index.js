"use strict";

var read = require(__dirname + '/read.js');

var visited = [{x:0,y:0}];
var current = {x:0,y:0};

read.readByChar(__dirname + '/input', process);

function process(c) {
    move(c);

    if(c === null) {
        console.log('Visited ' + visited.length + ' houses');
    }
};

var move = function(direction) {
    switch(direction) {
        case '<':
            current.x -= 1; break;
        case '>':
            current.x += 1; break;
        case '^':
            current.y += 1; break;
        case 'v':
            current.y -= 1; break;
        default:
            return;
    }

    let loc = {x: current.x, y: current.y};
    let mapped = visited.filter((value, index, arr) => {
        return equals(value, loc);
    });

    if (mapped.length === 0) {
        visited.push(loc);
    }
};

var equals = function(l, r) {
    return (l.x === r.x) && (l.y === r.y);
};
