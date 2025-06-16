"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = __importDefault(require("../models/user/user.model"));
const Custom_err_1 = require("../utils/error/Custom.err");
const login = async (email, password) => {
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user)
        throw new Custom_err_1.NotFoundError("Not found or incorrect email");
    const validPassword = await (0, bcryptjs_1.compare)(password, user.password);
    if (!validPassword)
        throw new Custom_err_1.BadRequestError("Incorrect Password");
    user.password = '';
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5h" });
    return { accessToken, user };
};
exports.login = login;
