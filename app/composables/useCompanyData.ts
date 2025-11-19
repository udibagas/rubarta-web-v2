export interface Product {
  name: string;
  description: string;
  image?: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  image?: string;
  category: string;
}

export interface Customer {
  name: string;
  logo?: string;
}

export interface CompanyData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image?: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  products: Product[];
  portfolio: PortfolioItem[];
  customers: Customer[];
  contact: {
    email: string;
    phone: string;
    address: string;
    social?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    gradientFrom?: string;
    gradientTo?: string;
  };
  logo?: string;
}

export const companyData: Record<string, CompanyData> = {
  "rubarta-prima-abadi": {
    id: "rubarta-prima-abadi",
    name: "Rubarta Prima Abadi",
    tagline: "Heavy Equipment Provider",
    description: "Leading provider of heavy equipment solutions",
    hero: {
      title: "Heavy Equipment Solutions",
      subtitle: "Powering Your Projects with Quality Equipment",
      description:
        "We provide comprehensive heavy equipment solutions for construction, mining, and industrial projects across Indonesia.",
    },
    about: {
      title: "About Rubarta Prima Abadi",
      description:
        "Rubarta Prima Abadi has been a trusted partner in heavy equipment provision for over a decade. We specialize in delivering high-quality equipment and services to support various industries including construction, mining, and infrastructure development.",
      mission:
        "To provide reliable and efficient heavy equipment solutions that empower our clients to achieve their project goals safely and successfully.",
      vision:
        "To be the leading heavy equipment provider in Indonesia, recognized for excellence in service quality and customer satisfaction.",
    },
    products: [
      {
        name: "Excavators",
        description:
          "High-performance excavators for all types of excavation projects",
      },
      {
        name: "Bulldozers",
        description: "Powerful bulldozers for earthmoving and land clearing",
      },
      {
        name: "Wheel Loaders",
        description: "Versatile wheel loaders for material handling",
      },
      {
        name: "Dump Trucks",
        description: "Heavy-duty dump trucks for transporting materials",
      },
      {
        name: "Cranes",
        description: "Mobile and tower cranes for lifting operations",
      },
      {
        name: "Compactors",
        description: "Road rollers and compactors for construction",
      },
    ],
    portfolio: [
      {
        title: "Jakarta Infrastructure Project",
        description:
          "Supplied heavy equipment for major infrastructure development",
        category: "Infrastructure",
      },
      {
        title: "Mining Operation Support",
        description:
          "Comprehensive equipment provision for coal mining operations",
        category: "Mining",
      },
      {
        title: "High-Rise Construction",
        description:
          "Crane and equipment support for commercial building construction",
        category: "Construction",
      },
      {
        title: "Road Development",
        description: "Equipment fleet for highway construction project",
        category: "Infrastructure",
      },
    ],
    customers: [
      { name: "PT Waskita Karya" },
      { name: "PT Adhi Karya" },
      { name: "PT Wijaya Karya" },
      { name: "PT Pembangunan Perumahan" },
      { name: "PT Hutama Karya" },
      { name: "PT Nindya Karya" },
    ],
    contact: {
      email: "info@rubartaprima.com",
      phone: "+62 21 1234 5678",
      address: "Jl. Industri Raya No. 123, Jakarta Timur, Indonesia",
      social: {
        facebook: "https://facebook.com/rubartaprima",
        instagram: "https://instagram.com/rubartaprima",
        linkedin: "https://linkedin.com/company/rubarta-prima-abadi",
      },
    },
    theme: {
      primaryColor: "green",
      secondaryColor: "emerald",
      gradientFrom: "from-green-600",
      gradientTo: "to-emerald-500",
    },
    logo: "/logo.png",
  },
  "rubarta-logistic-indonesia": {
    id: "rubarta-logistic-indonesia",
    name: "Rubarta Logistic Indonesia",
    tagline: "Supply Chain Solution",
    description: "Comprehensive supply chain and logistics solutions",
    hero: {
      title: "Integrated Supply Chain Solutions",
      subtitle: "Streamlining Your Logistics Operations",
      description:
        "We deliver end-to-end supply chain solutions that optimize your logistics operations and enhance business efficiency.",
    },
    about: {
      title: "About Rubarta Logistic Indonesia",
      description:
        "Rubarta Logistic Indonesia is your trusted partner for comprehensive supply chain solutions. With extensive experience in logistics management, warehousing, and distribution, we help businesses streamline their operations and reduce costs.",
      mission:
        "To deliver innovative and reliable supply chain solutions that drive operational excellence and customer success.",
      vision:
        "To become the most trusted logistics partner in Indonesia, known for our commitment to efficiency, reliability, and innovation.",
    },
    products: [
      {
        name: "Freight Forwarding",
        description: "International and domestic freight forwarding services",
      },
      {
        name: "Warehousing",
        description:
          "Modern warehouse facilities with advanced inventory management",
      },
      {
        name: "Distribution Services",
        description: "Efficient last-mile delivery and distribution network",
      },
      {
        name: "Supply Chain Consulting",
        description: "Strategic consulting to optimize your supply chain",
      },
      {
        name: "Custom Clearance",
        description: "Expert customs brokerage and clearance services",
      },
      {
        name: "Cold Chain Logistics",
        description: "Temperature-controlled logistics for sensitive goods",
      },
    ],
    portfolio: [
      {
        title: "E-Commerce Fulfillment",
        description:
          "End-to-end fulfillment solution for major online retailer",
        category: "E-Commerce",
      },
      {
        title: "Pharmaceutical Distribution",
        description: "Cold chain logistics for pharmaceutical company",
        category: "Healthcare",
      },
      {
        title: "Manufacturing Supply Chain",
        description:
          "Integrated supply chain management for automotive manufacturer",
        category: "Manufacturing",
      },
      {
        title: "FMCG Distribution Network",
        description: "Nationwide distribution network for consumer goods",
        category: "Retail",
      },
    ],
    customers: [
      { name: "Tokopedia" },
      { name: "Shopee Indonesia" },
      { name: "Unilever Indonesia" },
      { name: "Nestle Indonesia" },
      { name: "Astra International" },
      { name: "Indofood CBP" },
    ],
    contact: {
      email: "info@rubartalogistic.com",
      phone: "+62 21 8765 4321",
      address: "Jl. Logistik Raya No. 456, Jakarta Barat, Indonesia",
      social: {
        facebook: "https://facebook.com/rubartalogistic",
        instagram: "https://instagram.com/rubartalogistic",
        linkedin: "https://linkedin.com/company/rubarta-logistic-indonesia",
      },
    },
    theme: {
      primaryColor: "green",
      secondaryColor: "emerald",
      gradientFrom: "from-emerald-600",
      gradientTo: "to-green-500",
    },
    logo: "/logo.png",
  },
};

export const useCompanyData = () => {
  return {
    companyData,
    getCompany: (id: string) => companyData[id],
  };
};
