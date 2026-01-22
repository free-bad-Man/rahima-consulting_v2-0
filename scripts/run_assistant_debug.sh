#!/usr/bin/env bash
set -euo pipefail
# Simple helper to run the assistants-debug endpoint and persist output for daily use
PORT=${1:-3002}
OUT_DIR=${2:-/root/dev/logs}
mkdir -p "$OUT_DIR"
TS=$(date +%s)
OUT_FILE="${OUT_DIR}/assist_debug_${TS}.json"
curl -sS -X POST "http://localhost:${PORT}/api/ai/assistants-debug" -H "Content-Type: application/json" -d '{}' -m 60 -o "$OUT_FILE" || {
  echo "Request failed"
  exit 1
}
ln -sf "$OUT_FILE" "${OUT_DIR}/assist_debug_latest.json"
echo "Saved debug output to $OUT_FILE"
cat "$OUT_FILE"


