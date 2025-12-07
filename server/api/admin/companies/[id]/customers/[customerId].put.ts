import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const customerId = getRouterParam(event, "customerId");
  if (!customerId) {
    throw createError({
      statusCode: 400,
      message: "Customer ID is required",
    });
  }

  const body = await readBody(event);

  const customer = await prisma.customer.update({
    where: { id: customerId },
    data: {
      name: body.name,
      logo: body.logo || null,
      order: body.order || 0,
    },
  });

  return customer;
});
