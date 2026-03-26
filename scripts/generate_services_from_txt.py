#!/usr/bin/env python3
import json
import os
import re
from pathlib import Path

OUT = Path("data/services/generated_services.json")


def pick_source_dir() -> Path:
    candidates = []

    env_dir = os.getenv("SERVICES_SRC_DIR", "").strip()
    if env_dir:
        candidates.append(Path(env_dir))

    candidates.extend([
        Path("data/services/raw_txt"),
        Path("data/services/txt"),
        Path("data/services/source_txt"),
        Path("/root/dev/tmp/ragpdf_texts"),
    ])

    for candidate in candidates:
        if candidate.exists() and candidate.is_dir():
            return candidate

    raise FileNotFoundError(
        "Не найден каталог с исходными TXT. "
        "Укажи SERVICES_SRC_DIR или создай один из каталогов: "
        "data/services/raw_txt, data/services/txt, data/services/source_txt"
    )


def clean_text(text: str) -> str:
    if not text:
        return ""
    return (
        text.replace("\ufeff", "")
        .replace("\u200b", "")
        .replace("\u200c", "")
        .replace("\u200d", "")
        .replace("\f", "")
        .replace("\r", "")
        .replace("\xa0", " ")
    )


def clean_line(text: str) -> str:
    text = clean_text(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def split_lines(text: str) -> list[str]:
    return [clean_line(line) for line in clean_text(text).splitlines()]


def first_non_empty(lines: list[str], default: str = "") -> str:
    for line in lines:
        if line:
            return line
    return default


def parse_price_value(text: str) -> int | None:
    if not text:
        return None

    patterns = [
        r"(?:от|ОТ)\s*([\d\s]{2,12})\s*(?:₽|руб(?:\.|ля|лей)?)",
        r"(?:цена|стоимость)[^0-9]{0,30}([\d\s]{2,12})\s*(?:₽|руб(?:\.|ля|лей)?)",
        r"([\d\s]{2,12})\s*(?:₽|руб(?:\.|ля|лей)?)",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if not match:
            continue

        raw = re.sub(r"\s+", "", match.group(1))
        if not raw.isdigit():
            continue

        value = int(raw)
        if value > 0:
            return value

    return None


def format_price_display(price_from: int | None) -> str:
    if not price_from:
        return "Цена: ОТ уточнить"
    return f"Цена: ОТ {price_from:,} ₽".replace(",", " ")


def extract_duration(text: str) -> str | None:
    patterns = [
        r"(?:срок(?:и)?(?: выполнения| реализации)?)[^.\n:]{0,20}[:\-]?\s*([^\n.]{3,120})",
        r"(?:выполнение(?: услуги)?)[^.\n:]{0,20}[:\-]?\s*([^\n.]{3,120})",
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            value = clean_line(match.group(1))
            if value:
                return value

    return None


def extract_tagline(text: str, title: str, lines: list[str]) -> str:
    text_no_title = clean_text(text)
    if title:
        text_no_title = re.sub(rf"^\s*{re.escape(title)}\s*", "", text_no_title, count=1, flags=re.IGNORECASE)

    preface_match = re.split(r"1\.\s*Суть услуги", text_no_title, flags=re.IGNORECASE)
    before_sut = clean_line(preface_match[0]) if preface_match else ""

    if before_sut and len(before_sut) >= 60:
        result = before_sut[:220].rstrip(" ,;:-")
        if result:
            return result

    sut_match = re.search(r"1\.\s*Суть услуги\s*([\s\S]+?)(?:\n\s*2\.|\Z)", text_no_title, re.IGNORECASE)
    if sut_match:
        sut_text = clean_line(sut_match.group(1))
        if sut_text:
            sentences = re.split(r"(?<=[.!?])\s+", sut_text)
            result = " ".join(sentences[:2]).strip()
            if len(result) >= 40:
                return result[:220].rstrip(" ,;:-")

    for line in lines[1:6]:
        if not line:
            continue
        if re.match(r"^\d+\.", line):
            continue
        if len(line) < 25:
            continue
        return line[:220].rstrip(" ,;:-")

    return title


def is_heading(line: str) -> bool:
    return bool(re.match(r"^\d+\.\s+", line))


def looks_like_price_or_noise(line: str) -> bool:
    if not line:
        return True
    if re.match(r"^(цена|стоимость)\s*:?\s*$", line, re.IGNORECASE):
        return True
    if re.match(r"^[\d\s]+(?:₽|руб(?:\.|ля|лей)?)?$", line, re.IGNORECASE):
        return True
    return False


def merge_section_items(items: list[str]) -> list[str]:
    merged: list[str] = []
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
        line = clean_line(raw)
        if not line or looks_like_price_or_noise(line):
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

    seen = set()
    result = []
    for item in merged:
        key = item.casefold()
        if key in seen:
            continue
        seen.add(key)
        result.append(item)

    return result


def extract_section(lines: list[str], header_patterns: list[str], stop_patterns: list[str] | None = None) -> list[str]:
    stop_patterns = stop_patterns or []
    start = None

    for i, line in enumerate(lines):
        for pattern in header_patterns:
            if re.match(pattern, line, re.IGNORECASE):
                start = i + 1
                break
        if start is not None:
            break

    if start is None:
        return []

    items: list[str] = []
    for line in lines[start:]:
        if not line:
            continue

        if is_heading(line):
            if any(re.match(pattern, line, re.IGNORECASE) for pattern in stop_patterns):
                break
            if re.match(r"^\d+\.\s+", line):
                break

        items.append(line)

    return merge_section_items(items)


def extract_tags(title: str, text: str) -> list[str]:
    haystack = f"{title} {text}".lower()
    tags = []

    mapping = {
        "бухгалтерия": ["бухгалтер", "отчет", "налог", "учет"],
        "регистрация": ["регистрация", "ип", "ооо", "егрюл"],
        "юриспруденция": ["юрид", "договор", "право", "адрес"],
        "автоматизация": ["автоматизация", "crm", "n8n", "amocrm", "интеграц"],
        "маркетинг": ["маркетинг", "реклам", "контент", "smm"],
    }

    for tag, keywords in mapping.items():
        if any(keyword in haystack for keyword in keywords):
            tags.append(tag)

    return tags


def build_service_from_file(path: Path) -> dict:
    text = path.read_text(encoding="utf-8", errors="ignore")
    lines = [line for line in split_lines(text) if line]

    title = first_non_empty(lines, path.stem)
    price_from = parse_price_value(text)
    includes = extract_section(
        lines,
        [
            r"4\.\s*Что входит",
            r"4\.\s*Что входит в услугу",
            r"3\.\s*Что входит",
        ],
    )
    requirements = extract_section(
        lines,
        [
            r"5\.\s*Необходимые документы",
            r"5\.\s*Документы",
            r"6\.\s*Необходимые документы",
        ],
    )
    excludes = extract_section(
        lines,
        [
            r"4\.\s*Что не входит",
            r"5\.\s*Что не входит",
            r"6\.\s*Что не входит",
        ],
    )
    red_flags = extract_section(
        lines,
        [
            r"7\.\s*Риски",
            r"7\.\s*Красные флаги",
            r"8\.\s*Риски",
        ],
    )

    return {
        "service_code": path.stem.upper(),
        "title": title,
        "slug": path.stem.replace(" ", "-").lower(),
        "short_tagline": extract_tagline(text, title, lines),
        "price_display": format_price_display(price_from),
        "price_from": price_from,
        "currency": "RUB",
        "packages": {},
        "duration_estimate": extract_duration(text),
        "includes": includes,
        "excludes": excludes,
        "requirements": requirements,
        "cta": "Оставить заявку",
        "red_flags": red_flags,
        "tags": extract_tags(title, text),
        "source_doc": path.name,
        "full_text": clean_text(text).strip(),
    }


def main() -> None:
    src_dir = pick_source_dir()
    files = sorted(src_dir.glob("*.txt"))

    if not files:
        raise FileNotFoundError(f"В каталоге {src_dir} нет .txt файлов")

    services = [build_service_from_file(file_path) for file_path in files]

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        json.dumps(services, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(f"Wrote {OUT} entries: {len(services)} from {src_dir}")


if __name__ == "__main__":
    main()