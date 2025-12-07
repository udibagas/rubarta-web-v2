import prisma from "../../../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const company = await prisma.company.create({
    data: {
      slug: body.slug,
      name: body.name,
      tagline: body.tagline,
      description: body.description,
      logo: body.logo || null,
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroDescription: body.heroDescription,
      heroImage: body.heroImage || null,
      aboutTitle: body.aboutTitle,
      aboutDescription: body.aboutDescription,
      aboutMission: body.aboutMission,
      aboutVision: body.aboutVision,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      contactAddress: body.contactAddress,
      socialFacebook: body.socialFacebook || null,
      socialInstagram: body.socialInstagram || null,
      socialLinkedin: body.socialLinkedin || null,
      socialTwitter: body.socialTwitter || null,
      themePrimaryColor: body.themePrimaryColor,
      themeSecondaryColor: body.themeSecondaryColor,
      themeGradientFrom: body.themeGradientFrom || null,
      themeGradientTo: body.themeGradientTo || null,
    },
  });

  return company;
});
