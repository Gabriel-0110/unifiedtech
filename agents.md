# AGENTS.md

## Project Overview

This project is a modern corporate website for UnifiedTech.  
Tech stack: Next.js 14, TypeScript, TailwindCSS, Prisma, Supabase, Playwright.  
Purpose: Professional services website with blog, case studies, contact forms, and newsletter functionality.

## Build & Run

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Start production: `npm start`
- Test: `npm test`
- E2E tests: `npx playwright test`

## Code Style

- Language: TypeScript
- Linting: `npm run lint`
- Formatting: Prettier with ESLint config
- Naming conventions:
  - camelCase for variables and functions
  - PascalCase for React components
  - kebab-case for file names and routes
  - UPPER_SNAKE_CASE for environment variables

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable React components organized by type
- `/src/lib` - Utility functions and configurations
- `/src/types` - TypeScript type definitions
- `/prisma` - Database schema and migrations
- `/tests` - Playwright E2E tests
- `/public` - Static assets

## Database & Backend

- Database: Supabase (PostgreSQL)
- ORM: Prisma
- Run migrations: `npx prisma migrate dev`
- Generate client: `npx prisma generate`
- Studio: `npx prisma studio`

## Testing

- E2E tests in `/tests/` directory
- Run smoke tests: `npx playwright test tests/smoke.spec.ts`
- Run all tests: `npx playwright test`
- Use Playwright for browser automation testing

## Deployment

- Production build: `npm run build`
- Deploy target: Vercel (recommended for Next.js)
- Environment vars:
  - `DATABASE_URL` - Supabase connection string
  - `DIRECT_URL` - Direct database connection for migrations
  - `NEXT_PUBLIC_SUPABASE_URL` - Public Supabase URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public Supabase anonymous key
  - `SUPABASE_SERVICE_ROLE_KEY` - Private service role key
  - `RESEND_API_KEY` - Email service API key
  - `NEXT_PUBLIC_BASE_URL` - Site base URL

## Key Features

- **Blog System**: Dynamic blog with markdown support (`/app/blog/`)
- **Case Studies**: Portfolio showcase (`/app/case-studies/`)
- **Contact Forms**: Lead generation with email integration (`/app/contact/`)
- **Newsletter**: Subscription management with confirm/unsubscribe (`/app/api/newsletter/`)
- **Analytics**: Client-side analytics integration
- **SEO**: Optimized meta tags and sitemap

## Security Notes

- Never commit `.env.local` files
- Secrets managed via Vercel environment variables
- Supabase RLS (Row Level Security) enabled
- Be cautious with user input (XSS protection, form validation)
- Email templates sanitized against injection

## API Routes

- `GET/POST /api/blog` - Blog post management
- `GET /api/blog/[slug]` - Individual blog posts
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter subscription
- `GET /api/newsletter/confirm` - Subscription confirmation
- `POST /api/newsletter/unsubscribe` - Unsubscribe handling

## Commit & PR Guidelines

- Use Conventional Commits format
- Examples:
  - `feat(blog): add new blog post editor`
  - `fix(contact): resolve form validation issue`
  - `style(ui): update button component styles`
  - `docs(readme): update setup instructions`
- Keep PRs focused (1 feature/fix at a time)
- Include screenshots for UI changes

## Agent-specific Tips

- Always check `package.json` scripts before suggesting commands
- Use `npm run dev` for local development
- For database changes, always run `npx prisma generate` after schema updates
- Check Supabase connection before troubleshooting database issues
- When adding new pages, follow the App Router convention in `/app`
- Components should be placed in appropriate `/src/components` subdirectories
- Test contact forms and newsletter functionality after changes
- Use TypeScript strict mode - fix type errors before committing
- For Windows development, be aware of path separator differences in build tools
