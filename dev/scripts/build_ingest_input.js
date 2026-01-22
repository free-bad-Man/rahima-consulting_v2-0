#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const NORMALIZED_DIR = path.join(ROOT, 'data', 'docs', 'normalized');
const OUT_DIR = path.join(ROOT, 'data', 'services');
const OUT_FILE = path.join(OUT_DIR, 'generated_services_normalized.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  if (!fs.existsSync(NORMALIZED_DIR)) {
    console.error('Normalized dir not found:', NORMALIZED_DIR);
    process.exit(1);
  }
  ensureDir(OUT_DIR);
  const files = fs.readdirSync(NORMALIZED_DIR).filter(f => f.endsWith('.json'));
  const items = [];
  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(NORMALIZED_DIR, f), 'utf-8');
      const obj = JSON.parse(raw);
      items.push({
        slug: obj.slug,
        title: obj.title,
        full_text: obj.content,
        price_from: obj.price_from,
        path: obj.path,
      });
    } catch (e) {
      console.warn('Failed to read normalized file', f, e.message);
    }
  }
  fs.writeFileSync(OUT_FILE, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`Built ingest input: ${OUT_FILE} (${items.length} items)`);
}

main();


