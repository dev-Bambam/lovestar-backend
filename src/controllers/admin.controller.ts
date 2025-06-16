import * as AdminService from "./../services/admin.service";
import { Request, Response } from "express";

export const adminLogin = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   const user = await AdminService.adminLogin(email, password);

   res.status(200).json({
      status: "success",
      user,
   });
};

export const createProgram = async (req: Request, res: Response) => {
   const programData = req.body;
   const program = await AdminService.createProgram(programData);

   res.status(201).json({
      status: "success",
      program,
   });
};

export const getProgramWithRegistrations = async (req: Request, res: Response) => {
   const programId  = req.params.id;
   const programDetails = await AdminService.getProgramWithRegistrations(programId);

   res.status(200).json({
      status: "success",
      programDetails,
   });
};

export const fetchUsersByRole = async (req: Request, res: Response) => {
    const { role } = req.query;
    const users = await AdminService.fetchUsersByRole(role as string | undefined)

    res.status(200).json({
        status: 'success',
        users
    })
};

export const createUser = async (req: Request, res: Response) => {
    const userDetail = req.body
    const user = await AdminService.createUser(userDetail)

    res.status(201).json({
        status: 'success',
        user
    })
}