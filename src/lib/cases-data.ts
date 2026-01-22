import fs from 'fs';
import path from 'path';
import { slugify } from './slugify';

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  timeline: string;
  testimonial: {
    author: string;
    text: string;
  };
  tags: string[];
}

let cachedCases: CaseStudy[] | null = null;

export function getAllCases(): CaseStudy[] {
  if (cachedCases) {
    return cachedCases;
  }

  try {
    const casesPath = path.join(process.cwd(), 'data/cases/cases.json');
    
    if (fs.existsSync(casesPath)) {
      const data = fs.readFileSync(casesPath, 'utf-8');
      const cases = JSON.parse(data) as CaseStudy[];
      
      cachedCases = cases.map(caseStudy => ({
        ...caseStudy,
        slug: caseStudy.slug || slugify(caseStudy.title),
      }));
      
      return cachedCases;
    }
  } catch (error) {
    console.error('Error loading cases:', error);
  }

  return [];
}

export function getCaseBySlug(slug: string): CaseStudy | null {
  const cases = getAllCases();
  const decodedSlug = decodeURIComponent(slug);
  
  return cases.find(
    c => c.slug === decodedSlug || 
         c.slug === slug ||
         slugify(c.title) === decodedSlug ||
         slugify(c.title) === slug
  ) || null;
}

