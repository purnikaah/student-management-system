import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/middleware";
import { getDashboardRepository } from "../controllers/dashboard";
const router = Router();

router.post("/login", login);
router.get("/summary", authMiddleware, getDashboardRepository);
export default router;
