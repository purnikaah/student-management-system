import { Request, Response } from "express";
import * as AttendanceRepo from "../repositories/attendance";
import { AttendanceStatus } from "@generated/prisma/enums";

export const markStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId, status, date } = req.body;

    if (!studentId || !status) {
      return res
        .status(400)
        .json({ message: "Student ID and Status are required" });
    }

    const record = await AttendanceRepo.markAttendance({
      studentId,
      status: status as AttendanceStatus,
      date: date ? new Date(date) : new Date(),
    });

    res.status(200).json({ message: "Attendance marked successfully", record });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const history = await AttendanceRepo.getStudentAttendance(
      String(studentId),
    );

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
};
