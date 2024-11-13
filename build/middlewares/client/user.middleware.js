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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const user_model_1 = require("../../models/user.model");
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization ||
            !req.headers.authorization.startsWith("Bearer ")) {
            res.status(400).json({
                code: "error",
                message: "Please include a token!"
            });
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        const userData = yield user_model_1.User.findOne({
            token: token,
            deleted: false
        });
        if (!userData) {
            res.json({
                code: "error",
                message: "Invalid token"
            });
            return;
        }
        req["user"] = userData;
        next();
    }
    catch (error) {
        res.status(500).json({
            code: "error",
            message: "An error occur!"
        });
    }
});
exports.requireAuth = requireAuth;
