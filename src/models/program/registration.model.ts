import mongoose, { Schema, Model } from "mongoose";
import { IRegistration } from "../../interface/program/iRegistration";

const RegistrationSchema: Schema = new Schema<IRegistration>(
   {
      programId: { type: Schema.Types.ObjectId, ref: "Program", required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   },
   { timestamps: true }
);

const RegistrationModel: Model<IRegistration> = mongoose.model<IRegistration>(
   "Registration",
   RegistrationSchema
);

export default RegistrationModel;
