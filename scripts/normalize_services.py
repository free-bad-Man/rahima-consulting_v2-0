#!/usr/bin/env python3
import json
import re
from pathlib import Path

IN = Path("data/services/generated_services.json")
OUT = Path("data/services/generated_services_normalized.json")


def clean_text(text: str) -> str:
    if not text:
        return ""
    return (
        str(text)
        .replace("\ufeff", "")
        .replace("\u200b", "")
        .replace("\u200c", "")
        .replace("\u200d", "")
        .replace("\xa0", " ")
        .replace("\r", "")
        .replace("\f", "")
    )


def one_line(text: str) -> str:
    return re.sub(r"\s+", " ", clean_text(text)).strip()


def parse_price(value, full_text: str = "") -> tuple[int | None, str]:
    haystack = " ".join([str(value or ""), str(full_text or "")])

    patterns = [
        r"(?:от|ОТ)\s*([\d\s]{2,12})\s*(?:₽|руб(?:\.|ля|лей)?)",
        r"(?:цена|стоимость)[^0-9]{0,30}([\d\s]{2,12})\s*(?:₽|руб(?:\.|ля|лей)?)",
        r"([\d\s]{2,12})\s*(?:₽|руб(?:\.|ля|лей)?)",
    ]

    for pattern in patterns:
        match = re.search(pattern, haystack, re.IGNORECASE)
        if not match:
            continue

        raw = re.sub(r"\s+", "", match.group(1))
        if not raw.isdigit():
            continue

        number = int(raw)
        if number > 0:
            return number, f"Цена: ОТ {format(number, ',').replace(',', ' ')} ₽"

    return None, "Цена: ОТ уточнить"


def extract_description(full_text: str, title: str) -> str:
    if not full_text:
        return title or ""

    text = clean_text(full_text)
    if title:
        text = re.sub(rf"^\s*{re.escape(title)}\s*", "", text, count=1, flags=re.IGNORECASE)

    preface = re.split(r"1\.\s*Суть услуги", text, flags=re.IGNORECASE)
    before_sut = one_line(preface[0]) if preface else ""
    if before_sut and len(before_sut) >= 60:
        return before_sut[:220].rstrip(" ,;:-")

    sut_match = re.search(r"1\.\s*Суть услуги\s*([\s\S]+?)(?:\n\s*2\.|\Z)", text, re.IGNORECASE)
    if sut_match:
        sut = one_line(sut_match.group(1))
        if sut:
            sentences = re.split(r"(?<=[.!?])\s+", sut)
            description = " ".join(sentences[:2]).strip()
            if description:
                return description[:220].rstrip(" ,;:-")

    fallback = one_line(text)
    return fallback[:220].rstrip(" ,;:-") if fallback else (title or "")


def is_bad_tagline(text: str) -> bool:
    if not text:
        return True

    value = one_line(text)

    if len(value) < 45:
        return True

    if re.match(r"^\d+\.\s*(Суть услуги|Что входит|Стоимость|Цена)", value, re.IGNORECASE):
        return True

    if value.endswith(":"):
        return True

    return False


def merge_items(items: list[str]) -> list[str]:
    if not items:
        return []

    merged = []
    current = ""

    def starts_new_item(line: str) -> bool:
        if not line:
            return False
        if re.match(r"^[а-яa-z]", line):
            return False
        if re.match(r"^[А-ЯA-Z][^:]{2,80}:", line):
            return True
        if re.match(r"^[\-\•]\s+", line):
            return True
        if re.match(r"^\d+[\)\.]\s+", line):
            return True
        if re.match(
            r"^(Подготовка|Проверка|Формирование|Разработка|Сопровождение|Организация|Контроль|Сбор|Обновление|Уведомление|Отправка|Регистрация|Постановка|Получение|Консультация|Предоставление|Настройка|Бухгалтерское|Персонифицированные|Отчетность)",
            line
        ):
            return True
        return False

    for raw in items:
        line = one_line(raw)
        if not line:
            continue

        if re.match(r"^(цена|стоимость)\s*:?\s*$", line, re.IGNORECASE):
            continue

        if re.match(r"^[\d\s]+(?:₽|руб(?:\.|ля|лей)?)?$", line, re.IGNORECASE):
            continue

        if not current:
            current = line
            continue

        if starts_new_item(line):
            merged.append(current.strip())
            current = line
        else:
            current = f"{current} {line}".strip()

    if current:
        merged.append(current.strip())

    deduped = []
    seen = set()
    for item in merged:
        key = item.casefold()
        if key in seen:
            continue
        seen.add(key)
        deduped.append(item)

    return deduped


def normalize_item(item: dict) -> dict:
    title = one_line(item.get("title", ""))
    full_text = clean_text(item.get("full_text", ""))

    price_from, price_display = parse_price(
        item.get("price_from") or item.get("price_display"),
        full_text,
    )

    short_tagline = one_line(item.get("short_tagline", ""))
    if is_bad_tagline(short_tagline):
        short_tagline = extract_description(full_text, title)

    normalized = {
        **item,
        "title": title,
        "short_tagline": short_tagline,
        "price_from": price_from,
        "price_display": price_display,
        "duration_estimate": one_line(item.get("duration_estimate", "")) or None,
        "includes": merge_items(item.get("includes", []) or []),
        "excludes": merge_items(item.get("excludes", []) or []),
        "requirements": merge_items(item.get("requirements", []) or []),
        "red_flags": merge_items(item.get("red_flags", []) or []),
        "full_text": full_text.strip(),
    }

    return normalized


def main() -> None:
    if not IN.exists():
        raise FileNotFoundError(f"Не найден файл {IN}")

    data = json.loads(IN.read_text(encoding="utf-8"))
    normalized = [normalize_item(item) for item in data]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(normalized, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Wrote {OUT} entries: {len(normalized)}")


if __name__ == "__main__":
    main()