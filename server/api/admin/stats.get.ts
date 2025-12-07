import prisma from "../../utils/prisma";

export default defineEventHandler(async () => {
  const [companies, products, portfolios, customers] = await Promise.all([
    prisma.company.count(),
    prisma.product.count(),
    prisma.portfolio.count(),
    prisma.customer.count(),
  ]);

  return {
    companies,
    products,
    portfolios,
    customers,
  };
});
