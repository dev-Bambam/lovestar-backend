import { checkIfUserExist, fetchPrograms, registerUser } from "./helpers/user.helper";
import { IUser } from "./../interface/user/iUser";
import {
   BadRequestError,
   NotFoundError,
   ServerError,
   UserAlreadyExistsError,
} from "../utils/error/Custom.err";
import ProgramModel from "../models/program/program.model";
import RegistrationModel from "../models/program/registration.model";

export const register = async (data: IUser) => {
   const existingUser = await checkIfUserExist(data.email);
   if (existingUser) {
      throw new UserAlreadyExistsError(data.email);
   }
   const user = await registerUser(data);
   return user;
};

export const getAllPrograms = async () => {
   try {
      const allPrograms = await fetchPrograms();

      return allPrograms;
   } catch (error) {
      throw new ServerError();
   }
};

export const getSingleProgram = async (programId: string) => {
   const program = await ProgramModel.findById(programId);
   if (!program) throw new NotFoundError("Program not found");

   return program;
};

export const registerForAProgram = async (programId: string, userId: string) => {
   // Check if the program exist
   const program = await ProgramModel.findById(programId);
   if (!program) {
      throw new NotFoundError("Program not found");
   }

   //check if the user has registered for a program
   const alreadyRegistered = await RegistrationModel.findOne({ programId, userId });
   if (alreadyRegistered) {
      throw new BadRequestError("You can only registered for a single program");
   }

   // Create the registration
   await RegistrationModel.create({ programId, userId });

   //Return the WhatsApp link
   return { whatsAppLink: program.whatsAppLink };
};
