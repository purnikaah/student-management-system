import { Router } from "express";
import { AuthController } from "../controllers/login";
import { login } from "../controllers/login";
import { authMiddleware } from "../middleware/middleware";
import { getDashboardRepository } from "../controllers/dashboard";
const router = Router();

router.post("/login", AuthController.login);
router.get("/summary", authMiddleware, getDashboardRepository);
export default router;
