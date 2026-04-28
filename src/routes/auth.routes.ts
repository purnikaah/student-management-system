import { Router } from "express";
import { login } from "../controllers/login";
export const authRoutes = Router();

authRoutes.post("/login", login);
export default Router;