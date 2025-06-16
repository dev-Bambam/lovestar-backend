"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.programRegistration = exports.getSingleProgram = exports.getAllPrograms = exports.registerUser = void 0;
const UserService = __importStar(require("../services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    const request = req.body;
    const user = await UserService.register(request);
    // Generate token (customize payload as needed)
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({
        status: "success",
        user,
        token,
    });
};
exports.registerUser = registerUser;
const getAllPrograms = async (req, res) => {
    const allPrograms = await UserService.getAllPrograms();
    res.status(200).json({
        status: "success",
        allPrograms,
    });
};
exports.getAllPrograms = getAllPrograms;
const getSingleProgram = async (req, res) => {
    const programId = req.params.id;
    const program = await UserService.getSingleProgram(programId);
    res.status(200).json({
        status: "success",
        program,
    });
};
exports.getSingleProgram = getSingleProgram;
const programRegistration = async (req, res) => {
    const { programId } = req.body;
    const userId = req.user.id;
    const program = await UserService.registerForAProgram(programId, userId);
    const programLink = program.whatsAppLink;
    res.status(200).json({
        status: "succes",
        programLink,
    });
};
exports.programRegistration = programRegistration;
