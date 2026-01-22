#!/usr/bin/env python3
import os, json, time, requests, uuid
from pathlib import Path

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY") or os.environ.get("OPENAI_KEY")
QDRANT_URL = os.environ.get("QDRANT_URL", "http://localhost:6333")
COLLECTION = os.environ.get("QDRANT_COLLECTION", "viki_docs")
INPUT = Path("data/services/generated_services_normalized.json")
LOG = Path("backups/ingest_per_item.log")

def embed_openai(text):
    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
    body = {"model": "text-embedding-3-small", "input": text}
    resp = requests.post("https://api.openai.com/v1/embeddings", headers=headers, json=body, timeout=60)
    resp.raise_for_status()
    return resp.json()["data"][0]["embedding"]

def embed_text(text):
    """
    Try local embed server first (EMBED_SERVER_URL), fallback to OpenAI embeddings.
    """
    EMBED_SERVER_URL = os.environ.get("EMBED_SERVER_URL")
    if EMBED_SERVER_URL:
        try:
            url = EMBED_SERVER_URL.rstrip("/") + "/embed"
            resp = requests.post(url, json={"input": text}, timeout=60)
            resp.raise_for_status()
            jr = resp.json()
            # support either {"embedding": [...]} or {"data":[{"embedding": [...]}]}
            if isinstance(jr, dict) and "embedding" in jr:
                return jr["embedding"]
            if isinstance(jr, dict) and "data" in jr and isinstance(jr["data"], list) and len(jr["data"]) > 0 and "embedding" in jr["data"][0]:
                return jr["data"][0]["embedding"]
        except Exception as e:
            # fallback to OpenAI if local server fails
            pass
    # fallback to OpenAI embeddings
    if OPENAI_API_KEY:
        return embed_openai(text)
    raise RuntimeError("No embedding available: embed server failed and OPENAI_API_KEY not set")

def upsert_point(point):
    url = f"{QDRANT_URL.rstrip('/')}/collections/{COLLECTION}/points?wait=true"
    resp = requests.put(url, json={"points": [point]}, timeout=60)
    resp.raise_for_status()
    return resp.json()

def make_id(slug):
    try:
        if isinstance(slug, int) or (isinstance(slug, str) and slug.isdigit()):
            return int(slug)
        try:
            return str(uuid.UUID(str(slug)))
        except:
            return str(uuid.uuid5(uuid.NAMESPACE_URL, str(slug)))
    except:
        return str(uuid.uuid4())

def main():
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with LOG.open("a", encoding="utf-8") as logf:
        logf.write(f"--- ingest run start {time.asctime()} ---\\n")
        if not INPUT.exists():
            logf.write("Input not found: %s\\n" % INPUT)
            return
        data = json.loads(INPUT.read_text(encoding="utf-8"))
        # optional limit for testing: set INGEST_LIMIT environment variable to a positive integer
        try:
            limit_env = int(os.environ.get("INGEST_LIMIT", "0") or "0")
        except:
            limit_env = 0
        if limit_env and limit_env > 0:
            data = data[:limit_env]
        total = len(data)
        total = len(data)
        success = 0
        for idx, item in enumerate(data, start=1):
            slug = item.get("slug") or item.get("title") or str(idx)
            pid = make_id(slug)
            text = (item.get("full_text") or "")[:2000]
            logf.write(f"[{idx}/{total}] processing slug={slug} id={pid}\\n")
            try:
                emb = embed_openai(text)
            except Exception as e:
                logf.write(f"  embed failed for {slug}: {e}\\n")
                # retry a couple times
                ok = False
                for r in range(2):
                    try:
                        time.sleep(1 + r)
                        emb = embed_openai(text)
                        ok = True
                        break
                    except Exception as e2:
                        logf.write(f"    retry {r+1} failed: {e2}\\n")
                if not ok:
                    continue
            payload = {
                "service_code": item.get("service_code"),
                "title": item.get("title"),
                "slug": item.get("slug"),
                "price_display": item.get("price_display"),
                "price_from": item.get("price_from"),
            }
            point = {"id": pid, "vector": emb, "payload": payload}
            try:
                upsert_point(point)
                success += 1
                logf.write(f"  upsert OK for {slug}\\n")
            except Exception as e:
                logf.write(f"  upsert failed for {slug}: {e}\\n")
                # try single retry
                try:
                    time.sleep(0.5)
                    upsert_point(point)
                    success += 1
                    logf.write(f"  upsert retry OK for {slug}\\n")
                except Exception as e2:
                    logf.write(f"  upsert retry failed for {slug}: {e2}\\n")
            # small pause to avoid rate limits
            time.sleep(0.25)
        logf.write(f"Finished: success={success}/{total}\\n")
        logf.write(f"--- ingest run end {time.asctime()} ---\\n")

if __name__ == "__main__":
    main()


