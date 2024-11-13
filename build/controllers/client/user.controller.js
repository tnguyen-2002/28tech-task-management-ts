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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = exports.register = void 0;
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_helper_1 = require("../../helpers/generate.helper");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const userExit = yield user_model_1.User.findOne({
        email: user.email,
        deleted: false
    });
    if (userExit) {
        res.json({
            code: "error",
            message: "Email already exists in the system!"
        });
        return;
    }
    const hashPassword = yield bcrypt_1.default.hash(user.password, 10);
    const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: hashPassword,
        token: (0, generate_helper_1.generateRandomString)(30)
    };
    const newUser = new user_model_1.User(dataUser);
    yield newUser.save();
    res.json({
        code: "success",
        message: "Registration successful!",
        token: newUser.token
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userExit = yield user_model_1.User.findOne({
        email: userEmail,
        deleted: false
    });
    if (!userExit) {
        res.json({
            code: "error",
            message: "Email doesn't exist in the database!"
        });
        return;
    }
    const isPasswordValid = yield bcrypt_1.default.compare(userPassword, userExit.password);
    if (!isPasswordValid) {
        res.json({
            code: "error",
            message: "Wrong password!"
        });
        return;
    }
    res.json({
        code: "success",
        message: "Login successfully!",
        token: userExit.token
    });
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    if (!token) {
        res.json({
            code: "error",
            message: "Token is empty!"
        });
        return;
    }
    const userData = yield user_model_1.User.findOne({
        token: token,
        deleted: false
    }).select("_id fullName email");
    if (!userData) {
        res.json({
            code: "error",
            message: "Invalid token!"
        });
        return;
    }
    res.json({
        code: "success",
        message: "Success!",
        data: userData
    });
});
exports.profile = profile;
