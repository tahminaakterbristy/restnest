import bcrypt from "bcrypt";
import prisma from "../src/app/config/prisma";

async function main() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@rentnest.com",
    },

    update: {},

    create: {
      name: "Admin",
      email: "admin@rentnest.com",
      password: hash,
      role: "ADMIN",
    },
  });
}

main();