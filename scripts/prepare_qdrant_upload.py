#!/usr/bin/env python3
import json
from pathlib import Path

IN = Path("data/services/generated_services_normalized.json")
OUT = Path("data/qdrant/qdrant_upload.jsonl")

def mk_payload(item):
    meta = {
        "service_code": item.get("service_code"),
        "title": item.get("title"),
        "slug": item.get("slug"),
        "price_display": item.get("price_display"),
        "price_from": item.get("price_from"),
        "tags": item.get("tags",[]),
        "source_doc": item.get("source_doc"),
    }
    return {"id": item.get("slug"), "text": item.get("full_text",""), "payload": meta}

def main():
    data = json.loads(IN.read_text(encoding="utf-8"))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as fh:
        for item in data:
            # use ensure_ascii=True to avoid non-ascii bytes in JSONL lines and ensure ASCII-safe JSONL
            fh.write(json.dumps(mk_payload(item), ensure_ascii=True) + "\n")
    print("Wrote", OUT)

if __name__ == "__main__":
    main()


