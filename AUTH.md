# Authentication System

## Overview

The admin dashboard is protected with session-based authentication using PostgreSQL and Prisma.

## Default Credentials

- **Email:** `admin@rubarta.com`
- **Password:** `admin123`

⚠️ **Important:** Change the default password after first login in production!

## Setup

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Run migrations:**

   ```bash
   npm run db:migrate
   ```

3. **Seed database (includes admin user):**
   ```bash
   npm run db:seed
   ```

## How It Works

### Models

- **User:** Stores admin user information and password hash
- **Session:** Stores active sessions with expiration dates

### Authentication Flow

1. User submits login form at `/login`
2. Server verifies credentials using bcrypt
3. Server creates session and sets HTTP-only cookie
4. Middleware checks session on admin routes
5. User can logout to invalidate session

### API Endpoints

- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout and clear session
- `GET /api/auth/me` - Get current user info

### Middleware

- **Server:** `server/middleware/auth.ts` - Protects `/api/admin/*` endpoints
- **Client:** `app/middleware/auth.global.ts` - Redirects to login if not authenticated

### Security Features

- Passwords hashed with bcrypt (10 rounds)
- HTTP-only cookies (not accessible via JavaScript)
- Session expiration (7 days)
- Secure flag in production
- CSRF protection via SameSite cookie attribute

## Creating Additional Users

To create more admin users, you can:

1. **Via Prisma Studio:**

   ```bash
   npm run db:studio
   ```

   Then add users manually (remember to hash passwords with bcrypt)

2. **Via Script:**
   Create a new seed or migration file with bcrypt password hashing

## Production Recommendations

- [ ] Change default password immediately
- [ ] Use strong passwords (min 12 characters)
- [ ] Enable HTTPS (required for secure cookies)
- [ ] Set `NODE_ENV=production`
- [ ] Add rate limiting for login attempts
- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Consider adding 2FA (Two-Factor Authentication)
- [ ] Set up session cleanup for expired sessions
- [ ] Monitor failed login attempts
