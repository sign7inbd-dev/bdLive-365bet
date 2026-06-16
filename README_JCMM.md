# JCMM Betting Platform - Complete Implementation

## Overview

This is a **fully functional JCMM (জিসিএমএম) betting platform** built with Next.js 16, PostgreSQL (Neon), and Better Auth. It includes complete admin, member, and affiliate management systems with real-time transaction processing.

## Features Implemented

### 1. **Authentication System**
- Email + Password authentication via Better Auth
- Secure session management
- Role-based access control (Admin, Member, Affiliate)
- User registration and login flows

### 2. **Admin Dashboard** (`/admin/dashboard`)
- Real-time statistics and reports
- Member management and search
- Transaction approval system
- Bank account management
- Promotions and rebates administration
- Affiliate management
- Detailed analytics and reports

### 3. **Member Panel** (`/member/dashboard`)
- Account overview with balance information
- **Deposit System** - Request deposits from configured banks
- **Withdrawal System** - Withdraw funds to registered bank accounts
- **Betting Interface** - Place sports bets with odds calculation
- **Betting History** - View all placed bets and results
- **User Profile** - Manage personal information and bank accounts
- Referral code for affiliate recruitment

### 4. **Affiliate System** (`/affiliate/dashboard`)
- Referral tracking and statistics
- Commission calculation and history
- Monthly targets and performance
- Commission withdrawal requests
- Detailed referral reports

### 5. **Database Tables**
Complete schema with the following tables:
- `user` - Authentication users
- `session` - Session management
- `member_profiles` - Member information and statistics
- `transactions` - Deposit, withdrawal, and betting transactions
- `bank_accounts` - System bank accounts
- `member_bank_accounts` - User registered bank accounts
- `betting_slips` - Betting tickets
- `bet_selections` - Individual bet selections
- `sports_events` - Available sporting events
- `promotions` - Active promotions and bonuses
- `rebates` - Rebate calculations
- `affiliate_accounts` - Affiliate accounts
- `affiliate_commissions` - Commission tracking
- `admin_logs` - Audit trail

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **Authentication**: Better Auth with email/password
- **ORM**: Drizzle ORM
- **Server Actions**: For secure server-side operations

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon PostgreSQL account
- Vercel account (for deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/sign7inbd-dev/bdLive-365bet.git
cd bdLive-365bet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file with:
```
DATABASE_URL=postgresql://...your-neon-connection-string...
BETTER_AUTH_SECRET=your-secret-key-here (generate with: openssl rand -base64 32)
```

### 4. Database Setup
The database schema is already created in Neon. Tables include:
- All Better Auth tables (user, session, account, verification)
- Custom JCMM tables for betting functionality

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Usage & Workflows

### Admin Workflow
1. Go to `/sign-in` and login with admin credentials
2. Access `/admin/dashboard` for overview
3. Manage members at `/admin/members`
4. Approve transactions at `/admin/transactions`
5. Configure banks at `/admin/banks`
6. Manage promotions at `/admin/promotions`
7. View detailed reports at `/admin/reports`

### Member Workflow
1. Register at `/sign-up`
2. Verify email
3. Access `/member/dashboard`
4. Add bank accounts at `/member/profile`
5. Request deposit at `/member/deposit`
6. Place bets at `/member/betting`
7. Request withdrawal at `/member/withdrawal`
8. Track all activities in history

### Affiliate Workflow
1. Register as affiliate
2. Access `/affiliate/dashboard`
3. Get unique referral code
4. Share with potential members
5. Track referrals at `/affiliate/referrals`
6. View commissions at `/affiliate/commissions`
7. Request commission withdrawal

## API Endpoints

### Server Actions (in `/app/actions/`)
- `members.ts` - Member operations (deposit, withdrawal, betting)
- `admin.ts` - Admin operations (approve transactions, manage users)

### Auth Endpoints
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-up` - Register
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get current session

## File Structure

```
/app
  /admin - Admin pages and functions
  /member - Member pages and functions
  /affiliate - Affiliate pages and functions
  /api - API routes
  /actions - Server actions
  /sign-in - Authentication
  /sign-up - Registration

/lib
  auth.ts - Better Auth configuration
  auth-client.ts - Client-side auth
  /db
    index.ts - Drizzle setup
    schema.ts - Complete schema definition

/components
  - Reusable UI components
  auth-form.tsx - Login/Register form
  navigation.tsx - Navigation component
```

## Security Features

1. **Session Management** - Secure cookies with Better Auth
2. **User Scoping** - All queries scoped to logged-in user
3. **Server Actions** - Private operations run server-side
4. **Password Hashing** - Better Auth handles password security
5. **CSRF Protection** - Built-in to Next.js

## Deployment to Vercel

### Option 1: Using Vercel Dashboard
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Option 2: Using Vercel CLI
```bash
vercel deploy --prod
```

## Database Configuration

All tables are created in Neon PostgreSQL with:
- Proper relationships and constraints
- Default values for timestamps
- Optimized for betting operations
- Support for multi-currency transactions

## Admin Credentials

For first-time setup, create an admin user:
```bash
# Use the sign-up page and then update the role in the database
UPDATE "user" SET role = 'admin' WHERE email = 'admin@example.com';
```

## Performance & Scaling

- Optimized queries with Drizzle ORM
- Proper indexing on frequently queried fields
- Neon auto-scaling for database
- Edge-function compatible code
- Caching strategies via revalidateTag

## Monitoring & Analytics

- Admin logs for all actions
- Real-time transaction tracking
- Member activity reports
- Affiliate performance metrics
- Revenue reports

## Support & Documentation

Refer to the JCMM User Manual (provided separately) for detailed feature specifications and workflows.

## License

Proprietary - bdLive-365bet Platform

## Contact

For support and inquiries, contact the development team.

---

**Status**: ✅ Production Ready
**Last Updated**: June 2026
**Version**: 1.0.0
