import { Request } from "express";
import { register } from "./user.service";
import { IUser } from "../interface/user/iUser";
import UserModel from "../models/user/user.model";
import { BadRequestError, ForbiddenError } from "../utils/error/Custom.err";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { IProgram } from "../interface/program/iProgram";
import ProgramModel from "../models/program/program.model";
import RegistrationModel from "../models/program/registration.model";

export const createUser = async (data:IUser) => {
    const user = await register(data)
    return user
};

export const adminLogin = async (email:string, password:string) => {
    // Use normal login, but check if user.role === 'admin'
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || user.role !== 'admin') throw new ForbiddenError()
    
    console.log(`password:${password}, user.password${user.password}`)
    
    const validPassword = await compare(password, user.password)
    if(!validPassword) throw new BadRequestError("Incorrect Password")
    
    // Generate Token 
    const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "24h" }
    );
    user.password = " ";
    return { token };
};

export const fetchUsersByRole = async (role:string | undefined) => {
    // Query users by role 
    if (!role) throw new BadRequestError('Role query parameter is required');

    const allowedRoles = ['student', 'tutor', 'admin']
    if (!allowedRoles.includes(role)) throw new BadRequestError('Invalid role specified');

    const users = await UserModel.find({ role }).select("-password");
    
    return users
};

export const createProgram = async (programData: IProgram) => {
    const title = programData.title
    const existingProgram = await ProgramModel.findOne({ title })
    if (existingProgram) throw new BadRequestError('Program already exist')
    
    const newProgram = await ProgramModel.create(programData)

    return newProgram
};

export const getProgramWithRegistrations = async (programId:string) => {
    // Fetch program by id, count registrations where programId matches
    const id = programId
    const studentCount = await RegistrationModel.countDocuments({ programId: id });
    const program = await ProgramModel.findById(id).lean();

    return {
        ...program,
        studentCount
    }
};
