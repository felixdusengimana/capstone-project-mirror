# pesatone-api (Backend)

Spring Boot 3.2 · Java 17 · PostgreSQL — the REST API for Pesatone (auth, creators,
gifting/payments, wallet, payouts).

## Prerequisites
- **JDK 17**
- **PostgreSQL** running locally (or via Docker, below)
- Maven wrapper (`./mvnw`) is included — no separate Maven install needed

## 1. Configure environment
All settings are read from a local **`.env`** (nothing is hard-coded in
`application.properties`). Create it from the template and fill in the blank
(secret) values:

```bash
cp .env.example .env
# then edit .env and set the payment/email/Cloudinary keys
```

Non-secret defaults (DB host/port, URLs, timeouts) are already filled in
`.env.example`. `.env` is gitignored — never commit it.

## 2. Start PostgreSQL (skip if you already have one)
```bash
docker run --name pesatone-db -e POSTGRES_USER=pesatone \
  -e POSTGRES_PASSWORD='changeme' -e POSTGRES_DB=pesatone \
  -p 5432:5432 -d postgres:16
```

## 3. Build
```bash
./mvnw clean package             # compile + test + jar -> target/pesatone-api-*.jar
./mvnw clean package -DskipTests # build without running tests
```

## 4. Run
```bash
./mvnw spring-boot:run           # dev mode
# or, after building:
java -jar target/pesatone-api-*.jar
```
- API base: `http://localhost:9093`
- Swagger UI: `http://localhost:9093/api-doc.html`

## 5. Test
Tests run on an in-memory **H2** database — no PostgreSQL or Docker required.
```bash
./mvnw test                                 # run all tests
./mvnw test -Dtest=WalletServiceImplTest    # run one test class
```

## 6. Test report (coverage + results)
```bash
./mvnw test jacoco:report        # runs tests, then builds the coverage report
```
- **Coverage report:** `target/site/jacoco/index.html` (open in a browser; Print → Save as PDF to share)
- **Test results (pass/fail):** `target/surefire-reports/` (`.txt` summaries + JUnit `.xml`)

Current suite: **50 tests**, ~24% line coverage.
