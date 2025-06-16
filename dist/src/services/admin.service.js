"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgramWithRegistrations = exports.createProgram = exports.fetchUsersByRole = exports.adminLogin = exports.createUser = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = __importDefault(require("../models/user/user.model"));
const Custom_err_1 = require("../utils/error/Custom.err");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const program_model_1 = __importDefault(require("../models/program/program.model"));
const registration_model_1 = __importDefault(require("../models/program/registration.model"));
const createUser = async (data) => {
    const user = await (0, user_service_1.register)(data);
    return user;
};
exports.createUser = createUser;
const adminLogin = async (email, password) => {
    // Use normal login, but check if user.role === 'admin'
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user || user.role !== 'admin')
        throw new Custom_err_1.ForbiddenError();
    console.log(`password:${password}, user.password${user.password}`);
    const validPassword = await (0, bcryptjs_1.compare)(password, user.password);
    if (!validPassword)
        throw new Custom_err_1.BadRequestError("Incorrect Password");
    // Generate Token 
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
    user.password = " ";
    return { token };
};
exports.adminLogin = adminLogin;
const fetchUsersByRole = async (role) => {
    // Query users by role 
    if (!role)
        throw new Custom_err_1.BadRequestError('Role query parameter is required');
    const allowedRoles = ['student', 'tutor', 'admin'];
    if (!allowedRoles.includes(role))
        throw new Custom_err_1.BadRequestError('Invalid role specified');
    const users = await user_model_1.default.find({ role }).select("-password");
    return users;
};
exports.fetchUsersByRole = fetchUsersByRole;
const createProgram = async (programData) => {
    const title = programData.title;
    const existingProgram = await program_model_1.default.findOne({ title });
    if (existingProgram)
        throw new Custom_err_1.BadRequestError('Program already exist');
    const newProgram = await program_model_1.default.create(programData);
    return newProgram;
};
exports.createProgram = createProgram;
const getProgramWithRegistrations = async (programId) => {
    // Fetch program by id, count registrations where programId matches
    const id = programId;
    const studentCount = await registration_model_1.default.countDocuments({ programId: id });
    const program = await program_model_1.default.findById(id).lean();
    return {
        ...program,
        studentCount
    };
};
exports.getProgramWithRegistrations = getProgramWithRegistrations;
