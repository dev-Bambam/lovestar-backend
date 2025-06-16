import { Router } from "express";
import userRoute from "./route/user.route";
import authRoute from "./route/auth.route";
import protectRoute from "./protected";

const router = Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use('/', protectRoute);
export default router;
