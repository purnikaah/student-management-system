import { prisma } from "../../lib/prisma";
export const UserRepository = {
    async create(data) {
        return prisma.user.create({ data });
    },
    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    },
};
