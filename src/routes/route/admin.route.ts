import { Router } from "express";
import * as Controller from './../../controllers/admin.controller'
const router = Router()

router.post('/create-user', Controller.createUser)
router.post('/create-program', Controller.createProgram)
router.get('/fetch-user', Controller.fetchUsersByRole)
router.get('/get-program-details/:id', Controller.getProgramWithRegistrations)

export default router