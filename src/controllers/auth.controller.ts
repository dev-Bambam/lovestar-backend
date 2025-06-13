import * as AuthenticationService from './../services/auth.service'
import { Request, Response } from 'express'

export const login = async (req: Request, res: Response) => {
    console.log(`Request:${req.body.email}, ${req.body.password}`)
    const { email, password } = req.body;
    const data = await AuthenticationService.login(email, password)

    res.status(200).json({
        status: 'success',
        data
    })
}