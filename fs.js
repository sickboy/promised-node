// --------------------
// fs-extra-promise
// --------------------
"use strict";
const util_1 = require('./util');
// modules
const fsExtra = require('fs-extra');
// exports
var makeFs = function (Promise) {
    // clone / proxy fsExtra
    var fs = util_1.Util.clone(fsExtra);
    // extend fs with isDirectory and isDirectorySync methods
    fs.isDirectory = function (path, callback) {
        fs.stat(path, function (err, stats) {
            if (err)
                return callback(err);
            callback(null, stats.isDirectory());
        });
    };
    fs.isDirectorySync = function (path) {
        return fs.statSync(path).isDirectory();
    };
    util_1.Util.promisifyModule(fs, ['exists', 'watch', 'watchFile', 'unwatchFile', 'createReadStream']);
    // create fs.existsAsync()
    // fs.exists() is asynchronous but does not call callback with usual node (err, result) signature - uses just (result)
    fs.existsAsync = function (path) {
        return new Promise(function (resolve) {
            fs.exists(path, function (exists) {
                resolve(exists);
            });
        });
    };
    // usePromise method to set Promise used internally (e.g. by using bluebird-extra module)
    fs.usePromise = makeFs;
    // return fs
    return fs;
};
// export fs promisified with bluebird
const fs = makeFs(util_1.Promise);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fs;
module.exports = fs;
