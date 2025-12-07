import {} from "dotenv/config";
import { PrismaClient } from "@/../prisma/generated/client/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  const connectionString = `${process.env.DATABASE_URL}`;

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  return prisma;
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
