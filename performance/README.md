# Performance and load testing

This directory contains a reproducible ApacheBench suite for public, read-only API
paths. It measures HTTP failures, throughput and response-time percentiles at 25 and
100 concurrent clients. The optional sustained scenario sends 400,000 requests at 100
concurrent clients.

## Prerequisites

- A running Pesatone backend and PostgreSQL database
- `curl`
- ApacheBench (`ab`), included with macOS Apache or available in the
  `apache2-utils` package on Ubuntu/Debian

Start the backend with a test-only rate limit high enough for the benchmark:

```bash
cd backend
RATE_LIMIT_MAX_REQUESTS=1000000 ./mvnw spring-boot:run
```

Do not use that elevated rate limit as a production recommendation. It isolates API
processing capacity from the application's request-throttling policy.

## Run

From the repository root:

```bash
./performance/run-load-test.sh
```

On macOS, if `ab` is not on the shell path:

```bash
AB_BIN=/usr/sbin/ab ./performance/run-load-test.sh
```

To include the longer sustained scenario:

```bash
RUN_SUSTAINED=1 ./performance/run-load-test.sh
```

The target and workload are configurable:

```bash
BASE_URL=http://127.0.0.1:19093 \
REQUESTS=2000 CONCURRENCY=25 \
STRESS_REQUESTS=5000 STRESS_CONCURRENCY=100 \
SUSTAINED_REQUESTS=400000 RUN_SUSTAINED=1 \
./performance/run-load-test.sh
```

The test intentionally excludes payment initiation, callbacks, email, uploads and
authenticated financial operations. Running those paths would require controlled
provider sandboxes, deterministic test data and cleanup rules. It also does not measure
browser page rendering, TLS/network latency, production uptime or 10,000 simultaneous
users. The measured baseline and its limitations are reported in
[`docs/RESULTS.md`](../docs/RESULTS.md).
