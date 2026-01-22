#!/usr/bin/env python3
import json
import re
from pathlib import Path

SRC_DIR = Path("/root/dev/tmp/ragpdf_texts")
OUT = Path("data/services/generated_services.json")

def extract_price(text):
    # look for patterns like "от 5 000 ₽", "5 000 руб", "Цена: 5 000"
    m = re.search(r"от\s*([\d\s\-\–]+)\s*₽", text, re.I)
    if not m:
        m = re.search(r"Цена[:\s]*[:\s]*ОТ\s*([\d\s\-\–]+)\s*₽", text, re.I)
    if not m:
        m = re.search(r"(\d[\d\s\-\–]+)\s*руб", text, re.I)
    if m:
        v = m.group(1).replace(" ", "").replace("\u2013","-")
        try:
            return f"Цена: ОТ {int(re.split(r'[-\–]', v)[0])} ₽"
        except:
            return "Цена: ОТ уточнить"
    return "Цена: ОТ уточнить"

def extract_section(lines, header_patterns):
    start = None
    for i, l in enumerate(lines):
        for pat in header_patterns:
            if re.match(pat, l, re.I):
                start = i + 1
                break
        if start is not None:
            break
    if start is None:
        return []
    items = []
    for l in lines[start:]:
        if re.match(r"\d+\.", l):
            break
        if l.strip():
            items.append(l.strip())
    return items

def main():
    services = []
    if not SRC_DIR.exists():
        print("Source dir not found:", SRC_DIR)
        return
    files = sorted(SRC_DIR.glob("*.txt"))
    for p in files:
        text = p.read_text(encoding="utf-8", errors="ignore")
        lines = [ln.strip() for ln in text.splitlines()]
        title = ""
        for ln in lines:
            if ln:
                title = ln
                break
        slug = p.stem.replace(" ", "-").lower()
        price_display = extract_price(text)
        includes = extract_section(lines, [r"4\.\s*Что входит", r"4\.\s*Что входит в услугу"])
        requirements = extract_section(lines, [r"5\.\s*Необходимые документы", r"5\.\s*Необходимые документы"])
        service = {
            "service_code": p.stem.upper(),
            "title": title or p.stem,
            "slug": slug,
            "short_tagline": lines[1] if len(lines) > 1 else "",
            "price_display": price_display,
            "price_from": None,
            "currency": "RUB",
            "packages": {},
            "duration_estimate": None,
            "includes": includes,
            "excludes": [],
            "requirements": requirements,
            "cta": "Оставить заявку",
            "red_flags": [],
            "tags": [],
            "source_doc": p.name,
            "full_text": text.strip(),
        }
        services.append(service)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(services, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Wrote", OUT, "entries:", len(services))

if __name__ == "__main__":
    main()


