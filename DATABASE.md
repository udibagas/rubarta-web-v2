# Database Setup

## Prerequisites

- PostgreSQL installed and running
- Node.js 22 or higher

## Setup Instructions

1. **Configure Database Connection**

   Update `.env` file with your PostgreSQL credentials:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/rubarta_db?schema=public"
   ```

2. **Run Prisma Migrations**

   Create the database schema:

   ```bash
   npm run db:migrate
   ```

3. **Seed Initial Data**

   Populate the database with company data:

   ```bash
   npm run db:seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Database Management

- **View/Edit Data**: `npm run db:studio` - Opens Prisma Studio
- **Create Migration**: `npm run db:migrate` - After schema changes
- **Reset Database**: `npx prisma migrate reset` - Drops DB and reseeds

## API Endpoints

- `GET /api/companies` - List all companies
- `GET /api/companies/[slug]` - Get company details with products, portfolio, customers

## Database Schema

### Company

- Basic info (name, tagline, description, logo)
- Hero section content
- About section (mission, vision)
- Contact information
- Social media links
- Theme colors

### Product

- Belongs to Company
- Name, description, image, order

### Portfolio

- Belongs to Company
- Title, description, category, image, order

### Customer

- Belongs to Company
- Name, logo, order
