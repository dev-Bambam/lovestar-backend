import { Router } from 'express'
import * as Controller from '../controllers/auth.controller'
import { validateBody } from '../middleware/validator'
import { LoginSchema } from '../models/user/user.schema'

const router = Router()

router.post('/login',validateBody(LoginSchema), Controller.login)

export default router;