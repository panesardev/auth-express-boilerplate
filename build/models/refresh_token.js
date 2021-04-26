"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
var mongoose_1 = require("mongoose");
var RefreshTokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
});
exports.RefreshTokenModel = mongoose_1.model('RefreshToken', RefreshTokenSchema);
