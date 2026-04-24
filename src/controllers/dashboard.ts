import { Request, Response, NextFunction } from "express";
import { DashboardRepository } from "../repositories/dashboard";

export const getDashboardRepository = async (req: Request, res: Response) => {
  try {
    const stats = await DashboardRepository.getStats();
    const recentStudents = await DashboardRepository.getRecentStudents();
    return res.json({
      success: true,
      data: {
        stats,
        recentStudents,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ error: "Failed to fetch dasboard data" });
  }
};
