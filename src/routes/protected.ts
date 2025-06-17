import { Router } from "express";
import { adminOnly } from "../middleware/onlyAdmin";
import { authenticate } from "../middleware/auth";
import adminRoute from "./route/admin.route";


const protectRoute = Router()

protectRoute.use('/', authenticate, adminOnly, adminRoute)

export default protectRoute;