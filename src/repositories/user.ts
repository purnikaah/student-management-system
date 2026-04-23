import { prisma } from "../../lib/prisma";
import type { Prisma } from "../../generated/prisma/client";

export const UserRepository = {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
};
