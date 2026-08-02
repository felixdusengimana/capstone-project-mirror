# Results and Analysis

This document evaluates **Pesatone**, a platform that enables audiences to support
Rwandan content creators through familiar payment methods. It distinguishes technical
verification from qualitative feedback and states the limits of the available evidence.

Full write-up: see the capstone report. Walkthrough: [demo video](Mission%20Capstone%20Final%20Demo.mp4).

---

## 1. Evidence used

No formal interviews or controlled participant study were conducted. The project
therefore makes no claims based on participant counts, survey ratings, completion
percentages, or population prevalence. Feedback received from actual users during
development is retained as qualitative product feedback only; it is not presented as a
representative research sample.

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
| Pages load within three seconds | Not validated | No formal performance measurement was conducted |
| System Usability Scale score of 70 or higher | Not validated | No formal SUS study was conducted |
| Support 10,000 concurrent users | Not validated | No load or stress test was conducted |
| Maintain 99% uptime | Not validated | No production monitoring period was conducted |
| REST API documented with Swagger | Met | Swagger interface is available in the backend |
| Localization | Partially validated | Catalog completeness is automated; fluent linguistic review remains |
| Accessibility | Partially validated | Responsive layouts and labels are implemented; no dedicated accessibility audit was conducted |
| Backend test coverage of 80% | Not met | Approximately 24% line coverage was measured with JaCoCo |

The distinction between “not met” and “not validated” is important. Backend coverage
was measured and fell below its target. Performance, usability, concurrency and uptime
targets were not formally measured, so the project cannot honestly claim that they
passed or failed.

---

## 5. Limitations and future evaluation

The evidence demonstrates that the prototype and its tested workflows function; it does
not demonstrate long-term adoption, nationwide demand, production-scale reliability or
the statistical preferences of Rwandan creators and supporters. Qualitative feedback is
useful for product improvement but cannot replace a documented research method.

A future evaluation should recruit consenting creators and supporters through a clearly
documented process, record whether sessions are remote or in person, use a validated
usability instrument such as SUS, and report anonymized results without overstating what
the sample establishes. Performance, accessibility, security and load testing should
also be run with reproducible tools and recorded configurations.

---

## 6. Reproducing the technical checks

```bash
cd backend && ./mvnw test
cd backend && ./mvnw jacoco:report
cd frontend && pnpm test
cd frontend && pnpm exec tsc --noEmit
cd frontend && pnpm lint
cd frontend && pnpm build
```

The JaCoCo report is generated at `backend/target/site/jacoco/index.html`. The frontend
catalog test verifies that English, Kinyarwanda and French contain matching message keys
and interpolation variables. Targets marked *not validated* cannot be reproduced from
the current project because the required formal evaluation or instrumentation was not
performed.
