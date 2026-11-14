# ICAS Website

A responsive, multi-page website for **ICAS (International Center for Applied
Science)**, a MAHE constituent offering a 2+2 engineering pathway: two years in
Manipal followed by two years at a partner university abroad. The site covers
academics, admissions, transfer options, research, student life and events. It
also includes a **demo student portal** and an interactive **world map of
partner universities**.

It is a single-page React app served by a small Express server. All content is
static sample data stored in the repo, so it runs without a database.

## Features

- **Public site**: 15 content pages, among them Academics (curricula,
  timetable, academic calendar), Admissions & Aid, Transfer (2+2), Research,
  Student Life, the ENIGMA student club, News, Events, Faculty, Financial and
  Medical Aid, Impact and Contact.
- **Partner university map**: a Leaflet world map of 100+ partner
  universities. Click a marker to see how many ICAS alumni went there
  (aggregate counts only).
- **Demo student portal** (`/portal`): sign-in, dashboard with deadlines,
  courses, grades and announcements, and per-course assignment submission.
  Submissions are saved in the browser's `localStorage`.
- **"Ask ICAS" navigator**: a keyword-based assistant that suggests pages
  matching a free-text question.
- **Light/dark theme** that follows the system setting by default, with a
  toggle. The choice is remembered and applied before first paint.
- **Accessibility basics**: skip link, labelled form fields, keyboard-usable
  menus and dialogs, live regions for status messages.
- **Performance**: each route is code-split and lazy-loaded with a loading
  fallback and an error boundary. Leaflet is only loaded on the Transfer page.

> [!IMPORTANT]
> The portal login exists **for demonstration only**. Demo accounts are stored
> in client-side code (`client/data/sample.ts`) and the session lives in
> `localStorage`, so it provides no real security. Connect a real auth backend
> before handling any real student data.

Demo accounts (password `icas123`): `student@icas.edu`, `prof@icas.edu`,
`admin@icas.edu`.

The Contact and Newsletter forms show a confirmation message but do not send
data anywhere yet.

## Tech stack

| Area      | Tools                                                                 |
| --------- | --------------------------------------------------------------------- |
| Frontend  | React 18, React Router 6, TypeScript (strict), Vite 7                 |
| Styling   | Tailwind CSS 3, `@tailwindcss/typography`, shadcn/ui on Radix UI      |
| UI extras | Leaflet (map), Embla (carousel), Recharts, Sonner (toasts), Lucide    |
| Server    | Express 5 (API + static hosting), `serverless-http` for Netlify       |
| Quality   | Vitest, Testing Library + jsdom, ESLint (typescript-eslint), Prettier |
| Tooling   | pnpm, Node.js ≥ 20.11                                                 |

## Architecture

```
                    ┌──────────────────────────────┐
 Browser ─────────► │  Express app (server/)       │
                    │   /api/*  → JSON routes      │
                    │   static  → dist/spa assets  │
                    │   *       → index.html (SPA) │
                    └──────────────────────────────┘
```

- **Development:** `pnpm dev` runs Vite on port 8080 and mounts the Express API
  (`createServer()`) as middleware, so the UI and `/api/*` share one origin
  with hot reload.
- **Production (Node):** `pnpm build` writes the client bundle to `dist/spa` and
  the server to `dist/server/node-build.mjs`. That server serves the API,
  serves the hashed assets with long-lived caching, and falls back to
  `index.html` for client-side routes.
- **Production (Netlify):** the static bundle is published from `dist/spa`.
  `/api/*` is rewritten to a serverless function (`netlify/functions/api.ts`)
  that wraps the same Express app.

The client needs nothing from the API to render. The API currently exposes
`GET /api/ping` and `GET /api/health`, which serve as the base for future
server-side features such as the contact form or real authentication.

## Getting started

Prerequisites: Node.js 20.11+ and pnpm 10 (`corepack enable` sets up the pinned
version).

```bash
pnpm install
cp .env.example .env   # optional
pnpm dev               # http://localhost:8080
```

## Environment variables

All variables are optional. See [`.env.example`](.env.example).

| Variable       | Default | Description                                    |
| -------------- | ------- | ---------------------------------------------- |
| `PORT`         | `3000`  | Port for the production server (`pnpm start`). |
| `PING_MESSAGE` | `ping`  | Message returned by `GET /api/ping`.           |

Never put secrets in variables prefixed with `VITE_`. Vite inlines those into
the public client bundle.

## Scripts

| Command          | What it does                                         |
| ---------------- | ---------------------------------------------------- |
| `pnpm dev`       | Dev server with HMR (client + API) on port 8080      |
| `pnpm build`     | Production build of client (`dist/spa`) and server   |
| `pnpm start`     | Run the production server (after `pnpm build`)       |
| `pnpm test`      | Run the test suite once (`pnpm test:watch` to watch) |
| `pnpm lint`      | ESLint                                               |
| `pnpm format`    | Format with Prettier (`pnpm format:check` to verify) |
| `pnpm typecheck` | TypeScript type check                                |
| `pnpm check`     | Typecheck, lint, format check and tests in one go    |

## Testing

```bash
pnpm test
```

The suite covers:

- **Auth and redirects** (`client/lib/*.test.ts`): credential checks, session
  storage validation, and protection against open redirects through the login
  `?next=` parameter.
- **Local data** (`client/lib/localdb.test.ts`, `client/data/data.test.ts`):
  submission storage, handling of corrupt or full storage, and sample-data
  integrity.
- **Navigator** (`client/lib/navigator.test.ts`): keyword matching and ranking.
- **Login flow** (`client/pages/PortalLogin.test.tsx`): protected-route
  redirects, sign-in, error states and session restore, rendered in jsdom.
- **Server** (`server/server.test.ts`): API responses, JSON 404s and errors,
  and SPA fallback and caching headers over real HTTP.

## Deployment

### Node server (any host or container)

```bash
pnpm install --frozen-lockfile
pnpm build
PORT=8080 pnpm start
```

`GET /api/health` returns `{"status":"ok","uptime":…}` and can be used for load
balancer health checks. The server shuts down cleanly on `SIGTERM`.

### Netlify

`netlify.toml` already sets the build command (`pnpm build:client`), the
publish directory (`dist/spa`), the functions directory, the `/api/*` rewrite
and the SPA fallback. Connect the repository in Netlify, or run
`netlify deploy --build`.

## Project structure

```
client/                    React SPA
├── App.tsx                App shell: providers, layout, routes
├── routes.tsx             Lazy-loaded route table (protected flag for portal)
├── pages/                 One component per route
├── components/
│   ├── layout/            Header (with mobile menu), Footer, SiteLayout
│   ├── sections/          Reusable page sections (calendar, timetable, …)
│   ├── feedback/          Error boundary and page loader
│   ├── auth/              <Protected> route guard
│   ├── ai/                "Ask ICAS" navigator widget
│   ├── theme/             Theme provider and toggle
│   ├── ui/                shadcn/ui primitives
│   └── UniversityMap.tsx  Leaflet partner map
├── context/AuthContext.tsx Demo auth state
├── data/                  Static site content and partner-university data
├── lib/                   Pure helpers (auth, redirects, storage, navigator)
└── global.css             Tailwind layers and theme tokens
server/
├── index.ts               createServer(): Express app with /api router
├── spa.ts                 Static hosting and SPA fallback
├── node-build.ts          Production entry point
└── routes/                API handlers
shared/
├── api.ts                 Request/response types shared by client and server
└── cms-templates/         JSON Schemas describing content types (news, events, …)
netlify/functions/api.ts   Serverless wrapper around the Express app
```

## Roadmap

- Replace the demo login with real authentication on the server.
- Send Contact and Newsletter submissions to a real backend or email service.
- Load page content from a CMS that follows the schemas in
  `shared/cms-templates/`.
