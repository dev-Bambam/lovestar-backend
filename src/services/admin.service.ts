import { Request, Response } from "express";

export const createUser = async (req:Request, res:Response) => {
   // Use your user service to create user with any role
};

export const adminLogin = async (req:Request, res:Response) => {
   // Use normal login, but check if user.role === 'admin'
};

export const fetchUsersByRole = async (req:Request, res:Response) => {
   // Query users by role from req.query.role
};

export const createProgram = async (req:Request, res:Response) => {
   // Use your program service to create a program
};

export const getProgramWithRegistrations = async (req:Request, res:Response) => {
   // Fetch program by id, count registrations where programId matches
};
