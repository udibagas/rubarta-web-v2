import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const portfolioId = getRouterParam(event, "portfolioId");
  if (!portfolioId) {
    throw createError({
      statusCode: 400,
      message: "Portfolio ID is required",
    });
  }

  await prisma.portfolio.delete({
    where: { id: portfolioId },
  });

  return { success: true };
});
