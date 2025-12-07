import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "productId");
  if (!productId) {
    throw createError({
      statusCode: 400,
      message: "Product ID is required",
    });
  }

  const body = await readBody(event);

  const product = await prisma.product.update({
    where: { id: productId },
    data: {
      name: body.name,
      description: body.description,
      image: body.image || null,
      order: body.order || 0,
    },
  });

  return product;
});
