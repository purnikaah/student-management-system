import { prisma } from "../../lib/prisma";

export const UserRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
};
