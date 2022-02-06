"use strict";
exports.__esModule = true;
exports.logger = void 0;
var foo_1 = require("./foo");
function logger(param) {
    console.log(foo_1.foo);
    console.log(param);
}
exports.logger = logger;
