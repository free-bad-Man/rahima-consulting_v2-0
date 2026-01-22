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

export function getAllServices(): Service[] {
  if (cachedServices) {
    return cachedServices;
  }

  try {
    const servicesPath = path.join(process.cwd(), 'data/services/generated_services_normalized.json');
    
    if (fs.existsSync(servicesPath)) {
      const data = fs.readFileSync(servicesPath, 'utf-8');
      const services = JSON.parse(data) as Service[];
      
      // Ensure all services have slugs
      cachedServices = services.map(service => ({
        ...service,
        slug: service.slug || slugify(service.title),
      }));
      
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

