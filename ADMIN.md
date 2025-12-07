# Admin Dashboard

The admin dashboard allows you to manage all content for both companies.

## Access

Visit `/admin` to access the dashboard.

**Note:** Authentication is not implemented yet. In production, you should add proper authentication before deploying.

## Features

### Dashboard (`/admin`)

- View statistics (companies, products, portfolio, customers)
- Quick navigation to management sections

### Companies Management (`/admin/companies`)

- List all companies
- Create new company
- Edit company information (basic info, hero, about, contact, theme)
- Delete company
- Navigate to manage products, portfolio, and customers

### Products Management (`/admin/companies/[id]/products`)

- List all products for a company
- Add new product
- Edit product (name, description, image, display order)
- Delete product

### Portfolio Management (`/admin/companies/[id]/portfolio`)

- List all portfolio items
- Add new portfolio item
- Edit portfolio (title, description, category, image, display order)
- Delete portfolio item

### Customers Management (`/admin/companies/[id]/customers`)

- List all customers
- Add new customer
- Edit customer (name, logo, display order)
- Delete customer

## API Endpoints

### Stats

- `GET /api/admin/stats` - Get dashboard statistics

### Companies

- `GET /api/admin/companies` - List companies
- `POST /api/admin/companies` - Create company
- `GET /api/admin/companies/[id]` - Get company details
- `PUT /api/admin/companies/[id]` - Update company
- `DELETE /api/admin/companies/[id]` - Delete company

### Products

- `GET /api/admin/companies/[id]/products` - List products
- `POST /api/admin/companies/[id]/products` - Create product
- `PUT /api/admin/companies/[id]/products/[productId]` - Update product
- `DELETE /api/admin/companies/[id]/products/[productId]` - Delete product

### Portfolio

- `GET /api/admin/companies/[id]/portfolio` - List portfolio
- `POST /api/admin/companies/[id]/portfolio` - Create portfolio item
- `PUT /api/admin/companies/[id]/portfolio/[portfolioId]` - Update portfolio
- `DELETE /api/admin/companies/[id]/portfolio/[portfolioId]` - Delete portfolio

### Customers

- `GET /api/admin/companies/[id]/customers` - List customers
- `POST /api/admin/companies/[id]/customers` - Create customer
- `PUT /api/admin/companies/[id]/customers/[customerId]` - Update customer
- `DELETE /api/admin/companies/[id]/customers/[customerId]` - Delete customer

## Security

⚠️ **Important:** The current implementation has no authentication. Before deploying to production:

1. Implement authentication (session-based, JWT, or OAuth)
2. Add role-based access control
3. Update `/server/middleware/auth.ts` with proper authentication logic
4. Consider adding CSRF protection
5. Add rate limiting for API endpoints

## TODO

- [ ] Add authentication system
- [ ] Add image upload functionality
- [ ] Add form validation
- [ ] Add success/error notifications
- [ ] Add pagination for large datasets
- [ ] Add search/filter functionality
- [ ] Add bulk operations
