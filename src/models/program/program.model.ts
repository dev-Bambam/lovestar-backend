import mongoose, { Schema, Model } from "mongoose";
import { IProgram } from "../../interface/program/iProgram";

const ProgramSchema: Schema = new Schema<IProgram>(
   {
      title: { type: String, required: true },
      description: { type: String, required: true },
      whatsAppLink: { type: String, required: true },
      tutor: { type: Schema.Types.ObjectId, ref: "User", required: true },
   },
   { timestamps: true }
);

const ProgramModel: Model<IProgram> = mongoose.model<IProgram>("Program", ProgramSchema);

export default ProgramModel;
