#!/usr/bin/env python3
import json, re
from pathlib import Path

IN = Path("data/services/generated_services.json")
OUT = Path("data/services/generated_services_normalized.json")

def parse_price(p):
    if not p:
        return None, "Цена: ОТ уточнить"
    s = str(p)
    # find first number (possibly range)
    m = re.search(r"(\d[\d\s\-\–]*)\s*₽", s)
    if not m:
        m = re.search(r"от\s*(\d[\d\s\-\–]*)", s, re.I)
    if m:
        num = m.group(1).replace(" ", "").replace("\u2013","-").replace("\u2014","-")
        try:
            v = int(re.split(r"[-\–]", num)[0])
            display = f"Цена: ОТ {v} ₽"
            return v, display
        except:
            return None, "Цена: ОТ уточнить"
    return None, "Цена: ОТ уточнить"

def main():
    data = json.loads(IN.read_text(encoding="utf-8"))
    for item in data:
        price_display = item.get("price_display") or ""
        price_from = item.get("price_from")
        v, disp = parse_price(price_display if price_display else item.get("full_text",""))
        # fallback to looking inside full_text
        if v is None and item.get("full_text"):
            v2, disp2 = parse_price(item["full_text"])
            v = v2
            disp = disp2 if disp2 else disp
        item["price_from"] = v
        item["price_display"] = disp
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Wrote", OUT)

if __name__ == "__main__":
    main()


