import fs from 'fs';
import path from 'path';
import { slugify } from './slugify';

export interface Solution {
  slug: string;
  title: string;
  short_tagline: string;
  description: string;
  includes: string[];
  for_whom: string[];
  advantages: string[];
  timeline: string;
  price_display: string;
  price_from: number;
  packages?: Record<string, string>;
}

let cachedSolutions: Solution[] | null = null;

export function getAllSolutions(): Solution[] {
  if (cachedSolutions) {
    return cachedSolutions;
  }

  try {
    const solutionsPath = path.join(process.cwd(), 'data/solutions/solutions.json');
    
    if (fs.existsSync(solutionsPath)) {
      const data = fs.readFileSync(solutionsPath, 'utf-8');
      const solutions = JSON.parse(data) as Solution[];
      
      cachedSolutions = solutions.map(solution => ({
        ...solution,
        slug: solution.slug || slugify(solution.title),
      }));
      
      return cachedSolutions;
    }
  } catch (error) {
    console.error('Error loading solutions:', error);
  }

  return [];
}

export function getSolutionBySlug(slug: string): Solution | null {
  const solutions = getAllSolutions();
  const decodedSlug = decodeURIComponent(slug);
  
  return solutions.find(
    s => s.slug === decodedSlug || 
         s.slug === slug ||
         slugify(s.title) === decodedSlug ||
         slugify(s.title) === slug
  ) || null;
}

