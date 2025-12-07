import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const customerId = getRouterParam(event, "customerId");
  if (!customerId) {
    throw createError({
      statusCode: 400,
      message: "Customer ID is required",
    });
  }

  await prisma.customer.delete({
    where: { id: customerId },
  });

  return { success: true };
});
