# pesatone-web (Frontend)

Next.js (App Router) · TypeScript · Tailwind CSS — the public web app where fans
discover creators and send gifts.

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
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL (e.g. `http://localhost:9093`) |
| `NEXT_PUBLIC_FLUTTER_WAVE_KEY` | Flutterwave public key for card checkout |

`.env` is gitignored — never commit it.

## 2. Install
```bash
pnpm install
```

## 3. Run (dev)
```bash
pnpm dev                  # http://localhost:3000
```

## 4. Build & run (production)
```bash
pnpm build                # production build
pnpm start                # serve the build on :3000
pnpm lint                 # eslint
```

## 5. Test
```bash
pnpm test                 # run all tests (vitest)
pnpm test <file>          # run a single test file
```

## 6. Test report (coverage)
```bash
pnpm test -- --coverage   # runs tests + generates the coverage report
```
- **Coverage report:** `coverage/index.html` (open in a browser; Print → Save as PDF to share)
- The 80% coverage thresholds are configured in `vitest.config.ts`.

Current suite: **23 tests** across 6 files.
