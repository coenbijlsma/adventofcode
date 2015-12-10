"use strict";

var read = require(__dirname + '/read.js');

var visited = [{x:0,y:0}];
var current = {santa: {x:0,y:0}, robo: {x:0, y:0}};
var who = null;

read.readByChar(__dirname + '/input', process);

function process(c) {
    deliver(nextDeliverer(), c);

    if(c === null) {
        console.log('Visited ' + visited.length + ' houses');
    }
};

var nextDeliverer = function() {
    switch(who) {
        case 'santa':
            who = 'robo'; break;
        case 'robo':
        default:
            who = 'santa'; break;
    }

    return who;
};

var deliver = function(who, direction) {
    switch(direction) {
        case '<':
            current[who].x -= 1; break;
        case '>':
            current[who].x += 1; break;
        case '^':
            current[who].y += 1; break;
        case 'v':
            current[who].y -= 1; break;
        default:
            return;
    }

    let loc = {x: current[who].x, y: current[who].y};
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
