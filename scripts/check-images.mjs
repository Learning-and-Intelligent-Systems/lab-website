#!/usr/bin/env node
// Fails if any image committed under src/ or public/ is larger than the limit.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LIMIT_KB = Number(process.env.IMAGE_LIMIT_KB ?? 1024);
const EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const tooBig = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (EXT.test(name) && stat.size > LIMIT_KB * 1024) tooBig.push([path, Math.round(stat.size / 1024)]);
  }
}
walk('src');
walk('public');

if (tooBig.length) {
  console.error(`Images over ${LIMIT_KB} KB (please resize, e.g. to 1200px wide, before committing):`);
  for (const [path, kb] of tooBig) console.error(`  ${path}: ${kb} KB`);
  process.exit(1);
}
console.log('All images are within the size limit.');
