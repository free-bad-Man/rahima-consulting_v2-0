#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'data', 'docs');
const OUT_FILE = path.join(DOCS_DIR, 'manifest.json');

function walkDir(dir) {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of list) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      results.push(...walkDir(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function extractTitle(content, filePath) {
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return path.basename(filePath);
  // For markdown, prefer first heading
  if (filePath.endsWith('.md')) {
    const h = lines.find(l => l.startsWith('#'));
    if (h) return h.replace(/^#+\s*/, '');
  }
  return lines[0].slice(0, 120);
}

function extractPrice(content) {
  const re = /(?:от|ОТ)\s*([0-9\s]{1,20}(?:₽|р|руб)?)/i;
  const m = content.match(re);
  if (m && m[1]) return m[1].trim();
  return null;
}

function makeSlug(filePath) {
  // slug relative to DOCS_DIR, normalize slashes
  const rel = path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
  return rel;
}

function main() {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error('Docs directory not found:', DOCS_DIR);
    process.exit(1);
  }
  const files = walkDir(DOCS_DIR).filter(f => !f.endsWith('manifest.json'));
  const manifest = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(f, 'utf-8');
      const title = extractTitle(content, f);
      const price = extractPrice(content);
      manifest.push({
        path: path.relative(ROOT, f),
        slug: makeSlug(f),
        title,
        access: 'public',
        price_from: price,
      });
    } catch (e) {
      console.warn('Failed to read', f, e.message);
    }
  }
  fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), items: manifest }, null, 2), 'utf-8');
  console.log(`Manifest generated: ${OUT_FILE} (${manifest.length} items)`);
}

main();


