"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(crypto_1.default.randomInt(0, characters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomNumber = (length) => {
    const characters = "0123436789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(crypto_1.default.randomInt(0, characters.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
