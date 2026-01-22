#!/usr/bin/env python3
import os, json, requests, sys
from pathlib import Path
import uuid

QDRANT_URL = os.environ.get("QDRANT_URL","http://localhost:6333")
EMBED_URL = os.environ.get("EMBED_SERVER_URL","http://localhost:8001")
COLLECTION = os.environ.get("QDRANT_COLLECTION","viki_docs")
INPUT = Path("data/qdrant/qdrant_upload.jsonl")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY") or os.environ.get("OPENAI_KEY")

def embed_text(text):
    # Try local embed server options first
    embed_candidates = []
    if EMBED_URL:
        embed_candidates.append(EMBED_URL.rstrip("/"))
    # common local fallbacks
    embed_candidates.extend(["http://localhost:8001", "http://127.0.0.1:8001", "http://172.17.0.1:8001"])

    for base in embed_candidates:
        try:
            url = base + "/embed"
            resp = requests.post(url, json={"input": text}, timeout=20)
            resp.raise_for_status()
            data = resp.json()
            emb = data.get("embedding") or data.get("data", [{}])[0].get("embedding")
            if emb:
                return emb
        except Exception as e:
            # try next candidate
            # print minimal debug
            print(f"Embed server {base} failed: {e}")
            continue

    # Fallback: use OpenAI embeddings if key available
    if OPENAI_API_KEY:
        try:
            headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
            body = {"model": "text-embedding-3-small", "input": text}
            resp = requests.post("https://api.openai.com/v1/embeddings", headers=headers, json=body, timeout=30)
            resp.raise_for_status()
            j = resp.json()
            emb = None
            if isinstance(j.get("data"), list) and len(j["data"])>0:
                emb = j["data"][0].get("embedding")
            if emb:
                return emb
        except Exception as e:
            print("OpenAI embed failed:", e)

    raise RuntimeError("No embedding available: all embed servers failed and OPENAI_API_KEY not set or failed")

def upsert_batch(points):
    url = f"{QDRANT_URL.rstrip('/')}/collections/{COLLECTION}/points?wait=true"
    resp = requests.put(url, json={"points": points})
    resp.raise_for_status()
    return resp.json()

def make_point_id(slug):
    # Qdrant accepts unsigned int or UUID. Create deterministic UUID from slug.
    try:
        # if slug already numeric string, return as int
        if isinstance(slug, int) or (isinstance(slug, str) and slug.isdigit()):
            return int(slug)
        # if slug already a valid uuid string, return as-is
        try:
            u = uuid.UUID(str(slug))
            return str(u)
        except Exception:
            pass
        # otherwise generate deterministic UUID5 using namespace URL
        return str(uuid.uuid5(uuid.NAMESPACE_URL, str(slug)))
    except Exception:
        return str(uuid.uuid4())

def main():
    if not INPUT.exists():
        print("Input JSONL not found:", INPUT); sys.exit(1)
    points = []
    with INPUT.open(encoding="utf-8") as fh:
        for line in fh:
            obj=json.loads(line)
            text=obj.get("text","")
            emb=embed_text(text)
            points.append({"id": obj["id"], "vector": emb, "payload": obj.get("payload",{})})
            if len(points)>=64:
                upsert_batch(points); points=[]
    if points:
        upsert_batch(points)
    print("Ingest completed")

if __name__=="__main__":
    main()


