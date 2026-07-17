# VISF — Verona International Short Film Festival

Custom website + CMS for the Verona International Short Film Festival.
Lets festival staff edit key content (jury, sponsors, winners, banners)
without needing a developer every year.

## Stack

- **Frontend**: Next.js (App Router) + TypeScript
- **CMS**: Payload CMS (embedded in the same Next.js app)
- **Database**: PostgreSQL (Supabase)
- **Images/Video**: Cloudinary
- **Email**: Resend
- **Styling**: Tailwind CSS v4
- **Hosting**: Vercel

## Requirements

- Node.js 20 or higher
- A Supabase, Cloudinary, and Resend account (see `.env.example`)

## Getting started locally

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your real values (see CONTRIBUTING.md for where to get each one)
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Project documentation

- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — team conventions: git workflow, folder structure, code style, Payload rules
- [`CLAUDE.md`](./CLAUDE.md) — instructions for AI assistants working in this repo

## Branching workflow

```
main   → production
dev    → integration
feature/*, fix/*, chore/*  → one branch per task
```

See `CONTRIBUTING.md` for the full Pull Request workflow.