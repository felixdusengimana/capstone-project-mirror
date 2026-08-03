#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:9093}"
REQUESTS="${REQUESTS:-2000}"
CONCURRENCY="${CONCURRENCY:-25}"
STRESS_REQUESTS="${STRESS_REQUESTS:-5000}"
STRESS_CONCURRENCY="${STRESS_CONCURRENCY:-100}"
SUSTAINED_REQUESTS="${SUSTAINED_REQUESTS:-400000}"
RUN_SUSTAINED="${RUN_SUSTAINED:-0}"
AB_BIN="${AB_BIN:-ab}"
USER_AGENT="PesatonePerformanceSuite/1.0"

BASE_URL="${BASE_URL%/}"

if ! command -v "${AB_BIN}" >/dev/null 2>&1; then
  echo "ApacheBench was not found. Install apache2-utils or set AB_BIN to its path." >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required for the readiness check." >&2
  exit 1
fi

curl --fail --silent --show-error \
  --user-agent "${USER_AGENT}" \
  --output /dev/null \
  "${BASE_URL}/actuator/health"

run_case() {
  local name="$1"
  local path="$2"
  local requests="$3"
  local concurrency="$4"
  local output
  local failed_requests
  local non_success_responses

  echo
  echo "${name}: ${requests} requests at concurrency ${concurrency}"
  output="$("${AB_BIN}" -q -k -s 10 \
    -n "${requests}" \
    -c "${concurrency}" \
    -H "User-Agent: ${USER_AGENT}" \
    "${BASE_URL}${path}")"
  echo "${output}"

  failed_requests="$(echo "${output}" | awk -F: '/Failed requests/ {gsub(/ /, "", $2); print $2}')"
  non_success_responses="$(echo "${output}" | awk -F: '/Non-2xx responses/ {gsub(/ /, "", $2); print $2}')"

  if [[ "${failed_requests:-0}" != "0" || "${non_success_responses:-0}" != "0" ]]; then
    echo "${name} failed: transport/length failures or non-2xx responses were recorded." >&2
    return 1
  fi
}

"${AB_BIN}" -q -k -s 10 -n 100 -c 5 \
  -H "User-Agent: ${USER_AGENT}" \
  "${BASE_URL}/resources/industries" >/dev/null

run_case "Health baseline" "/actuator/health" "${REQUESTS}" "${CONCURRENCY}"
run_case "Industries read path" "/resources/industries" "${REQUESTS}" "${CONCURRENCY}"
run_case "Creator-search read path" "/users/creators?page=0&size=20" "${REQUESTS}" "${CONCURRENCY}"
run_case "Industries burst" "/resources/industries" "${STRESS_REQUESTS}" "${STRESS_CONCURRENCY}"
run_case "Creator-search burst" "/users/creators?page=0&size=20" "${STRESS_REQUESTS}" "${STRESS_CONCURRENCY}"

if [[ "${RUN_SUSTAINED}" == "1" ]]; then
  run_case "Industries sustained run" "/resources/industries" "${SUSTAINED_REQUESTS}" "${STRESS_CONCURRENCY}"
fi
