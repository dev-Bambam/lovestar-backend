import { Router } from "express";
import userRoute from "./route/user.route";
import adminRoute from "./route/admin.route";
import authRoute from "./route/auth.route";

const router = Router();

router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/auth", authRoute);
export default router;
