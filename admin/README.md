# admin-web (Admin Console)

Next.js (App Router) · TypeScript · Tailwind CSS — the internal admin console for
managing users and platform content.

## Prerequisites
- **Node.js 20+**
- **pnpm 10+** (`npm i -g pnpm`)
- The backend API running (default `http://localhost:9093`)

## 1. Configure environment
```bash
cp .env.example .env      # then set the values
```
| Variable | Purpose |
|----------|---------|
| `BASE_URL` | Backend API base URL (e.g. `http://localhost:9093`) |
| `NEXT_PUBLIC_FLUTTER_WAVE_KEY` | Flutterwave public key |

`.env` is gitignored — never commit it.

## 2. Install
```bash
pnpm install
```

## 3. Run (dev)
Run on a different port than the public app so both can run together:
```bash
pnpm dev --port 3001      # http://localhost:3001
```

## 4. Build & run (production)
```bash
pnpm build                # production build
pnpm start --port 3001    # serve the build
pnpm lint                 # eslint
```

## 5. Test / test report
> **No automated tests are configured for this app yet** (there is no `test`
> script in `package.json`). To add the same Vitest setup used by the frontend:
>
> ```bash
> pnpm add -D vitest @vitest/coverage-v8 jsdom @testing-library/react \
>   @testing-library/jest-dom @vitejs/plugin-react
> # add a "test": "vitest run" script and a vitest.config.ts, then:
> pnpm test -- --coverage    # -> coverage/index.html
> ```
