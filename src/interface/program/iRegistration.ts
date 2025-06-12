import { Document, Types } from "mongoose";

export interface IRegistration extends Document {
   programId: Types.ObjectId; // Reference to Program
   userId: Types.ObjectId; // Reference to User
}
