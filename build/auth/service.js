"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRefreshToken = exports.checkAuthToken = exports.logout = exports.refreshToken = exports.login = exports.register = void 0;
var bcrypt_1 = require("bcrypt");
var service_1 = require("../user/service");
var jsonwebtoken_1 = require("jsonwebtoken");
var refresh_token_1 = require("../models/refresh_token");
function register(user) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Encrypt password using salt value 10
                    _a = user;
                    return [4 /*yield*/, bcrypt_1.hash(user.password, 10)];
                case 1:
                    // Encrypt password using salt value 10
                    _a.password = _b.sent();
                    return [4 /*yield*/, service_1.create(user)];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.register = register;
function login(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, service_1.findByEmail(credentials.email)];
                case 1:
                    userFound = _c.sent();
                    _a = userFound;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt_1.compare(credentials.password, userFound.password)];
                case 2:
                    _a = (_c.sent());
                    _c.label = 3;
                case 3:
                    if (!_a) return [3 /*break*/, 5];
                    _b = {
                        authToken: generateAuthToken(userFound.id)
                    };
                    return [4 /*yield*/, generateRefreshToken(userFound.id)];
                case 4: return [2 /*return*/, (_b.refreshToken = _c.sent(),
                        _b.timeStamp = new Date().toString(),
                        _b)];
                case 5: throw Error('Invalid credentials');
            }
        });
    });
}
exports.login = login;
function refreshToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, refreshTokenInDB;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!token)
                        throw Error('Token not provided');
                    userId = checkRefreshToken(token);
                    if (!userId)
                        throw Error('Invalid token');
                    return [4 /*yield*/, refresh_token_1.RefreshTokenModel.findOne({ token: token })];
                case 1:
                    refreshTokenInDB = _b.sent();
                    if (!!refreshTokenInDB) return [3 /*break*/, 2];
                    throw Error('Invalid token');
                case 2: return [4 /*yield*/, refresh_token_1.RefreshTokenModel.deleteOne({ token: token })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _a = {
                        authToken: generateAuthToken(userId)
                    };
                    return [4 /*yield*/, generateRefreshToken(userId)];
                case 5: return [2 /*return*/, (_a.refreshToken = _b.sent(),
                        _a.timeStamp = new Date().toString(),
                        _a)];
            }
        });
    });
}
exports.refreshToken = refreshToken;
function logout(token) {
    return __awaiter(this, void 0, void 0, function () {
        var refreshTokenInDB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, refresh_token_1.RefreshTokenModel.findOne({ token: token })];
                case 1:
                    refreshTokenInDB = _a.sent();
                    if (!!refreshTokenInDB) return [3 /*break*/, 2];
                    throw Error('Invalid token');
                case 2: return [4 /*yield*/, refresh_token_1.RefreshTokenModel.deleteOne({ token: token })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, 'Logged out'];
            }
        });
    });
}
exports.logout = logout;
function generateAuthToken(userId) {
    return jsonwebtoken_1.sign({ id: userId }, process.env.JWT_AUTH_SECRET, { expiresIn: process.env.JWT_AUTH_EXPIRE });
}
function checkAuthToken(token) {
    return jsonwebtoken_1.verify(token, process.env.JWT_AUTH_SECRET);
}
exports.checkAuthToken = checkAuthToken;
function generateRefreshToken(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = jsonwebtoken_1.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });
                    return [4 /*yield*/, refresh_token_1.RefreshTokenModel.create({ token: token })];
                case 1: return [2 /*return*/, (_a.sent()).token];
            }
        });
    });
}
function checkRefreshToken(token) {
    return jsonwebtoken_1.verify(token, process.env.JWT_REFRESH_SECRET);
}
exports.checkRefreshToken = checkRefreshToken;
