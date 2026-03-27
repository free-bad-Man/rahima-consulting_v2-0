import fs from 'fs';
import path from 'path';
import { slugify } from './slugify';

export interface Service {
  slug: string;
  title: string;
  full_text?: string;
  short_tagline?: string;
  price_display?: string;
  price_from?: number | string | null;
  currency?: string;
  packages?: Record<string, string>;
  duration_estimate?: string | null;
  includes?: string[];
  excludes?: string[];
  requirements?: string[];
  cta?: string;
  red_flags?: string[];
  tags?: string[];
  source_doc?: string;
  service_code?: string;
  path?: string;
}

let cachedServices: Service[] | null = null;

function cleanInlineText(text: string): string {
  if (!text) return '';

  return text
    .replace(/[\u200B-\u200D\uFEFF\f]/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/[\uFFFD\u25A1\u25A0\u2610]/g, '')
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?)])/g, '$1')
    .trim();
}

function cleanRichText(text: string): string {
  if (!text) return '';

  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/[\uFFFD\u25A1\u25A0\u2610]/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\f/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/([.!?])\s+(?=\d+\.\s*[А-ЯA-ZЁ])/g, '$1\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function dedupeStrings(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of items) {
    const value = cleanInlineText(item);
    if (!value) continue;

    const key = value.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(value);
  }

  return result;
}

function mergeSectionItems(items: string[]): string[] {
  if (!items || items.length === 0) return [];

  const merged: string[] = [];
  let currentItem = '';

  const startsNewItem = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return false;

    if (/^[а-яa-z]/.test(trimmed)) return false;
    if (/^[А-ЯA-Z][^:]{2,80}:/.test(trimmed)) return true;
    if (/^[\d\-•]\s/.test(trimmed)) return true;
    if (/^\d+[.)]\s/.test(trimmed)) return true;
    if (
      /^(Для|При|Подготовка|Проверка|Формирование|Разработка|Сопровождение|Организация|Контроль|Сбор|Обновление|Уведомление|Отправка|Регистрация|Постановка|Получение|Консультация|Предоставление|Настройка|Бухгалтерское|Персонифицированные|Отчетность)/.test(
        trimmed,
      )
    ) {
      return true;
    }

    return false;
  };

  for (const rawItem of items) {
    const item = cleanInlineText(rawItem);

    if (!item) continue;
    if (/^(Цена|Стоимость)\s*:?\s*$/i.test(item)) continue;
    if (/^\d+[\s\d]*\s*(₽|руб\.?|рубля|рублей)?$/i.test(item) && !/\(/.test(item)) continue;

    if (!currentItem) {
      currentItem = item;
      continue;
    }

    if (startsNewItem(item)) {
      merged.push(currentItem.trim());
      currentItem = item;
    } else {
      currentItem += ` ${item}`;
    }
  }

  if (currentItem) {
    merged.push(currentItem.trim());
  }

  return dedupeStrings(merged);
}

function extractPriceFromText(fullText: string): number | null {
  if (!fullText) return null;

  const patterns = [
    /(?:от|ОТ)\s*(\d[\d\s]{1,12})\s*(?:₽|руб(?:\.|ля|лей)?)/i,
    /(?:цена|стоимость)[^0-9]{0,30}(\d[\d\s]{1,12})\s*(?:₽|руб(?:\.|ля|лей)?)/i,
    /(\d[\d\s]{1,12})\s*(?:₽|руб(?:\.|ля|лей)?)/i,
  ];

  for (const pattern of patterns) {
    const match = fullText.match(pattern);
    if (!match?.[1]) continue;

    const price = parseInt(match[1].replace(/\s+/g, ''), 10);
    if (!Number.isNaN(price) && price > 0) {
      return price;
    }
  }

  return null;
}

function extractDescription(fullText: string, title: string): string {
  if (!fullText) return '';

  let text = cleanRichText(fullText);

  if (title) {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    text = text.replace(new RegExp(`^\\s*${escapedTitle}\\s*`, 'i'), '');
  }

  const oneLineText = cleanInlineText(text);
  const beforeSut = oneLineText.split(/1\.\s*Суть услуги/i)[0];
  if (beforeSut && beforeSut.length >= 60) {
    return cleanInlineText(beforeSut).substring(0, 220).trim();
  }

  const sutMatch = oneLineText.match(/1\.\s*Суть услуги\s*([\s\S]+?)(?:\s*2\.|$)/i);
  if (sutMatch?.[1]) {
    const sutText = cleanInlineText(sutMatch[1]);
    const sentences = sutText.split(/(?<=[.!?])\s+/);
    const description = sentences.slice(0, 2).join(' ').trim();
    if (description) {
      return description.substring(0, 220).trim();
    }
  }

  return cleanInlineText(oneLineText).substring(0, 220).trim();
}

function isBadDescription(description: string): boolean {
  const value = cleanInlineText(description);

  if (!value) return true;
  if (value.length < 45) return true;
  if (/^\d+\.\s*(Суть услуги|Что входит|Стоимость|Цена)/i.test(value)) return true;
  if (value.endsWith(':')) return true;

  return false;
}

function loadServicesFile(): string | null {
  const candidates = [
    path.join(process.cwd(), 'data/services/generated_services_normalized.json'),
    path.join(process.cwd(), 'data/services/generated_services.json'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function getAllServices(): Service[] {
  if (cachedServices) {
    return cachedServices;
  }

  try {
    const servicesPath = loadServicesFile();
    if (!servicesPath) return [];

    const data = fs.readFileSync(servicesPath, 'utf-8');
    const services = JSON.parse(data) as Service[];

    cachedServices = services
      .filter((service) => service.title && service.title.length > 2)
      .map((service) => {
        const fullText = cleanRichText(service.full_text || '');
        const title = cleanInlineText(service.title || '');

        let description = cleanInlineText(service.short_tagline || '');
        if (isBadDescription(description)) {
          description = extractDescription(fullText, title);
        }

        const numericPrice =
          typeof service.price_from === 'number'
            ? service.price_from
            : extractPriceFromText(fullText);

        const priceDisplay =
          service.price_display && cleanInlineText(service.price_display)
            ? cleanInlineText(service.price_display)
            : numericPrice
              ? `Цена: ОТ ${numericPrice.toLocaleString('ru-RU')} ₽`
              : 'Цена: ОТ уточнить';

        return {
          ...service,
          slug: service.slug || slugify(title),
          title,
          full_text: fullText,
          short_tagline: description,
          price_from: numericPrice,
          price_display: priceDisplay,
          duration_estimate: cleanInlineText(service.duration_estimate || '') || null,
          includes: mergeSectionItems(service.includes || []),
          excludes: mergeSectionItems(service.excludes || []),
          requirements: mergeSectionItems(service.requirements || []),
          red_flags: mergeSectionItems(service.red_flags || []),
          tags: dedupeStrings(service.tags || []),
        };
      });

    return cachedServices;
  } catch (error) {
    console.error('Error loading services:', error);
  }

  return [];
}

export function getServiceBySlug(slug: string): Service | null {
  const services = getAllServices();
  const decodedSlug = decodeURIComponent(slug);

  return (
    services.find(
      (s) =>
        s.slug === decodedSlug ||
        s.slug === slug ||
        slugify(s.title) === decodedSlug ||
        slugify(s.title) === slug,
    ) || null
  );
}

export function getServicesByCategory(category: string): Service[] {
  const services = getAllServices();

  const categoryMap: Record<string, string[]> = {
    бухгалтерия: ['бухгалтер', 'учет', 'отчет', 'налог'],
    регистрация: ['регистрация', 'ип', 'ооо', 'егрюл'],
    юриспруденция: ['юрид', 'право', 'договор', 'закупк', 'адрес'],
    автоматизация: ['автоматизация', 'crm', 'n8n', 'amocrm'],
    маркетинг: ['маркетинг', 'smm', 'реклам', 'контент'],
  };

  const keywords = categoryMap[category.toLowerCase()] || [category.toLowerCase()];

  return services.filter((service) => {
    const searchText =
      `${service.title} ${service.short_tagline || ''} ${service.tags?.join(' ') || ''}`.toLowerCase();

    return keywords.some((keyword) => searchText.includes(keyword));
  });
}

export function getFeaturedServices(limit = 6): Service[] {
  const services = getAllServices();

  return services
    .sort((a, b) => {
      if (a.price_from && !b.price_from) return -1;
      if (!a.price_from && b.price_from) return 1;
      return 0;
    })
    .slice(0, limit);
}