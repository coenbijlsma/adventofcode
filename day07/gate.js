"use strict";

var util = require('util');
var EventEmitter = require('events');

function Gate(type) {
    this.type = type;
    this.left = undefined;
    this.right = undefined;
    EventEmitter.call(this);

    var self = this;
    this.on('evaluate', () => {
        if ( (self.left !== undefined) && (self.right !== undefined) ) {
            self.emit('data', self.value());
        } else if ( (self.type === 'NOT') && (self.right !== undefined) ) {
            self.emit('data', self.value());
        }
    });
    this.setMaxListeners(Infinity);
}
util.inherits(Gate, EventEmitter);

Gate.prototype.value = function() {
    let v = undefined;
    if ( (this.left !== undefined) & (this.right !== undefined)) {
        switch(this.type) {
           case 'AND':
               v = (this.left & this.right); break;
           case 'OR':
               v = (this.left | this.right); break;
           case 'LSHIFT':
               v = (this.left << this.right); break;
           case 'RSHIFT':
               v = (this.left >> this.right); break;
        }
    } else if (this.type === 'NOT') {
        v = ~this.right;
    }

    return v;
};

Gate.prototype.provide = function(left, right) {
    var self = this;
    if (typeof left === 'object') {
        left.on('data', (data) => {
            self.left = data;
            self.emit('evaluate');
        });
    } else {
        self.left = left;
        self.emit('evaluate');
    }

    if (typeof right === 'object') {
        right.on('data', (data) => {
            self.right = data;
            self.emit('evaluate');
        });
    } else {
        self.right = right;
        self.emit('evaluate');
    }
};

module.exports = Gate;
