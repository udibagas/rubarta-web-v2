import prisma from "../../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const portfolioId = getRouterParam(event, "portfolioId");
  if (!portfolioId) {
    throw createError({
      statusCode: 400,
      message: "Portfolio ID is required",
    });
  }

  const body = await readBody(event);

  const portfolio = await prisma.portfolio.update({
    where: { id: portfolioId },
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      image: body.image || null,
      order: body.order || 0,
    },
  });

  return portfolio;
});
