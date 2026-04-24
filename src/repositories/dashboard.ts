import { prisma } from "../../lib/prisma";
export const DashboardRepository = {
  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [totalStudents, presentToday, totalCourses, pendingFees] =
      await Promise.all([
        prisma.student.count(),
        prisma.attendance.count({
          where: {
            date: { gte: today },
            status: "PRESENT",
          },
        }),
        prisma.course.count(),
        prisma.fee.aggregate({
          _sum: { amount: true },
          where: { status: "PENDING" },
        }),
      ]);
    return {
      totalStudents,
      presentToday,
      totalCourses,
      pendingFees: pendingFees._sum.amount || 0,
    };
  },
  async getRecentStudents() {
    return prisma.student.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { course: true },
    });
  },
};
