# Results and Analysis

Evaluation of **Pesatone**, a platform for direct audience support of Rwandan content
creators over mobile-money rails. This document reports what was measured, and analyses
what the measurements do and do not establish.

Full write-up: see the capstone report. Walkthrough: [demo video](Mission%20Capstone%20Final%20Demo.mp4).

---

## 1. How the evaluation was run

Exploratory task-based evaluation with structured user feedback, conducted in Kigali
and several other Rwandan towns. Every participant completed a hands-on prototype
walkthrough before providing ratings and open feedback.

| Instrument | Participants | Analysis |
|---|---|---|
| Creator workflow and structured feedback | 8 Rwandan content creators | Descriptive grouping of feedback and ratings |
| Supporter workflow and structured feedback | 10 supporters (fans) | Descriptive statistics |
| Acceptance testing, 4 core tasks | all 18 participants | Task completion, unassisted |

Tasks: register and log in, discover a creator, send a gift, view earnings.

---

## 2. Functional requirements verified

| FR | Expected behaviour | Result | Evidence |
|---|---|---|---|
| FR-01 | Register / log in with email and password | Pass | Unit tests + acceptance testing |
| FR-02 | Search and discover creators by name or category | Pass | Manually verified |
| FR-03 | Send digital gifts via PoketMoney (MTN / Airtel) | Pass | Acceptance testing (10/10 supporters) |
| FR-04 | Creator dashboard: earnings, gift history, analytics | Pass | Manually verified |
| FR-05 | Gift transactions recorded and stored securely | Pass | Manually verified |
| FR-06 | Creator's personal contact details never publicly exposed | Pass | Manually verified |
| FR-07 | Creators request withdrawals of earnings | Pass | Unit tests (9) + acceptance testing |
| FR-08 | Email notification on gift received | Pass | Unit test |
| FR-09 | Admin manages user accounts and content | Pass | Manually verified |
| FR-10 | English, Kinyarwanda and French frontend | Pass | Catalog tests, type check, production build and browser verification; implemented after user-feedback sessions |

---

## 3. Measured results

### 3.1 Ease of use and task completion

| Metric | Result |
|---|---|
| Supporters rating finding a creator and sending a gift as easy or very easy | 10/10 (100%) |
| Supporters giving the maximum rating (5, very easy) | 8/10 (80%) |
| Average ease-of-use rating (1 to 5) | **4.8 / 5** |
| Creators reporting profile setup was easy or intuitive | 8/8 (100%) |
| Creators flagging withdrawal as needing fewer steps | 2/8 (25%) |

### 3.2 Trust and security perceptions

| Metric | Result |
|---|---|
| Creators concerned about sharing their phone number or payment details | 5/8 (62.5%) |
| Creators reporting an actual fraud, scam or harassment incident | 2/8 (25%) |
| Supporters' average rating of how much security concerns affect their willingness | 4.0 / 5 |
| Creators naming a trusted local mobile-money partnership as decisive | 4/8 (50%) |

### 3.3 Feature fit and most-requested feature

| Metric | Result |
|---|---|
| Creators requesting QR-code based gifting | **8/8 (100%)** |
| Supporters naming QR code / instant confirmation as their top feature | 4/10 (40%) |
| Creators requesting an earnings or analytics dashboard | 4/8 (50%) |

### 3.4 Engagement and willingness to support

| Metric | Result |
|---|---|
| Creators previously blocked from a monetization programme | **4/8 (50%)** |
| Supporters who had previously supported a creator financially | 5/10 (50%) |
| Supporters preferring mobile money (MTN / Airtel) | 8/10 (80%) |
| Creators preferring mobile money to receive funds | 5/8 (62.5%) |
| Average supporter willingness to support a creator (1 to 5) | 4.2 / 5 |
| Supporters who would use the platform again | **9/10 (90%)** yes, 1/10 maybe, 0 no |

---

## 4. Analysis

Section 3 above reported what was observed during evaluation. This section analyses those observations. It assesses each result against the objectives and requirements stated in the project proposal, explains why the observed outcomes took the particular form they did, identifies the targets the project failed to meet and the reasons for those shortfalls, and relates the findings to the declared project scope.

### 4.1 Achievement against stated objectives and requirements

The project defined four specific objectives and eight non-functional requirements. The table below assesses each against the evidence actually gathered. The assessment distinguishes targets that were met, targets that were measured and missed, and targets that were never measured and therefore cannot be claimed in either direction.

| Stated target | Outcome | Basis for the assessment |
|---|---|---|
| **Objective 1** establish why existing support channels fail in Rwanda | Achieved | 4/8 creators previously excluded; mobile money preferred by 80% of supporters and 62.5% of creators; privacy concerns raised unprompted |
| **Objective 2** build a platform addressing those failures | Achieved | FR-01 to FR-10 verified; identity protection, discovery, verification, earnings records and frontend localization implemented |
| **Objective 3** evaluate whether the failures were resolved | Partially achieved | Task completion, ease of use and reuse intent measured; the specified usability instrument was not administered |
| **Objective 4** internationalize the public frontend | Achieved in software | English, Kinyarwanda and French catalogs, persistence, validation, metadata and locale-aware formatting implemented; fluent review and localized user evaluation remain |
| NFR-01 TLS 1.3, bcrypt hashing | Met | Implemented and exercised in validation testing |
| NFR-02 pages load within 3 s | **Not validated** | No load-time instrumentation was ever applied |
| NFR-03 SUS score of 70+ | **Not met** | SUS never administered; a single general item collected instead |
| NFR-04 10,000 concurrent users | **Not validated** | No load or stress testing performed |
| NFR-05 99% uptime | **Not validated** | No monitoring over a defined observation period |
| NFR-06 RESTful API documented with Swagger | Met | Swagger UI exposed and used in integration testing |
| NFR-07 localization | Partially validated | Three complete frontend catalogs and automated parity checks implemented; fluent linguistic review remains |
| NFR-08 accessibility | Partially validated | Responsive layouts, labels and meaningful translated interface text implemented; no dedicated accessibility evaluation |
| Backend test coverage of 80% | **Not met** | ~24% line coverage measured by JaCoCo |
| FR-08 notification on gift received | Partially met | Email verified; SMS gateway modelled but never connected |

The distinction between a target that was not met and one that was not validated is material and is drawn deliberately. Backend test coverage was measured and found to be approximately 24 percent against a stated target of 80 percent: this is a known quantity with a known remedy. By contrast, the concurrent-user ceiling, page-load time and uptime targets were never measured at all. The system may or may not satisfy them, and this project provides no basis for asserting either. Three of the six non-functional requirements fall into this second category, which constitutes the most significant methodological weakness in the evaluation and is discussed further in Section 4.3 below.

### 4.2 Why the observed results took the form they did

The unassisted task-completion rate of 100 percent across all eighteen participants is best explained by the deliberate reuse of interaction patterns the participants already knew. The gifting flow terminates in the standard mobile-money authorisation prompt, in which the supporter confirms the transaction by entering an existing PIN on their own handset. No participant was required to learn an unfamiliar payment gesture, and none was asked to enter card details, which is the step at which card-dependent platforms typically lose Rwandan users. The result therefore reflects the choice of payment rail at least as much as the interface design, and attributing it solely to the latter would overstate what the evaluation shows.

The mean ease-of-use rating of 4.8 out of 5 warrants similar caution. It was collected immediately after a walkthrough conducted in the researcher's presence, a setting known to produce more favourable responses than independent use, and it was captured through a single general satisfaction item rather than a validated instrument. The rating is therefore evidence that participants encountered no obstacle during a supervised first use. It is not evidence of sustained usability over time, and it is not equivalent to the System Usability Scale score specified in NFR-03.

The most analytically significant result is that QR-code distribution was requested independently by all eight creators and by four of the ten supporters, neither group having been prompted toward it. This was not anticipated during design. Interpreted against the five failures set out in the problem statement, the request is a discovery request: creators already distribute handles and links in video descriptions and in physical settings, and a scannable code is the mechanism by which an offline audience reaches an online profile. The finding therefore corroborates discovery as the failure participants felt most acutely, and it does so through an unprompted feature request rather than through a direct question, which makes it less susceptible to the leading-question effects that affect the rating scales.

The finding that four of eight creators had previously been excluded from a monetization programme is the strongest available confirmation that the problem addressed was real rather than assumed. Its analytical weight is nevertheless limited by the sampling method. Participants were selected purposively for direct relevance to creator monetization, so a high incidence of prior exclusion is partly an artefact of who was recruited. The finding establishes that the problem exists and is not rare within the population of interest. It does not establish its prevalence among Rwandan creators generally, and the limitations below should be read with that constraint in mind.

### 4.3 Targets not met, and why

Four distinct kinds of shortfall are present, and they have different causes. The first is a target that was measured and missed: backend test coverage reached approximately 24 percent against a stated 80 percent. The tests that exist concentrate on the highest-risk logic, namely wallet operations, token handling and utility functions, while controller and integration paths remain largely uncovered. A contributing factor was that the JaCoCo enforcement threshold in the build configuration was left at zero, so the build never failed on a coverage shortfall and the gap did not surface during routine development.

The second kind is a requirement that was specified but never instrumented. NFR-02, NFR-04 and NFR-05 state quantitative thresholds for page-load time, concurrent users and uptime, none of which was measured. Establishing them would have required a load-testing harness and a monitoring period, neither of which was set up. The third kind is a requirement that was specified but silently substituted: NFR-03 names the System Usability Scale, a validated ten-item instrument, and the evaluation collected a single general ease-of-use item instead. This was a methodological error rather than a resource constraint, since administering the instrument would have cost little beyond what was already being collected. The fourth is partial delivery: FR-08 was implemented for email but the SMS gateway was modelled and never connected.

In each case the shortfall arose from the same prioritisation. Available time was allocated to building and evaluating functionality rather than to instrumenting and verifying non-functional properties. For a prototype whose purpose was to establish whether the approach works at all, that was a defensible allocation. It nevertheless means that the non-functional claims are, with the exception of NFR-01 and NFR-06, design intentions rather than verified characteristics of the delivered system, and they should be read as such.

### 4.4 Relationship of the results to the project scope

The project was scoped to the design, development and evaluation of a prototype, conducted in Kigali and several other Rwandan towns with a purposive sample of eight creators and ten supporters, comprising four core modules, and explicitly excluding full commercial deployment, nationwide implementation and integration with all global payment systems. The results are consistent with that scope and support conclusions only within it. They demonstrate that the five failures identified in the problem statement can be addressed by the implemented design, and that users drawn from the target population could complete the core tasks and expressed willingness to return.

They do not demonstrate that the platform would retain users over time, that creators would accumulate meaningful income through it, or that it would behave correctly under production load, because none of those questions falls within the scope that was set. The most consequential boundary is between demonstrating that a design resolves a set of identified failures, which this project did, and demonstrating that the resulting product is viable in sustained use, which it did not attempt and which remains the substance of any future work.

---

## 5. Reproducing the measurements

```bash
cd backend && ./mvnw test          # unit tests
cd backend && ./mvnw jacoco:report # coverage -> target/site/jacoco/index.html
cd frontend && pnpm test -- --coverage
```

The localization implementation can be reproduced with the frontend test, type-check,
lint and build commands documented in the root README. The non-functional targets
marked *not validated* above cannot be reproduced because no instrumentation exists for
them; adding it remains future work.
