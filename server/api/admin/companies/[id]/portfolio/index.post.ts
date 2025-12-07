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

  const portfolio = await prisma.portfolio.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      image: body.image || null,
      order: body.order || 0,
      companyId,
    },
  });

  return portfolio;
});
