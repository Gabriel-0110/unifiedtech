## UnifiedTech Solutions by G&G

Professional technology services website built with modern Next.js stack for delivering cutting-edge solutions to businesses.

### Stack

- Next.js 15 (App Router, React 19)
- Tailwind CSS v4 (dark mode default)
- Prisma ORM (Supabase Postgres)
- Supabase JS client (public reads / future features)
- TypeScript strict
- Playwright (E2E smoke tests)
- Zod validation

### Structure

```
app/
	layout.tsx      # Global layout (Header, Footer, analytics init)
	page.tsx        # Home page composition
	api/            # (API routes in TS – migrating)
src/
	components/
		layout/       # Header, Footer
		sections/     # Hero, ServicesOverview, AboutPreview, etc.
	lib/            # supabaseClient, analytics, (db/middleware pending)
	types/          # shared types (future)
prisma/
	schema.prisma
```

### Scripts

| Script          | Purpose                           |
| --------------- | --------------------------------- |
| dev             | Local development (Turbopack)     |
| build           | Production build                  |
| start           | Run built app                     |
| lint            | ESLint (no warnings)              |
| type-check      | TypeScript diagnostics            |
| prisma:generate | Generate Prisma client            |
| prisma:push     | Push schema to DB (non-migration) |
| prisma:migrate  | Create/apply dev migration        |
| test:e2e        | Playwright smoke tests            |

### Environment Variables

See `.env.example` for required & optional vars (Supabase, analytics, rate limiting, Dynamics Graph, email).

### Supabase

`DATABASE_URL` is used by Prisma; `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` enable optional client features.

### Analytics

`analytics.ts` stub loads GA + Clarity only if IDs are present. Extend with custom event helpers as needed.

### Dark Mode

Currently forced with `<html class="dark">`. Introduce user preference toggle later (store in localStorage / cookie).

### Roadmap (Short Term)

1. Migrate remaining legacy sections and API routes to TypeScript.
2. Implement contact + newsletter endpoints with current middleware (refine & test).
3. Add basic Playwright tests for all top-level pages.
4. Introduce logging abstraction (console in dev, structured in prod).
5. Add content editing strategy (MDX or CMS) for blog & case studies.

### Deployment

Recommended target: Vercel.

1. Fork / push repo to GitHub.
2. Create a new Vercel project, import repo.
3. Add environment variables from `.env.example` (at minimum: `DATABASE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`).
4. (Prisma) If using Supabase Data Proxy, set `DATABASE_URL` to the proxy URL; otherwise regular connection string. Run an initial `prisma db push` locally and commit the baseline SQL (already captured) if switching off proxy.
5. Trigger first deploy. Build must succeed (no `use client` issues in server files).
6. Post-deploy: verify `/api/contact` health (GET) and form submission (POST) via UI.
7. (Optional) Enable Analytics: add `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_CLARITY_ID` then redeploy.

Smoke Tests (local):

```
npm run dev
PNPX playwright install --with-deps   # first time only
npm run test:e2e
```

### Environment Variables Summary

See `.env.example` (kept minimal & documented). Ensure secrets are stored only in Vercel project settings, not committed.

### Production Checklist

- [x] TypeScript strict passes
- [x] Production build passes
- [x] Core pages migrated (home, about, services, case studies, resources, contact, blog)
- [x] API routes: contact, newsletter, blog
- [ ] Optional legal pages (privacy, terms) – add if required for launch
- [ ] Content seeding strategy (blog/case studies) – manual or script

### Contributing

Tooling simplified (no precommit hooks). Prefer Conventional Commits (feat:, fix:, chore:, docs:). Run `lint` & `type-check` before pushing.

### License

MIT (adjust if needed).
