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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProgram = exports.createUser = exports.fetchUsersByRole = exports.getProgramWithRegistrations = exports.createProgram = exports.adminLogin = void 0;
const AdminService = __importStar(require("./../services/admin.service"));
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminService.adminLogin(email, password);
    res.status(200).json({
        status: "success",
        user,
    });
};
exports.adminLogin = adminLogin;
const createProgram = async (req, res) => {
    const programData = req.body;
    const program = await AdminService.createProgram(programData);
    res.status(201).json({
        status: "success",
        program,
    });
};
exports.createProgram = createProgram;
const getProgramWithRegistrations = async (req, res) => {
    const programId = req.params.id;
    const programDetails = await AdminService.getProgramWithRegistrations(programId);
    res.status(200).json({
        status: "success",
        programDetails,
    });
};
exports.getProgramWithRegistrations = getProgramWithRegistrations;
const fetchUsersByRole = async (req, res) => {
    const { role } = req.query;
    const users = await AdminService.fetchUsersByRole(role);
    res.status(200).json({
        status: 'success',
        users
    });
};
exports.fetchUsersByRole = fetchUsersByRole;
const createUser = async (req, res) => {
    const userDetail = req.body;
    const user = await AdminService.createUser(userDetail);
    res.status(201).json({
        status: 'success',
        user
    });
};
exports.createUser = createUser;
const deleteProgram = async (req, res) => {
    const id = req.params.id;
    const result = await AdminService.deleteProgram(id);
    res.status(200).json({
        status: 'success',
        result
    });
};
exports.deleteProgram = deleteProgram;
