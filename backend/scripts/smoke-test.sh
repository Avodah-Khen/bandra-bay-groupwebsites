#!/usr/bin/env sh
set -eu
BASE_URL="${BASE_URL:-http://localhost:4000}"
echo "Testing $BASE_URL/api/health"
curl -fsS "$BASE_URL/api/health"
echo
