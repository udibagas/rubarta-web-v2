import prisma from "../../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Company ID is required",
    });
  }

  const company = await prisma.company.findUnique({
    where: { id },
  });

  if (!company) {
    throw createError({
      statusCode: 404,
      message: "Company not found",
    });
  }

  return company;
});
