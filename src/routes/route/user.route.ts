import { Router } from "express";
import * as Controller from "../../controllers/user.controller";
import { authenticate } from "../../middleware/auth";
import { validateBody } from "../../middleware/validator";
import { UserSchema } from "../../models/user/user.schema";
const router = Router();

router.post("/register", validateBody(UserSchema), Controller.registerUser);
router.get("/fetch-all-programs", authenticate, Controller.getAllPrograms);
router.get('/fetch-a-program/:_id', authenticate, Controller.getSingleProgram)
router.post("/register-a-program", authenticate, Controller.programRegistration);

export default router;
