import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Company slug is required",
    });
  }

  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      products: {
        orderBy: { order: "asc" },
      },
      portfolios: {
        orderBy: { order: "asc" },
      },
      customers: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!company) {
    throw createError({
      statusCode: 404,
      message: "Company not found",
    });
  }

  // Transform to match the existing interface
  return {
    id: company.slug,
    name: company.name,
    tagline: company.tagline,
    description: company.description,
    logo: company.logo,
    hero: {
      title: company.heroTitle,
      subtitle: company.heroSubtitle,
      description: company.heroDescription,
      image: company.heroImage,
    },
    about: {
      title: company.aboutTitle,
      description: company.aboutDescription,
      mission: company.aboutMission,
      vision: company.aboutVision,
    },
    products: company.products,
    portfolio: company.portfolios.map((p) => ({
      title: p.title,
      description: p.description,
      category: p.category,
      image: p.image,
    })),
    customers: company.customers,
    contact: {
      email: company.contactEmail,
      phone: company.contactPhone,
      address: company.contactAddress,
      social: {
        facebook: company.socialFacebook,
        instagram: company.socialInstagram,
        linkedin: company.socialLinkedin,
        twitter: company.socialTwitter,
      },
    },
    theme: {
      primaryColor: company.themePrimaryColor,
      secondaryColor: company.themeSecondaryColor,
      gradientFrom: company.themeGradientFrom,
      gradientTo: company.themeGradientTo,
    },
  };
});
