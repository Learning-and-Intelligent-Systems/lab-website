#!/usr/bin/env node
// Scaffold new content:  npm run new -- person "Jane Doe" phd
//                        npm run new -- post "My post title"
//                        npm run new -- project "Project name"
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const ROLES = ['pi', 'postdoc', 'phd', 'meng', 'urop', 'visiting', 'staff', 'pet', 'other'];
const [kind, title, role = 'phd'] = process.argv.slice(2);

const slugify = (s) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function write(path, body) {
  if (existsSync(path)) {
    console.error(`${path} already exists`);
    process.exit(1);
  }
  writeFileSync(path, body);
  console.log(`Created ${path}`);
}

if (!title || !['person', 'post', 'project'].includes(kind)) {
  console.error('Usage: npm run new -- <person|post|project> "<name or title>" [role]');
  process.exit(1);
}

const slug = slugify(title);
const today = new Date().toISOString().slice(0, 10);

if (kind === 'person') {
  if (!ROLES.includes(role)) {
    console.error(`role must be one of: ${ROLES.join(', ')}`);
    process.exit(1);
  }
  write(
    `src/content/people/${slug}.yaml`,
    `name: "${title}"\nrole: ${role}\nwebsite: "https://example.com"\n# photo: ./${slug}.jpg   # add a square-ish photo next to this file\n`,
  );
  console.log(`Add your photo as src/content/people/${slug}.jpg and uncomment the photo line.`);
} else if (kind === 'post') {
  const dir = `src/content/blog/${today.slice(0, 7)}-${slug}`;
  mkdirSync(dir, { recursive: true });
  write(
    `${dir}/index.md`,
    `---\ntitle: "${title}"\ndate: ${today}\nauthors: []   # e.g. [jane-doe]\nsummary: One or two sentences for the blog list.\n# cover: ./cover.png\ndraft: true\n---\n\nWrite here. Put images in this folder and link them as ![alt](./image.png).\n`,
  );
} else {
  write(
    `src/content/projects/${slug}.md`,
    `---\ntitle: "${title}"\nsummary: One or two sentences for the Research page.\n# cover: ./${slug}.jpg\npeople: []\npublications: []\nlinks: []\nstatus: active\ndraft: true\n---\n\nDescribe the project here.\n`,
  );
}
