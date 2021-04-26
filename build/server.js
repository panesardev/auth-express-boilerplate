"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var logger_1 = require("./middlewares/logger");
var mongodb_1 = require("./config/mongodb");
var auth_router_1 = __importDefault(require("./auth/auth_router"));
var user_router_1 = __importDefault(require("./user/user_router"));
var _404_1 = require("./middlewares/404");
// Init
require('dotenv').config();
var server = express_1.default();
var port = process.env.PORT || 3000;
mongodb_1.initMongoDB();
// Middlewares
server.use(express_1.default.json());
server.use(cors_1.default());
server.use(logger_1.logger);
// Routes
server.use('/auth', auth_router_1.default);
server.use('/users', user_router_1.default);
// 404 Error
server.use(_404_1.notFound);
server.listen(port, function () {
    console.log("Server running on PORT: " + port);
});
