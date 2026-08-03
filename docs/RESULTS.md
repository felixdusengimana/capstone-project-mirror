# Results and Analysis

This document evaluates **Pesatone**, a platform that enables audiences to support
Rwandan content creators through familiar payment methods. It distinguishes technical
verification from qualitative feedback and states the limits of the available evidence.

Full write-up: see the capstone report. Walkthrough: [demo video](Mission%20Capstone%20Final%20Demo.mp4).

---

## 1. Evidence used

Feedback received from actual users during development is organized as qualitative
product input around payment access, creator privacy, earnings visibility and language
access. It is used alongside reproducible technical evidence to explain implemented
features and future priorities.

The assessment uses three evidence sources:

| Evidence source | What it establishes |
|---|---|
| Automated tests, type checks and production builds | Whether tested software paths and localization catalogs behave as specified |
| Manual workflow verification and the recorded demonstration | Whether the implemented prototype supports its core end-to-end workflows |
| Qualitative feedback from actual users | Which product concerns and improvements users raised, without quantifying frequency or prevalence |

---

## 2. Functional requirements verified

| FR | Expected behaviour | Result | Evidence |
|---|---|---|---|
| FR-01 | Register and log in with email and password | Pass | Unit tests and manual verification |
| FR-02 | Search and discover creators | Pass | Manual workflow verification |
| FR-03 | Send digital gifts through supported mobile-money rails | Pass | Manual workflow verification and recorded demonstration |
| FR-04 | View earnings, gift history and analytics | Pass | Manual workflow verification and recorded demonstration |
| FR-05 | Record gift transactions | Pass | Manual verification of the implemented transaction flow |
| FR-06 | Avoid exposing a creator's personal contact details publicly | Pass | Manual interface verification |
| FR-07 | Request withdrawal of creator earnings | Pass | Unit tests and manual workflow verification |
| FR-08 | Send an email notification when a gift is received | Pass | Unit test; SMS remains outside the verified implementation |
| FR-09 | Manage user accounts and content through the admin interface | Pass | Manual workflow verification |
| FR-10 | Provide English, Kinyarwanda and French interfaces | Pass | Catalog-parity tests, type check, production build and browser verification |

---

## 3. User feedback and product response

Actual user feedback helped refine the product direction. Users highlighted the value
of familiar local payment methods, creator privacy, clear earnings information and an
accessible interface. These observations support the relevance of the implemented
features, but they do not establish how common each concern is among all Rwandan
creators or supporters.

The current frontend responds to this feedback with creator aliases and public profiles,
earnings and transaction views, and localization in English, Kinyarwanda and French.
Kinyarwanda and French were added across public, authentication, gifting, dashboard,
settings and legal pages. Automated catalog checks confirm structural completeness;
fluent-speaker review remains necessary for sensitive financial and legal terminology.

The project is focused on a Rwanda-based gifting experience that accepts locally used
payment methods, protects creator identity, presents earnings clearly and supports
local-language access. The evaluation is limited to evidence directly related to those
goals.

---

## 4. Assessment against project objectives

| Objective or target | Outcome | Basis |
|---|---|---|
| Define the local creator-gifting problem | Supported, with limitations | Product requirements, secondary research and qualitative user feedback support the direction; no prevalence claim is made |
| Build a Rwanda-focused creator-gifting platform | Achieved as a prototype | Core creator, supporter, payment, privacy, analytics and admin workflows are implemented |
| Verify that the core workflows function | Achieved for the tested prototype | Automated tests, manual workflow checks and the recorded demonstration |
| Internationalize the public frontend | Achieved in software | English, Kinyarwanda and French catalogs, persistence and automated parity validation are implemented |
| TLS and password hashing controls | Implemented | Security configuration and validation checks |
| Pages load within three seconds | Not validated | Local API latency was benchmarked, but browser rendering and production network latency were not measured |
| System Usability Scale score of 70 or higher | Not validated | No formal SUS study was conducted |
| Support 10,000 concurrent users | Not validated | Load tests reached 100 concurrent local clients; that is not evidence of 10,000-user capacity |
| Maintain 99% uptime | Not validated | No production monitoring period was conducted |
| REST API documented with Swagger | Met | Swagger interface is available in the backend |
| Localization | Partially validated | Catalog completeness is automated; fluent linguistic review remains |
| Accessibility | Partially validated | Responsive layouts and labels are implemented; no dedicated accessibility audit was conducted |
| Backend test coverage of 80% | Not met | Approximately 24% line coverage was measured with JaCoCo |

The distinction between “not met,” “partially validated” and “not validated” is
important. Backend coverage was measured and fell below its target. Local API latency
was measured, but that evidence does not validate the browser page-load target.
Usability, 10,000-user concurrency and uptime also remain unverified.

---

## 5. Performance and load-test benchmark

On 3 August 2026, the public read paths were tested locally with ApacheBench 2.3 against
Spring Boot 3.2.4, Java 17.0.19 and PostgreSQL 17.9. The API and database ran on the same
arm64 macOS 26.5.2 computer over loopback. The database contained the application's
seeded master records; creator search returned an empty page. The rate-limit ceiling was
raised only for the benchmark so that throttling did not replace application processing
as the measured constraint.

| Endpoint and scenario | Requests | Concurrent clients | Failed | Requests/second | Mean latency | p95 | p99 | Maximum |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Health baseline | 2,000 | 25 | 0 | 5,741.24 | 4.354 ms | 9 ms | 39 ms | 91 ms |
| Industries read path | 2,000 | 25 | 0 | 4,804.16 | 5.204 ms | 15 ms | 31 ms | 120 ms |
| Creator search | 2,000 | 25 | 0 | 10,280.40 | 2.432 ms | 3 ms | 4 ms | 58 ms |
| Industries burst | 5,000 | 100 | 0 | 10,501.40 | 9.523 ms | 30 ms | 46 ms | 92 ms |
| Creator-search burst | 5,000 | 100 | 0 | 18,970.80 | 5.271 ms | 9 ms | 16 ms | 19 ms |
| Industries sustained run | 400,000 | 100 | 0 | 14,647.16 | 6.827 ms | 15 ms | 34 ms | 177 ms |

All 416,000 measured requests completed without an HTTP transport or response-length
failure reported by ApacheBench. The sustained industries run lasted 27.309 seconds.
For these particular local read paths, increasing concurrency from 25 to 100 did not
push the p95 above 30 ms. This establishes a reproducible development baseline and
shows that the tested API paths remained responsive under the defined local workload.

The benchmark does not establish production scalability. Loopback removes internet and
TLS latency; the seeded database is small; the empty creator result makes creator-search
figures optimistic; and ApacheBench does not model user think time or mixed workflows.
Payment providers, authentication, writes, callbacks, email and browser rendering were
excluded. Consequently, the results neither validate 10,000 simultaneous users nor
prove the full website's three-second page-load objective. Those claims require a
production-like environment, representative data, mixed read/write scenarios and
distributed load generation. The suite and reproduction steps are in
[`performance/`](../performance/README.md).

---

## 6. Limitations and future evaluation

The evidence demonstrates that the prototype and its tested workflows function; it does
not demonstrate long-term adoption, nationwide demand, production-scale reliability or
the statistical preferences of Rwandan creators and supporters. Qualitative feedback is
useful for product improvement but cannot replace a documented research method.

A future evaluation should use a clearly documented process, a validated usability
instrument such as SUS, and anonymized reporting. The load suite should be extended to
a production-like staging environment with realistic creator and transaction volumes,
mixed authenticated read/write workflows, external-provider sandboxes, resource
monitoring and longer soak tests. Accessibility and security audits also remain needed.

---

## 7. Reproducing the technical checks

```bash
cd backend && ./mvnw test
cd backend && ./mvnw jacoco:report
cd frontend && pnpm test
cd frontend && pnpm exec tsc --noEmit
cd frontend && pnpm lint
cd frontend && pnpm build
AB_BIN=/usr/sbin/ab ./performance/run-load-test.sh
RUN_SUSTAINED=1 AB_BIN=/usr/sbin/ab ./performance/run-load-test.sh
```

The JaCoCo report is generated at `backend/target/site/jacoco/index.html`. The frontend
catalog test verifies that English, Kinyarwanda and French contain matching message keys
and interpolation variables. Start the backend with
`RATE_LIMIT_MAX_REQUESTS=1000000` before running the benchmark; this is a test setting,
not a production recommendation. Targets still marked *not validated* require evidence
beyond the current project instrumentation.
