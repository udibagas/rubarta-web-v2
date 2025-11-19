<template>
  <div class="min-h-screen">
    <ScrollToTop />
    <Navigation :company-name="company.name" :logo="company.logo" />

    <HeroSection
      :hero="company.hero"
      :primary-color="company.theme.primaryColor"
    />

    <AboutSection :about="company.about" />

    <ProductsSection
      :products="company.products"
      :primary-color="company.theme.primaryColor"
    />

    <PortfolioSection
      :portfolio="company.portfolio"
      :primary-color="company.theme.primaryColor"
    />

    <CustomersSection :customers="company.customers" />

    <ContactSection
      :contact="company.contact"
      :primary-color="company.theme.primaryColor"
    />

    <FooterSection
      :company-name="company.name"
      :tagline="company.tagline"
      :contact="company.contact"
    />
  </div>
</template>

<script setup lang="ts">
const { getCompany } = useCompanyData();
const company = getCompany("rubarta-prima-abadi");

if (!company) {
  throw createError({
    statusCode: 404,
    message: "Company not found",
  });
}

useHead({
  title: `${company.name} - ${company.tagline}`,
  meta: [{ name: "description", content: company.description }],
});
</script>
