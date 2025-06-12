import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../../interface/user/iUser";

const UserSchema: Schema = new Schema<IUser>(
   {
      fullname: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      tel: { type: String, required: true },
      password: { type: String, required: true },
      role: { type: String, enum: ["student", "tutor", "admin"], default: "student" },
   },
   { timestamps: true }
);

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
