# My Idea — Interactive Learning Platform

_("My Idea" is the working title used throughout the UI and metadata right
now - rename it in `src/i18n/locales/*.ts` (`nav.brand`), `src/routes/__root.tsx`
(page title/meta tags), and `package.json` once you've picked a real name.)_

A multilingual, interactive learning platform covering Cybersecurity,
Artificial Intelligence, Software Engineering, Networking, Ethical
Hacking, Data Science, Cloud Computing, Operating Systems, and
Professional Skills - with topic-level lessons and scored quizzes,
structured multi-unit **Courses** (Supabase-backed, with their own
lesson viewer, unit/final exams, and certificates - see
`src/lib/courses-data.ts` and `src/lib/course-actions.ts`),
downloadable/QR-verifiable certificates, an AI chat mentor, and eight
hands-on security tools (password strength, phishing awareness, email
header analysis, hashing, encryption, link safety checking, a network
defense simulator, and an AI attack defense planner). See `plan.md`
for the current build status.

## Stack

- **TanStack Start** (file-based routing - see `src/routes/README.md`) on
  **React 19** and **Vite**
- **Supabase** for auth, Postgres, and Row Level Security
- **Tailwind CSS v4** + shadcn/ui
- **Vercel AI SDK** + Gemini for the AI chat widget
- **jsPDF** + `qrcode` for certificate generation
- 7 languages: English, Arabic (RTL), Spanish, French, Italian, Dutch,
  Turkish
- **Vitest** for unit tests, **ESLint** + **Prettier** for linting/formatting

## Prerequisites

- [Bun](https://bun.sh) (the lockfile-free `bunfig.toml` in this repo
  assumes Bun; `npm`/`pnpm`/`yarn` work too, just without that config
  taking effect)
- A [Supabase](https://supabase.com) project
- A [Google AI Studio](https://aistudio.google.com) API key (for the AI
  chat feature and the AI Attack Defense Planner tool)
- An [ElevenLabs](https://elevenlabs.io) API key (for the "listen"
  buttons and the accessibility Read Aloud toggle - see the
  `ELEVENLABS_API_KEY` comment in `.env.example`). Free tier: 10,000
  characters/month, no credit card required; response caching (see
  `src/routes/api/text-to-speech.ts`) makes that go much further than it
  sounds, since repeated text like a lesson body is only ever generated
  once.

## Setup

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in every value - see the
   comments in that file for where each one comes from.

   ```bash
   cp .env.example .env
   ```

   > **Deploying to Cloudflare Workers?** `vite.config.ts` currently
   > targets `cloudflare-module` (see the comment there - swap it for
   > `vercel`/`netlify`/`node-server` if you're hosting elsewhere). Workers
   > don't read a `.env` file at runtime; `bun run dev`/`vite dev` do, but
   > for `wrangler dev` or a real deployment you'll additionally need
   > these same variables as `.dev.vars` (local) and
   > `wrangler secret put <NAME>` / dashboard-configured vars (production).
   > This repo's `.gitignore` already excludes `.dev.vars`.

3. **Run the database migrations**

   The schema (tables, RLS policies, and the RPC functions the API routes
   call) lives in `supabase/migrations/`. With the
   [Supabase CLI](https://supabase.com/docs/guides/cli):

   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```

   Then regenerate `src/integrations/supabase/types.ts` from the live
   schema so it can't drift out of sync again:

   ```bash
   supabase gen types typescript --linked > src/integrations/supabase/types.ts
   ```

4. **Enable Google sign-in** (optional, for auth)

   The sign-in page (`src/routes/auth.tsx`) offers Google OAuth - enable
   the Google provider under Authentication -> Providers in your Supabase
   dashboard, or remove that button if you don't need it.

5. **Run the dev server**

   ```bash
   bun run dev
   ```

## Scripts

| Command              | Does what                          |
| -------------------- | ---------------------------------- |
| `bun run dev`        | Start the Vite dev server          |
| `bun run build`      | Production build                   |
| `bun run build:dev`  | Build in development mode          |
| `bun run preview`    | Preview a production build locally |
| `bun run test`       | Run the Vitest suite once          |
| `bun run test:watch` | Run Vitest in watch mode           |
| `bun run lint`       | ESLint                             |
| `bun run format`     | Prettier, writes changes in place  |

> Note: as of 2026-09-06, a full `npm install` / `build` / `tsc --noEmit`
> / `lint` / `test` pass (via `npm`, not `bun` - see Prerequisites) is
> clean: 661 packages, build succeeds, zero type errors, zero lint
> errors (8 pre-existing `react-refresh/only-export-components` warnings
> in shadcn/ui primitives and the two context providers - cosmetic,
> not real bugs), and all 159 tests across 11 files pass, including the
> features added later (text-to-speech, breach checking, domain-age
> lookups, the network defense game, account deletion) that had
> previously only had a static review. Worth re-running this before
> every real deploy, not just once - see the CSP comment in
> `src/server.ts` for the one place this most directly affects.

## Project structure

- `src/routes/` - pages and API routes (file-based - read
  `src/routes/README.md` before adding routes)
- `src/components/` - UI, including `components/tools/` for the eight
  security tools
- `src/lib/` - framework-free logic (scoring, hashing, crypto, etc.) and
  its Vitest tests (`*.test.ts`), including `courses-data.ts` (reads) and
  `course-actions.ts` (server-side grading/certificates) for the Courses
  feature
- `src/data/` - static content: topics, lessons, quizzes, tool metadata,
  phishing scenarios
- `src/i18n/locales/` - one file per language; all seven must have
  identical keys (enforced by the `Translations` type) or the build fails
- `supabase/migrations/` - schema, RLS policies, and RPC functions, in
  order
- `plan.md` - current project status and what's still open (not a
  from-scratch spec - the project's already up and running)
- `AGENTS.md` - conventions for AI coding agents working in this repo
