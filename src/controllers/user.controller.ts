import * as UserService from '../services/user.service'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const registerUser = async (req: Request, res: Response) => {
   const request = req.body;
   const user = await UserService.register(request);

   // Generate token (customize payload as needed)
   const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
   );
    
   res.status(200).json({
      status: "success",
       user,
      token
   });
}

export const getAllPrograms = async (req: Request, res: Response) => {
    const allPrograms = await UserService.getAllPrograms()

    res.status(200).json({
        status: 'success',
        allPrograms
    })
}

export const programRegistration = async (req: Request, res: Response) => {
    const { programId, userId } = req.body
    const program = await UserService.registerForAProgram(programId, userId)
    const programLink = program.whatsAppLink

    res.status(200).json({
        status: 'succes',
        programLink
    })
}