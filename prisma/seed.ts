import "dotenv/config";
import * as bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("Starting database seeding...");

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "System Admin";

  if (!adminEmail || !adminPassword) {
    console.error("Error: ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: adminName,
      fullName: adminName,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: adminName,
      fullName: adminName,
      role: "SuperAdmin",
    },
  });

  console.log(`Default admin created/updated: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
