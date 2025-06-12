import { Router } from "express";
import * as Controller from '../controllers/user.controller'
import { authenticate } from "../middleware/auth";
const router = Router()

router.post('/register', Controller.registerUser)
router.post("/fetch-all-programs",authenticate, Controller.getAllPrograms);
router.post("/register-a-program", authenticate, Controller.programRegistration);

export default router;