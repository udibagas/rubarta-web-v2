import prisma from "../../utils/prisma";

export default defineEventHandler(async () => {
  const companies = await prisma.company.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      tagline: true,
      description: true,
      logo: true,
      themePrimaryColor: true,
      themeSecondaryColor: true,
      themeGradientFrom: true,
      themeGradientTo: true,
    },
  });

  return companies;
});
