"use strict";
const Promise = require('bluebird');
exports.Promise = Promise;
class Util {
    static clone(o) {
        var fs = {};
        for (var methodName in o) {
            let method = o[methodName];
            fs[methodName] = (typeof method != 'function') ? method : () => method.bind(fs, arguments);
        }
        return o;
    }
    static promisifyModule(o, excludes = []) {
        // promisify all methods
        // (except those ending with 'Sync', classes and various methods which do not use a callback)
        var method;
        for (var methodName in o) {
            method = o[methodName];
            if (typeof method != 'function')
                continue;
            if (methodName.slice(-4) == 'Sync')
                continue;
            if (methodName.match(/^[A-Z]/))
                continue;
            if (excludes.indexOf(methodName) != -1)
                continue;
            o[methodName + 'Async'] = this.promisify(method);
        }
    }
    static promisify(method, receiver) { return Promise.promisify(method, receiver); }
}
exports.Util = Util;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Util;
