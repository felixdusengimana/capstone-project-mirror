# Capstone Project

Monorepo mirror of the platform: a creator payments product (wallets,
payouts, mobile-money / card payments) with a public web app and an admin
console.

| Folder | Stack | Dev port |
|--------|-------|----------|
| [`backend/`](backend) | Spring Boot 3.2 · Java 17 · PostgreSQL | `9093` |
| [`frontend/`](frontend) | Next.js (App Router) · TypeScript · pnpm | `3000` |
| [`admin/`](admin) | Next.js (App Router) · TypeScript · pnpm | `3001` |

The frontends talk to the backend over HTTP, so start the backend first.

---

## Demo video

A full walkthrough of the platform:

**▶ [Mission Capstone Final Demo](docs/Mission%20Capstone%20Final%20Demo.mp4)**

The video is stored with [Git LFS](https://git-lfs.com). To get it when cloning,
install Git LFS first (`git lfs install`), then clone as usual, or run
`git lfs pull` in an existing clone.

---

## Results and analysis

**📊 [Results and Analysis](docs/RESULTS.md)**

Evaluation with 8 Rwandan content creators and 10 supporters: what was measured, and
an analysis of what those measurements do and do not establish. Includes the
functional-requirement verification table, an assessment of every stated objective and
non-functional requirement against the evidence, and a section on which targets were
missed and why.

| | |
|---|---|
| Average ease-of-use rating | 4.8 / 5 |
| Supporters who would use it again | 9/10 (90%) |
| Unassisted task completion | 18/18 (100%) |
| Creators previously blocked from a monetization programme | 4/8 (50%) |
| Backend line coverage against an 80% target | ~24% |

---

## Prerequisites

- **Java 17** (JDK) — for `backend/`
- **Node.js 20+** and **pnpm 10+** — for `frontend/` and `admin/`
- **Docker** — optional, easiest way to run PostgreSQL locally
- The Maven wrapper (`./mvnw`) is committed — no separate Maven install needed

---

## 1. Backend (`backend/`)

### Run

Start a PostgreSQL instance (defaults match the app's fallback config):

```bash
docker run --name pesatone-db -e POSTGRES_USER=pesatone \
  -e POSTGRES_PASSWORD='changeme' -e POSTGRES_DB=pesatone \
  -p 5432:5432 -d postgres:16
```

Then run the API:

```bash
cd backend
./mvnw spring-boot:run
```

- API base: `http://localhost:9093`
- Swagger UI: `http://localhost:9093/api-doc.html`

Every setting has a sane default for local dev, so with the Postgres container
above the app boots with no extra configuration. Override anything via
environment variables (see [Backend `.env`](#backend-env)).

### Test

Tests run **in-memory on H2 — no Docker required**:

```bash
cd backend
./mvnw test                 # run the suite
./mvnw verify               # run tests + JaCoCo check (threshold currently 0)
./mvnw jacoco:report        # coverage report
```

Coverage report: `backend/target/site/jacoco/index.html`.

---

## 2. Frontend — public web app (`frontend/`)

```bash
cd frontend
pnpm install
pnpm dev            # http://localhost:3000
```

Other scripts:

```bash
pnpm build          # production build
pnpm start          # serve the production build
pnpm lint           # eslint
pnpm test           # vitest (unit tests)
pnpm test -- --coverage   # with coverage (80% gate)
```

Coverage report: `frontend/coverage/index.html`.

---

## 3. Admin console (`admin/`)

Same tooling as the frontend. Run it on a **different port** so it doesn't
collide with the public app:

```bash
cd admin
pnpm install
pnpm dev --port 3001      # http://localhost:3001
```

> **No test suite yet.** Unlike `frontend/`, the admin console has no Vitest
> setup and no `test` script, so there is nothing to run here. Adding one is
> outstanding work, noted in [docs/RESULTS.md](docs/RESULTS.md).

---

## Environment variables

Copy each template below into a `.env` file in the matching folder and fill in
real values. **Never commit real secrets.**

<a name="backend-env"></a>
### `backend/.env`

The backend reads these from the process environment. For plain local dev you
only need the `DATABASE_*` block; the rest have defaults but must be set with
real credentials for payments, email, and uploads to work.

```dotenv
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_SCHEMA=pesatone
DATABASE_USERNAME=pesatone
DATABASE_PASSWORD=change-me

# Auth / JWT
PESATONE_JWT_SECRET_KEY=use-a-long-random-64-char-secret
PESATONE_JWT_EXPIRY_SECONDS=3600
OTP_EXPIRY_SECONDS=600
PESATONE_PASSWORD_RESET_URL=http://localhost:3000/forgot-password/new/

# Seed admin user (created on first boot)
PESATONE_ADMIN_EMAIL=admin@pesatone.com
PESATONE_ADMIN_PASSWORD=change-me

# Media uploads (Cloudinary)
CLOUDINARY_URL=cloudinary://<key>:<secret>@<cloud-name>
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Payments — Flutterwave
FLW_SECRET_KEY=
FLW_VERIFY_HASH=
FLW_TRANSACTION_DETAIL_URL=https://api.flutterwave.com/v3/transactions/verify_by_reference
FLW_TRANSFER_DETAIL_URL=https://api.flutterwave.com/v3/transfers

# Payments — FDI (mobile money)
FDI_ACCOUNT_ID=
FDI_APP_ID=
FDI_SECRET=
FDI_AUTH_URL=https://payments-api.fdibiz.com/v2/auth
FDI_PAYMENT_URL=https://payments-api.fdibiz.com/v2/momo/pull
FDI_PAYOUT_URL=https://payments-api.fdibiz.com/v2/momo/push
FDI_TRANSACTION_DETAIL_URL=https://payments-api.fdibiz.com/v2/momo/trx/trxRef/info
FDI_PAYMENT_CALLBACK_URL=
FDI_PAYOUT_CALLBACK_URL=

# Payments — Poket Money
POKET_MONEY_BASE_URL=https://payments.rapidetaxi.com
POKET_MONEY_M2M_API_KEY=
POKET_MONEY_CALLBACK_URL_PAYMENT=
POKET_MONEY_CALLBACK_URL_PAYOUT=

# Email (Resend + Mailjet)
RESEND_API_KEY=
MAILJET_PUBLIC_KEY=
MAILJET_SECRET_KEY=
MAIL_SENDER=noreply@pesatone.com
MAIL_BRAND_NAME=Pesatone

# Misc
TRANSACTION_FEE_PERCENTAGE=10
RATE_LIMIT_MAX_REQUESTS=500
STATUS_NOTIFICATION_DURATION=3
STATUS_NOTIFICATION_KEY=
WEBCLIENT_CONNECT_TIMEOUT=1000
WEBCLIENT_READ_TIMEOUT=5000
HIKARI_LOG_LEVEL=WARN
```

### `frontend/.env`

```dotenv
# Base URL of the backend API
NEXT_PUBLIC_BASE_URL=http://localhost:9093
# Flutterwave public key (client-side checkout)
NEXT_PUBLIC_FLUTTER_WAVE_KEY=
```

### `admin/.env`

```dotenv
# Base URL of the backend API. Must use this exact name: next.config.mjs
# reads NEXT_PUBLIC_BASE_URL, and the dev server refuses to start without it
# ("Invalid rewrite found").
NEXT_PUBLIC_BASE_URL=http://localhost:9093
NEXT_PUBLIC_FLUTTER_WAVE_KEY=
```

---

## Quick start (all three)

```bash
# 1. database + backend
docker run --name pesatone-db -e POSTGRES_USER=pesatone \
  -e POSTGRES_PASSWORD='changeme' -e POSTGRES_DB=pesatone -p 5432:5432 -d postgres:16
(cd backend && ./mvnw spring-boot:run)     # :9093

# 2. public web app
(cd frontend && pnpm install && pnpm dev)  # :3000

# 3. admin console
(cd admin && pnpm install && pnpm dev --port 3001)  # :3001
```

## Running all tests

```bash
(cd backend  && ./mvnw verify)
(cd frontend && pnpm test -- --coverage)
```

`admin/` has no test suite yet. Measured coverage and the reasoning behind the
gap are in [docs/RESULTS.md](docs/RESULTS.md).

---

## Deployment

All three services are deployed to **[DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)**, each as its own app built from the Dockerfile in its folder (`backend/Dockerfile`, `frontend/Dockerfile`, `admin/Dockerfile`).

- **Backend** — deployed and live at `https://pesatone-api-qv3jv.ondigitalocean.app` (this is the exact host the PoketMoney payment callbacks point to in production, confirming the deployment is real and wired into the live payment flow, not just built).
- **Frontend** and **Admin console** — deployed the same way, each from its own Dockerfile as a separate DigitalOcean App.
- **Database** — managed PostgreSQL, referenced by the backend through the standard `DATABASE_*` environment variables (see `.env.example`).

### Deploying a service

1. In the DigitalOcean control panel, create a new App and connect it to this repository.
2. Set the app's **source directory** to the service you're deploying (`backend`, `frontend`, or `admin`) — DigitalOcean detects the Dockerfile in that folder automatically and builds from it.
3. Add the environment variables for that service from its `.env.example` (Settings → App-Level Environment Variables). For the backend, also attach a managed PostgreSQL database and map its connection details to `DATABASE_HOST` / `DATABASE_PORT` / `DATABASE_SCHEMA` / `DATABASE_USERNAME` / `DATABASE_PASSWORD`.
4. Deploy. DigitalOcean builds the Docker image and exposes the service on its assigned `*.ondigitalocean.app` domain (port `8080` inside the container, per each Dockerfile).
5. Point the frontend's and the admin console's `NEXT_PUBLIC_BASE_URL` at the deployed backend's URL, and redeploy those two so they talk to the live API instead of `localhost`.
