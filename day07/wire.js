"use strict";

var util = require('util');
var EventEmitter = require('events');

function Wire(name) {
    this.name = name;
    this.signal = undefined;
    EventEmitter.call(this);
    
    this.setMaxListeners(Infinity);
}
util.inherits(Wire, EventEmitter);

Wire.prototype.value = function() {
    return this.signal;
};

Wire.prototype.provide = function(source) {
    var self = this;

    if (typeof source === 'object') {
        source.on('data', (data) => {
            self.signal = data;
            self.emit('data', data);
        });
    } else {
        self.signal = source;
        self.emit('data', source);
    }
};

module.exports = Wire;
