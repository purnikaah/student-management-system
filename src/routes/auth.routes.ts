import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/middleware";

const router = Router();

router.post("/login", login);
export default router;
