import { Router } from "express";
import { getDashboardRepository } from "../controllers/dashboard";

const router = Router();

router.get("/", getDashboardRepository);

export default router;
