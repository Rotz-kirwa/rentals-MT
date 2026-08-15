# rentals-MT

## My Nyumba Rental Management System - Modernized Monorepo Architecture

This repository contains the modernized TypeScript monorepo implementation of the My Nyumba Rental Management System.

### Monorepo Architecture
- `apps/api`: Node.js / Express TypeScript API featuring HTTP-only cookie session authentication, rate-limiting middleware, optimized batch billing engine, and atomic Safaricom M-Pesa STK Push callback reconciliation.
- `apps/web`: React / TypeScript Single Page Application (SPA) with React Router v6 URL navigation, role-aware dashboard, and modern responsive UI.
- `packages/database`: PostgreSQL Prisma ORM database models, performance relation indexes, schema migrations, and database seed scripts.

### Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Ensure `.env` contains your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mynyumba_db?schema=public"
   PORT=4000
   JWT_SECRET=my-nyumba-super-secret-jwt-key-2026
   ```

3. **Database Migration & Seeding**:
   ```bash
   npm run db:push
   npm run db:seed --workspace=packages/database
   ```

4. **Run Development Mode**:
   ```bash
   npm run dev
   ```

5. **Build & Test Verification**:
   ```bash
   npm run test
   npm run build
   ```
