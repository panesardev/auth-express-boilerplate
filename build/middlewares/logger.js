"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(request, response, next) {
    console.log(request.method + " " + request.path + " " + new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
    next();
}
exports.logger = logger;
