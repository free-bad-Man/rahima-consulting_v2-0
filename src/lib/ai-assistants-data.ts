import fs from 'fs';
import path from 'path';
import { slugify } from './slugify';

export interface AIAssistant {
  slug: string;
  title: string;
  short_tagline: string;
  description: string;
  features: string[];
  use_cases: string[];
  tech_stack: string[];
  integration: string;
  price_display: string;
  price_from: number;
  icon?: string;
}

let cachedAssistants: AIAssistant[] | null = null;

export function getAllAIAssistants(): AIAssistant[] {
  if (cachedAssistants) {
    return cachedAssistants;
  }

  try {
    const assistantsPath = path.join(process.cwd(), 'data/ai-assistants/ai-assistants.json');
    
    if (fs.existsSync(assistantsPath)) {
      const data = fs.readFileSync(assistantsPath, 'utf-8');
      const assistants = JSON.parse(data) as AIAssistant[];
      
      cachedAssistants = assistants.map(assistant => ({
        ...assistant,
        slug: assistant.slug || slugify(assistant.title),
      }));
      
      return cachedAssistants;
    }
  } catch (error) {
    console.error('Error loading AI assistants:', error);
  }

  return [];
}

export function getAIAssistantBySlug(slug: string): AIAssistant | null {
  const assistants = getAllAIAssistants();
  const decodedSlug = decodeURIComponent(slug);
  
  return assistants.find(
    a => a.slug === decodedSlug || 
         a.slug === slug ||
         slugify(a.title) === decodedSlug ||
         slugify(a.title) === slug
  ) || null;
}

