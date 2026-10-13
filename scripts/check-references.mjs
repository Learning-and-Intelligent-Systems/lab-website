#!/usr/bin/env node
// Astro only logs a warning for a reference to a missing person or publication, and the build still
// succeeds. This script makes CI fail instead.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { parse } from 'yaml';

const listFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });

const people = new Set(
  listFiles('src/content/people')
    .filter((f) => /\.ya?ml$/.test(f))
    .map((f) => basename(f, extname(f))),
);
const citationKeys = new Set(
  [...readFileSync('src/content/publications.bib', 'utf8').matchAll(/^\s*@\w+\s*\{\s*([^,\s]+)\s*,/gm)]
    .map((m) => m[1]),
);

const errors = [];
const check = (file, field, ids, known, hint) => {
  for (const id of ids ?? []) {
    if (!known.has(id)) errors.push(`${file}: ${field} "${id}" not found (${hint})`);
  }
};

for (const [dir, fields] of [
  ['src/content/blog', ['authors']],
  ['src/content/projects', ['people', 'publications']],
]) {
  for (const file of listFiles(dir).filter((f) => /\.mdx?$/.test(f))) {
    const fm = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const data = parse(fm[1]) ?? {};
    for (const field of fields) {
      field === 'publications'
        ? check(file, field, data[field], citationKeys, 'citation key in src/content/publications.bib')
        : check(file, field, data[field], people, 'file name in src/content/people, without .yaml');
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('All people and publication references resolve.');
