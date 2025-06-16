"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPrograms = exports.registerUser = exports.checkIfUserExist = void 0;
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const program_model_1 = __importDefault(require("../../models/program/program.model"));
const Custom_err_1 = require("../../utils/error/Custom.err");
const checkIfUserExist = async (email) => {
    try {
        return await user_model_1.default.findOne({ email });
    }
    catch (error) {
        throw new Custom_err_1.DatabaseError("Error fetching from Database");
    }
};
exports.checkIfUserExist = checkIfUserExist;
const registerUser = async (data) => {
    try {
        return (await user_model_1.default.create(data)).toJSON();
    }
    catch (error) {
        throw new Custom_err_1.DatabaseError('Unable to save user');
    }
};
exports.registerUser = registerUser;
const fetchPrograms = async () => {
    try {
        return await program_model_1.default.find();
    }
    catch (error) {
        throw new Custom_err_1.DatabaseError('Unable to fetch all programs');
    }
};
exports.fetchPrograms = fetchPrograms;
