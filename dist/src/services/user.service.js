"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForAProgram = exports.getSingleProgram = exports.getAllPrograms = exports.register = void 0;
const user_helper_1 = require("./helpers/user.helper");
const Custom_err_1 = require("../utils/error/Custom.err");
const program_model_1 = __importDefault(require("../models/program/program.model"));
const registration_model_1 = __importDefault(require("../models/program/registration.model"));
const register = async (data) => {
    const existingUser = await (0, user_helper_1.checkIfUserExist)(data.email);
    if (existingUser) {
        throw new Custom_err_1.UserAlreadyExistsError(data.email);
    }
    const user = await (0, user_helper_1.registerUser)(data);
    return user;
};
exports.register = register;
const getAllPrograms = async () => {
    try {
        const allPrograms = await (0, user_helper_1.fetchPrograms)();
        return allPrograms;
    }
    catch (error) {
        throw new Custom_err_1.ServerError();
    }
};
exports.getAllPrograms = getAllPrograms;
const getSingleProgram = async (programId) => {
    const program = await program_model_1.default.findById(programId);
    if (!program)
        throw new Custom_err_1.NotFoundError("Program not found");
    return program;
};
exports.getSingleProgram = getSingleProgram;
const registerForAProgram = async (programId, userId) => {
    // Check if the program exist
    const program = await program_model_1.default.findById(programId);
    if (!program) {
        throw new Custom_err_1.NotFoundError("Program not found");
    }
    //check if the user has registered for a program
    const alreadyRegistered = await registration_model_1.default.findOne({ programId, userId });
    if (alreadyRegistered) {
        throw new Custom_err_1.BadRequestError("You can only registered for a single program");
    }
    // Create the registration
    await registration_model_1.default.create({ programId, userId });
    //Return the WhatsApp link
    return { whatsAppLink: program.whatsAppLink };
};
exports.registerForAProgram = registerForAProgram;
