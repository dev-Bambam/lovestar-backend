
import { Document } from "mongoose";
 
export interface IUser extends Document{
    fullname: string
    email: string
    tel: string
    password: string
    role: 'student' | 'tutor' | 'admin'
}