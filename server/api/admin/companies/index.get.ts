import prisma from "../../../utils/prisma";

export default defineEventHandler(async () => {
  const companies = await prisma.company.findMany({
    include: {
      _count: {
        select: {
          products: true,
          portfolios: true,
          customers: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return companies;
});
