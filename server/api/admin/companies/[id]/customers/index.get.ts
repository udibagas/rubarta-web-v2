import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const companyId = getRouterParam(event, "id");
  if (!companyId) {
    throw createError({
      statusCode: 400,
      message: "Company ID is required",
    });
  }

  const customers = await prisma.customer.findMany({
    where: { companyId },
    orderBy: { order: "asc" },
  });

  return customers;
});
