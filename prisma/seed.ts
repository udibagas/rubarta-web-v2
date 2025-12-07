import * as bcrypt from "bcrypt";
import {} from "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // Create Rubarta Prima Abadi
  const primaAbadi = await prisma.company.upsert({
    where: { slug: "rubarta-prima-abadi" },
    update: {},
    create: {
      slug: "rubarta-prima-abadi",
      name: "Rubarta Prima Abadi",
      tagline: "Heavy Equipment Provider",
      description: "Leading provider of heavy equipment solutions",
      logo: "/logo.svg",
      heroTitle: "Heavy Equipment Solutions",
      heroSubtitle: "Powering Your Projects with Quality Equipment",
      heroDescription:
        "We provide comprehensive heavy equipment solutions for construction, mining, and industrial projects across Indonesia.",
      aboutTitle: "About Rubarta Prima Abadi",
      aboutDescription:
        "Rubarta Prima Abadi has been a trusted partner in heavy equipment provision for over a decade. We specialize in delivering high-quality equipment and services to support various industries including construction, mining, and infrastructure development.",
      aboutMission:
        "To provide reliable and efficient heavy equipment solutions that empower our clients to achieve their project goals safely and successfully.",
      aboutVision:
        "To be the leading heavy equipment provider in Indonesia, recognized for excellence in service quality and customer satisfaction.",
      contactEmail: "info@rubartaprima.com",
      contactPhone: "+62 21 1234 5678",
      contactAddress: "Jl. Industri Raya No. 123, Jakarta Timur, Indonesia",
      socialFacebook: "https://facebook.com/rubartaprima",
      socialInstagram: "https://instagram.com/rubartaprima",
      socialLinkedin: "https://linkedin.com/company/rubarta-prima-abadi",
      themePrimaryColor: "green",
      themeSecondaryColor: "emerald",
      themeGradientFrom: "from-green-600",
      themeGradientTo: "to-emerald-500",
    },
  });

  // Create products for Prima Abadi
  const primaAbadiProducts = [
    {
      name: "Excavators",
      description:
        "High-performance excavators for all types of excavation projects",
      order: 1,
    },
    {
      name: "Bulldozers",
      description: "Powerful bulldozers for earthmoving and land clearing",
      order: 2,
    },
    {
      name: "Wheel Loaders",
      description: "Versatile wheel loaders for material handling",
      order: 3,
    },
    {
      name: "Dump Trucks",
      description: "Heavy-duty dump trucks for transporting materials",
      order: 4,
    },
    {
      name: "Cranes",
      description: "Mobile and tower cranes for lifting operations",
      order: 5,
    },
    {
      name: "Compactors",
      description: "Road rollers and compactors for construction",
      order: 6,
    },
  ];

  for (const product of primaAbadiProducts) {
    await prisma.product.upsert({
      where: { id: `${primaAbadi.id}-${product.order}` },
      update: {},
      create: {
        ...product,
        companyId: primaAbadi.id,
      },
    });
  }

  // Create portfolio for Prima Abadi
  const primaAbadiPortfolio = [
    {
      title: "Jakarta Infrastructure Project",
      description:
        "Supplied heavy equipment for major infrastructure development",
      category: "Infrastructure",
      order: 1,
    },
    {
      title: "Mining Operation Support",
      description:
        "Comprehensive equipment provision for coal mining operations",
      category: "Mining",
      order: 2,
    },
    {
      title: "High-Rise Construction",
      description:
        "Crane and equipment support for commercial building construction",
      category: "Construction",
      order: 3,
    },
    {
      title: "Road Development",
      description: "Equipment fleet for highway construction project",
      category: "Infrastructure",
      order: 4,
    },
  ];

  for (const portfolio of primaAbadiPortfolio) {
    await prisma.portfolio.upsert({
      where: { id: `${primaAbadi.id}-portfolio-${portfolio.order}` },
      update: {},
      create: {
        ...portfolio,
        companyId: primaAbadi.id,
      },
    });
  }

  // Create customers for Prima Abadi
  const primaAbadiCustomers = [
    { name: "PT Waskita Karya", order: 1 },
    { name: "PT Adhi Karya", order: 2 },
    { name: "PT Wijaya Karya", order: 3 },
    { name: "PT Pembangunan Perumahan", order: 4 },
    { name: "PT Hutama Karya", order: 5 },
    { name: "PT Nindya Karya", order: 6 },
  ];

  for (const customer of primaAbadiCustomers) {
    await prisma.customer.upsert({
      where: { id: `${primaAbadi.id}-customer-${customer.order}` },
      update: {},
      create: {
        ...customer,
        companyId: primaAbadi.id,
      },
    });
  }

  // Create Rubarta Logistic Indonesia
  const logistic = await prisma.company.upsert({
    where: { slug: "rubarta-logistic-indonesia" },
    update: {},
    create: {
      slug: "rubarta-logistic-indonesia",
      name: "Rubarta Logistic Indonesia",
      tagline: "Supply Chain Solution",
      description: "Comprehensive supply chain and logistics solutions",
      logo: "/logo.svg",
      heroTitle: "Integrated Supply Chain Solutions",
      heroSubtitle: "Streamlining Your Logistics Operations",
      heroDescription:
        "We deliver end-to-end supply chain solutions that optimize your logistics operations and enhance business efficiency.",
      aboutTitle: "About Rubarta Logistic Indonesia",
      aboutDescription:
        "Rubarta Logistic Indonesia is your trusted partner for comprehensive supply chain solutions. With extensive experience in logistics management, warehousing, and distribution, we help businesses streamline their operations and reduce costs.",
      aboutMission:
        "To deliver innovative and reliable supply chain solutions that drive operational excellence and customer success.",
      aboutVision:
        "To become the most trusted logistics partner in Indonesia, known for our commitment to efficiency, reliability, and innovation.",
      contactEmail: "info@rubartalogistic.com",
      contactPhone: "+62 21 8765 4321",
      contactAddress: "Jl. Logistik Raya No. 456, Jakarta Barat, Indonesia",
      socialFacebook: "https://facebook.com/rubartalogistic",
      socialInstagram: "https://instagram.com/rubartalogistic",
      socialLinkedin: "https://linkedin.com/company/rubarta-logistic-indonesia",
      themePrimaryColor: "green",
      themeSecondaryColor: "emerald",
      themeGradientFrom: "from-emerald-600",
      themeGradientTo: "to-green-500",
    },
  });

  // Create products for Logistic
  const logisticProducts = [
    {
      name: "Freight Forwarding",
      description: "International and domestic freight forwarding services",
      order: 1,
    },
    {
      name: "Warehousing",
      description:
        "Modern warehouse facilities with advanced inventory management",
      order: 2,
    },
    {
      name: "Distribution Services",
      description: "Efficient last-mile delivery and distribution network",
      order: 3,
    },
    {
      name: "Supply Chain Consulting",
      description: "Strategic consulting to optimize your supply chain",
      order: 4,
    },
    {
      name: "Custom Clearance",
      description: "Expert customs brokerage and clearance services",
      order: 5,
    },
    {
      name: "Cold Chain Logistics",
      description: "Temperature-controlled logistics for sensitive goods",
      order: 6,
    },
  ];

  for (const product of logisticProducts) {
    await prisma.product.upsert({
      where: { id: `${logistic.id}-${product.order}` },
      update: {},
      create: {
        ...product,
        companyId: logistic.id,
      },
    });
  }

  // Create portfolio for Logistic
  const logisticPortfolio = [
    {
      title: "E-Commerce Fulfillment",
      description: "End-to-end fulfillment solution for major online retailer",
      category: "E-Commerce",
      order: 1,
    },
    {
      title: "Pharmaceutical Distribution",
      description: "Cold chain logistics for pharmaceutical company",
      category: "Healthcare",
      order: 2,
    },
    {
      title: "Manufacturing Supply Chain",
      description:
        "Integrated supply chain management for automotive manufacturer",
      category: "Manufacturing",
      order: 3,
    },
    {
      title: "FMCG Distribution Network",
      description: "Nationwide distribution network for consumer goods",
      category: "Retail",
      order: 4,
    },
  ];

  for (const portfolio of logisticPortfolio) {
    await prisma.portfolio.upsert({
      where: { id: `${logistic.id}-portfolio-${portfolio.order}` },
      update: {},
      create: {
        ...portfolio,
        companyId: logistic.id,
      },
    });
  }

  // Create customers for Logistic
  const logisticCustomers = [
    { name: "Tokopedia", order: 1 },
    { name: "Shopee Indonesia", order: 2 },
    { name: "Unilever Indonesia", order: 3 },
    { name: "Nestle Indonesia", order: 4 },
    { name: "Astra International", order: 5 },
    { name: "Indofood CBP", order: 6 },
  ];

  for (const customer of logisticCustomers) {
    await prisma.customer.upsert({
      where: { id: `${logistic.id}-customer-${customer.order}` },
      update: {},
      create: {
        ...customer,
        companyId: logistic.id,
      },
    });
  }

  // Create default admin user
  // Password: admin123
  // In production, change this password immediately!
  const passwordHash = await bcrypt.hash("admin123", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@rubarta.com" },
    update: {
      passwordHash: passwordHash,
    },
    create: {
      email: "admin@rubarta.com",
      name: "Admin",
      role: "admin",
      // Hash of 'admin123' using bcrypt with salt rounds 10
      passwordHash: passwordHash,
    },
  });

  console.log("Created admin user:", adminUser.email);
  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
