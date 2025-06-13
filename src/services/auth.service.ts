import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import UserModel from "../models/user/user.model";
import { BadRequestError, NotFoundError } from "../utils/error/Custom.err";

export const login = async (email: string, password: string) => {
   const user = await UserModel.findOne({ email }).select("+password");
   if (!user) throw new NotFoundError("Not found or incorrect email");

   const validPassword = await compare(password, user.password);
    if (!validPassword) throw new BadRequestError("Incorrect Password");
    user.password = '';

   const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "5h" }
   );
   return { accessToken, user };
};
