import { prisma } from "../../lib/prisma";
import { Prisma } from "@generated/prisma/client";
import { AttendanceStatus } from "@generated/prisma/client";

export const markAttendance = async (data: {
  studentId: string;
  status: AttendanceStatus;
  date?: Date;
}) => {
  return await prisma.attendance.upsert({
    where: {
      studentId_date: {
        studentId: data.studentId,
        date: data.date || new Date(),
      },
    },
    update: { status: data.status },
    create: {
      studentId: data.studentId,
      status: data.status,
      date: data.date || new Date(),
    },
  });
};

export const getStudentAttendance = async (studentId: string) => {
  return await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { date: "desc" },
  });
};
