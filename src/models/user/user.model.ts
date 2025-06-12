import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../../interface/user/iUser";
import bcrypt, { hash, genSalt } from "bcryptjs"

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

// Pre-save hook to hash password
UserSchema.pre<IUser>('save', async function (next) {
   if (!this.isModified('password')) return next();
   try {
      const salt = await genSalt(10)
      this.password = await hash(this.password, salt)
      next()
   } catch (error) {
      next(error as Error)
   }
});
const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
