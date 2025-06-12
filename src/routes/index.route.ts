import { Router } from "express";
import userRoute from './user.route'
import adminRoute from './admin.route'
import authRoute from './auth.route'

const router = Router()

router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use('/auth', authRoute)
export default router;