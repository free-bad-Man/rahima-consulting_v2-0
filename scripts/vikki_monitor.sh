#!/bin/sh
LOGDIR=/root/main-app/logs
mkdir -p "$LOGDIR"
ALERT_LOG="$LOGDIR/vikki_alerts.log"
FULL_LOG="$LOGDIR/vikki_full.log"
# Tail docker compose logs for vikki-app and detect error patterns
docker compose logs --no-log-prefix -f vikki-app 2>/dev/null | while IFS= read -r line; do
  echo "$(date -Is) $line" >> "$FULL_LOG"
  echo "$line" | grep -E -i "error|exception|unhandled|❌|OpenAI request failed|stack|fail|panic|traceback" >/dev/null && echo "$(date -Is) ALERT: $line" >> "$ALERT_LOG"
done
