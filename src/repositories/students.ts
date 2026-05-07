import { prisma } from "../../lib/prisma";
import { Prisma } from "@generated/prisma/client";
export class StudentRepository {
  private async generateNextStudentId(): Promise<string> {
    const lastStudent = await prisma.student.findFirst({
      orderBy: { studentId: "desc" },
      select: { studentId: true },
    });

    if (!lastStudent) return "S001";

    const lastIdNumber = parseInt(lastStudent.studentId.substring(1));
    const nextIdNumber = lastIdNumber + 1;
    return `S${nextIdNumber.toString().padStart(3, "0")}`;
  }

  async create(data: Omit<Prisma.StudentCreateInput, "studentId">) {
    const nextId = await this.generateNextStudentId();
    return await prisma.student.create({
      data: {
        ...data,
        studentId: nextId,
      },
      include: { course: true },
    });
  }

  async findAll(search?: string) {
    return await prisma.student.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { studentId: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
      include: { course: true },
      orderBy: { studentId: "asc" },
    });
  }

  async findById(id: string) {
    return await prisma.student.findUnique({
      where: { id },
      include: { course: true, marks: true, attendance: true },
    });
  }

  async update(id: string, data: Prisma.StudentUpdateInput) {
    return await prisma.student.update({
      where: { id },
      data,
      include: { course: true },
    });
  }

  async delete(id: string) {
    return await prisma.student.delete({
      where: { id },
    });
  }
}
