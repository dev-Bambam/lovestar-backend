import UserModel from "../../models/user/user.model";
import { IUser } from './../../interface/user/iUser'
import ProgramModel from "../../models/program/program.model";
import { DatabaseError } from "../../utils/error/Custom.err";

export const checkIfUserExist = async (email:string)=>{
    try {
        return await UserModel.findOne({ email });
    } catch (error) {
       throw new DatabaseError("Error fetching from Database");
    }
}

export const registerUser = async (data:IUser) => {
    try {
        return (await UserModel.create(data)).toJSON();
    } catch (error) {
        throw new DatabaseError('Unable to save user')
    }
}

export const fetchPrograms = async () => {
    try {
        return await ProgramModel.find()
    } catch (error) {
        throw new DatabaseError('Unable to fetch all programs')
    }
}