"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
function initMongoDB() {
    try {
        mongoose_1.default.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        mongoose_1.default.connection
            .once('open', function () { return console.log('MongoDB: Connected'); });
    }
    catch (_a) {
        var message = _a.message;
        console.log('MongoDB: ', message);
    }
}
exports.initMongoDB = initMongoDB;
