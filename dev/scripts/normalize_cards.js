#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'data', 'docs');
const MANIFEST_PATH = path.join(DOCS_DIR, 'manifest.json');
const OUT_DIR = path.join(DOCS_DIR, 'normalized');

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return null;
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('Manifest not found:', MANIFEST_PATH);
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const items = Array.isArray(manifest.items) ? manifest.items : [];
  ensureDir(OUT_DIR);
  let processed = 0;
  for (const it of items) {
    const relPath = it.path;
    const absPath = path.join(ROOT, relPath);
    const content = safeRead(absPath);
    if (content === null) {
      // skip binary or unreadable
      continue;
    }
    const normalized = {
      slug: it.slug || path.basename(relPath),
      title: it.title || '',
      access: it.access || 'public',
      price_from: it.price_from || null,
      path: relPath,
      content: content,
    };
    const outFile = path.join(OUT_DIR, `${normalized.slug.replace(/\//g, '_')}.json`);
    try {
      fs.writeFileSync(outFile, JSON.stringify(normalized, null, 2), 'utf-8');
      processed++;
    } catch (e) {
      console.warn('Failed to write normalized file for', relPath, e.message);
    }
  }
  console.log(`Normalized ${processed} items to ${OUT_DIR}`);
}

main();


