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
 * Извлекает описание из full_text для услуги
 * Пытается найти текст между заголовком и "1. Суть услуги",
 * если не находит - берет первые 2-3 предложения из "Суть услуги"
 */
function extractDescription(fullText: string, title: string): string {
  if (!fullText) return '';
  
  // Убираем заголовок из начала текста
  let text = fullText.replace(title, '').trim();
  
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

