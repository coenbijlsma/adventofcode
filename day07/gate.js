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
    if ( (this.left !== undefined) && (this.right !== undefined)) {
        switch(this.type) {
           case 'AND':
               v = (this.left & this.right); break;
           case 'OR':
               v = (this.left | this.right); break;
           case 'LSHIFT':
               v = (this.left << this.right); break;
           case 'RSHIFT':
               v = (this.left >>> this.right); break;
        }
    } else if (this.type === 'NOT') {
        v = this.int16Not(this.right);
    }

    return v;
};

Gate.prototype.provide = function(left, right) {
    var self = this;
    if (typeof left === 'object') {
        if (left.value() !== undefined) {
            self.left = left.value();
            self.emit('evaluate');
        } else {
            left.on('data', (data) => {
                self.left = data;
                self.emit('evaluate');
            });
        }
    } else {
        self.left = left;
        self.emit('evaluate');
    }

    if (typeof right === 'object') {
        if (right.value() !== undefined) {
            self.right = right.value();
            self.emit('evaluate');
        } else {
            right.on('data', (data) => {
                self.right = data;
                self.emit('evaluate');
            });
        }
    } else {
        self.right = right;
        self.emit('evaluate');
    }
};

Gate.prototype.int16Not = function(value) {
    let pad = '0000000000000000';
    let binary = (value >>> 0).toString(2);
    let converted = '';
    binary = pad.substring(0, pad.length - binary.length) + binary;

    for(let i=0; i < binary.length; i++) {
        let c = binary.charAt(i);
        if (c === '1') { c = '0'; } else { c = '1'; }
        converted = converted + c;
    }
    
    return parseInt(converted, 2);
};

module.exports = Gate;
