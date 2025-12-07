import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const companyId = getRouterParam(event, "id");
  if (!companyId) {
    throw createError({
      statusCode: 400,
      message: "Company ID is required",
    });
  }

  const body = await readBody(event);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      image: body.image || null,
      order: body.order || 0,
      companyId,
    },
  });

  return product;
});
