"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
function notFound(request, response, next) {
    response.status(404).json({ message: 'NOT FOUND' });
}
exports.notFound = notFound;
