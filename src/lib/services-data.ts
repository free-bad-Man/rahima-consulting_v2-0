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

/**
 * Очищает текст от невидимых и проблемных символов
 */
function cleanText(text: string): string {
  if (!text) return '';
  
  return text
    // Удаляем невидимые символы, zero-width spaces, BOM
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // Удаляем квадратики и другие placeholder символы
    .replace(/[\uFFFD\u25A1]/g, '')
    // Нормализуем пробелы (заменяем множественные на один)
    .replace(/\s+/g, ' ')
    // Убираем пробелы перед знаками препинания
    .replace(/\s+([,.;:!?)])/g, '$1')
    .trim();
}

/**
 * Склеивает обрезанные строки массива в полные предложения/пункты
 * Если строка не начинается с заглавной буквы, маркера или ключевого слова - склеивает с предыдущей
 */
function mergeIncludesItems(items: string[]): string[] {
  if (!items || items.length === 0) return [];
  
  const merged: string[] = [];
  let currentItem = '';
  
  // Паттерны начала нового пункта
  const startsNewItem = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return false;
    
    // ВАЖНО: Если начинается с маленькой буквы - это ПРОДОЛЖЕНИЕ предыдущего пункта
    if (/^[а-яa-z]/.test(trimmed)) return false;
    
    // Начинается с заглавной буквы и двоеточия (заголовок пункта)
    if (/^[А-ЯA-Z][^:]+:/.test(trimmed)) return true;
    
    // Начинается с маркера (цифра, тире, буллет)
    if (/^[\d\-•]\s/.test(trimmed)) return true;
    
    // Начинается с ключевых слов С ЗАГЛАВНОЙ БУКВЫ
    if (/^(Для|При|Подготовка|Проверка|Формирование|Разработка|Сопровождение|Организация|Контроль|Сбор|Обновление|Уведомление|Отправка|Бухгалтерская|Персонифицированные|Отчетность)/.test(trimmed)) return true;
    
    return false;
  };
  
  for (let i = 0; i < items.length; i++) {
    const item = cleanText(items[i]);
    
    // Пропускаем пустые строки
    if (!item) {
      continue;
    }
    
    // Обрабатываем "Цена:" / "Стоимость:" + число/текст
    if (/^(Цена|Стоимость):\s*$/i.test(item)) {
      // Сохраняем предыдущий пункт перед ценой
      if (currentItem) {
        merged.push(currentItem.trim());
        currentItem = '';
      }
      
      // Ищем следующую строку с ценой (может быть число или текст со скобками)
      if (i + 1 < items.length) {
        const nextItem = cleanText(items[i + 1]);
        
        // Если следующая строка - это уже полное предложение о цене (содержит "рублей", "от", "срок" и т.д.)
        // То используем её как есть, без форматирования
        if (/(?:рубл[ейя]|срок|выполнени[яе]|под ключ)/i.test(nextItem)) {
          merged.push(nextItem);
          i++; // Пропускаем следующую строку
          continue;
        }
        
        // Проверяем на простое число или число с дополнительным текстом в скобках
        if (/^\d+/.test(nextItem)) {
          // Формируем "Цена: {текст} руб." или "Стоимость: {текст} руб."
          const label = item.replace(':', '').trim();
          const priceText = nextItem.replace(/₽/g, '').trim();
          merged.push(`${label}: ${priceText} руб.`);
          i++; // Пропускаем следующую строку
          continue;
        }
      }
      continue;
    }
    
    // Пропускаем одиночные числа (которые не были обработаны как цена)
    // Но сохраняем если есть дополнительный текст в скобках
    if (/^\d+[\s\d]*₽?\s*$/.test(item) && !/\(/.test(item)) {
      continue;
    }
    
    if (startsNewItem(item)) {
      // Сохраняем предыдущий пункт
      if (currentItem) {
        merged.push(currentItem.trim());
      }
      // Начинаем новый
      currentItem = item;
    } else {
      // Продолжаем текущий пункт
      currentItem += ' ' + item;
    }
  }
  
  // Добавляем последний пункт
  if (currentItem) {
    merged.push(currentItem.trim());
  }
  
  return merged;
}

/**
 * Извлекает описание из full_text для услуги
 * Пытается найти текст между заголовком и "1. Суть услуги",
 * если не находит - берет первые 2-3 предложения из "Суть услуги"
 */
function extractDescription(fullText: string, title: string): string {
  if (!fullText) return '';
  
  // Убираем заголовок из начала текста и очищаем от невидимых символов
  let text = cleanText(fullText.replace(title, ''));
  
  // Ищем текст до "1. Суть услуги"
  const beforeSut = text.split(/1\.\s*Суть услуги/i)[0];
  if (beforeSut && beforeSut.length > 50) {
    // Убираем переносы строк и лишние пробелы
    const cleaned = beforeSut.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    // Берем до 200 символов
    return cleaned.length > 200 ? cleaned.substring(0, 200).trim() : cleaned;
  }
  
  // Если не нашли, ищем текст из "Суть услуги"
  const sutMatch = text.match(/1\.\s*Суть услуги\s*\n([\s\S]+?)(?:\n2\.|$)/i);
  if (sutMatch && sutMatch[1]) {
    const sutText = sutMatch[1].replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    // Берем первые 2-3 предложения (до третьей точки)
    const sentences = sutText.split(/\.\s+/);
    const description = sentences.slice(0, 2).join('. ');
    return description.length > 200 ? description.substring(0, 200).trim() : description;
  }
  
  // Fallback: просто первые 150 символов
  return text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 150);
}

export function getAllServices(): Service[] {
  if (cachedServices) {
    return cachedServices;
  }

  try {
    // Use the better structured generated_services.json file
    const servicesPath = path.join(process.cwd(), 'data/services/generated_services.json');
    
    if (fs.existsSync(servicesPath)) {
      const data = fs.readFileSync(servicesPath, 'utf-8');
      const services = JSON.parse(data) as Service[];
      
      // Filter out invalid services and ensure all have proper slugs and descriptions
      cachedServices = services
        .filter(service => service.title && service.title.length > 2)
        .map(service => {
          // Если short_tagline пустой, короткий (меньше 50 символов) или обрезан - извлекаем из full_text
          let description = service.short_tagline || '';
          if (!description || description.length < 50 || !description.trim().match(/[.!?]$/)) {
            description = extractDescription(service.full_text || '', service.title);
          }
          
          return {
            ...service,
            slug: service.slug || slugify(service.title),
            short_tagline: description,
            includes: service.includes ? mergeIncludesItems(service.includes) : [],
            excludes: service.excludes ? mergeIncludesItems(service.excludes) : [],
            requirements: service.requirements ? mergeIncludesItems(service.requirements) : [],
          };
        });
      
      return cachedServices;
    }
  } catch (error) {
    console.error('Error loading services:', error);
  }

  return [];
}

export function getServiceBySlug(slug: string): Service | null {
  const services = getAllServices();
  const decodedSlug = decodeURIComponent(slug);
  
  return services.find(
    s => s.slug === decodedSlug || 
         s.slug === slug ||
         slugify(s.title) === decodedSlug ||
         slugify(s.title) === slug
  ) || null;
}

export function getServicesByCategory(category: string): Service[] {
  const services = getAllServices();
  
  // Map category names to tags or title keywords
  const categoryMap: Record<string, string[]> = {
    'бухгалтерия': ['бухгалтер', 'учет', 'отчет'],
    'регистрация': ['регистрация', 'ип', 'ооо', 'егрюл'],
    'юриспруденция': ['юрид', 'право', 'договор', 'закупк'],
    'автоматизация': ['автоматизация', 'crm', 'n8n', 'amocrm'],
    'маркетинг': ['маркетинг', 'smm', 'реклам', 'контент'],
  };

  const keywords = categoryMap[category.toLowerCase()] || [category.toLowerCase()];
  
  return services.filter(service => {
    const searchText = `${service.title} ${service.short_tagline || ''} ${service.tags?.join(' ') || ''}`.toLowerCase();
    return keywords.some(keyword => searchText.includes(keyword));
  });
}

export function getFeaturedServices(limit = 6): Service[] {
  const services = getAllServices();
  // Return services with price info first, then others
  return services
    .sort((a, b) => {
      if (a.price_from && !b.price_from) return -1;
      if (!a.price_from && b.price_from) return 1;
      return 0;
    })
    .slice(0, limit);
}

