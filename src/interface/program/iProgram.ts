import { Document, Types } from "mongoose";

export interface IProgram extends Document {
   title: string;
   description: string;
   whatsAppLink: string;
   tutor: string; // Reference to User with role 'tutor'
}
