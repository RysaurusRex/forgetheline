# Forge the Line AI

Private client portal for law enforcement and federal hiring preparation.

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL with Prisma
- NextAuth.js

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/forge_the_line"
NEXTAUTH_SECRET="your-secret-key-min-32-chars-long-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed demo data
npm run db:seed
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@forgetheline.com | admin123 |
| Client | demo@client.com | demo123 |

## Project Structure

```
src/
├── app/
│   ├── (portal)/          # Client portal routes
│   │   ├── home/
│   │   ├── dashboard/
│   │   ├── client-profile/
│   │   ├── results/
│   │   ├── start-here/
│   │   ├── tools/
│   │   │   ├── resume-analyzer/
│   │   │   ├── interview-simulator/
│   │   │   ├── disqualifier-scanner/
│   │   │   └── strategy-engine/
│   │   ├── info/
│   │   │   ├── initial-testing/
│   │   │   ├── fitness/
│   │   │   ├── processing-clearances/
│   │   │   └── offers-academy-probation/
│   │   └── coaching/
│   ├── admin/            # Admin routes
│   ├── api/auth/         # NextAuth
│   ├── login/
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── portal-nav.tsx
│   ├── tool-page.tsx
│   └── auth-provider.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
└── types/
    └── next-auth.d.ts
```

## Routes

### Public
- `/` - Landing page
- `/login` - Sign in

### Portal (Authenticated)
- `/app/home` - Portal home
- `/app/dashboard` - Editable dashboard
- `/app/client-profile` - Client profile
- `/app/results` - Results log
- `/app/start-here` - Getting started guide
- `/app/tools/*` - Tool pages
- `/app/info/*` - Info pages
- `/app/coaching` - Coaching (view-only)

### Admin
- `/admin` - Admin dashboard
- `/admin/customers` - Sales tracker
- `/admin/clients/[id]` - Client view

## Deploying to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## License

MIT"# forgetheline" 
