import { Router } from 'express'
import * as Controller from '../controllers/auth.controller'

const router = Router()

router.post('/login', Controller.login)

console.log('req got here')

export default router;