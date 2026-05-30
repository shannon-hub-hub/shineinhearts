# Shine in Hearts — Full-Stack Next.js App

## Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes (REST)
- **Database**: PostgreSQL 
- **Charts**: Recharts
- **Authentication**: NextAuth.js with credential-based admin login

## Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# 3. Start database
docker compose up db -d

# 4. Run migrations + seed
npm run db:migrate
npm run db:seed

# 5. Start dev server
npm run dev
```

## Or with Docker (everything)
```bash
docker compose up --build
```

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home — live stats from DB via ISR |
| `/impact` | Interactive charts (Recharts + PostgreSQL) |
| `/blog` | Blog posts from DB |
| `/events` | Events grouped by year from DB |
| `/contact` | Form → `contact_submissions` table |
| `/get-involved` | Application form → `applications` table |
| `/admin/dashboard` | Live admin dashboard |
| `/admin/applications` | Review/approve applications |
| `/admin/messages` | View contact submissions |

## API Routes
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/impact` | Latest metrics or time-series |
| GET | `/api/events` | All events, filterable by year |
| GET | `/api/blog` | Published blog posts |
| GET | `/api/members` | Members, filterable by chapter |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/apply` | Submit volunteer application |
| GET | `/api/admin/stats` | Admin dashboard aggregates |
| GET/PATCH | `/api/admin/applications` | List + review applications |

## Database Schema
9 tables: `chapters`, `members`, `events`, `blog_posts`, `programs`,
`impact_metrics`, `applications`, `contact_submissions` + indexes.

See `db/schema.sql` for full schema.
