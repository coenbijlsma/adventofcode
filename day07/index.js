"use strict";

var read = require(__dirname + '/read.js');
var Gate = require(__dirname + '/gate.js');
var Wire = require(__dirname + '/wire.js');

var wires = {};

read.readByLine(__dirname + '/input', process);

function process(line) {
    if (line !== null) {
        let splitted = line.split(' -> ');
        
        let wire = acquireWire(splitted[1]);
        splitted = splitted[0].split(' ');
        if (splitted.length === 3) {
            let gate = new Gate(splitted[1]);
            let left = splitted[0];
            let right = splitted[2];

            if (isNaN(parseInt(left))) {
                left = acquireWire(left);
            } else {
                left = parseInt(left);
            }
            if (isNaN(parseInt(right))) {
                right = acquireWire(right);
            } else {
                right = parseInt(right);
            }
            gate.provide(left, right);
            wire.provide(gate);
        } else if (splitted.length === 2) {
            let gate = new Gate(splitted[0]);
            let right = acquireWire(splitted[1]);
            gate.provide(undefined, right);
            wire.provide(gate);
        } else {
            if (isNaN(parseInt(splitted[0]))) {
                wire.provide(parseInt(splitted[0]));
            } else {
                wire.provide(acquireWire(splitted[0]));
            }
        }
    } else {
        console.log(wires);
    }
}

function acquireWire(name) {
    if (wires[name] === undefined) {
        wires[name] = new Wire(name);
    }
    return wires[name];
}
