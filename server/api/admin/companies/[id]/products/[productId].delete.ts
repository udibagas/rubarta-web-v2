import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "productId");
  if (!productId) {
    throw createError({
      statusCode: 400,
      message: "Product ID is required",
    });
  }

  await prisma.product.delete({
    where: { id: productId },
  });

  return { success: true };
});
