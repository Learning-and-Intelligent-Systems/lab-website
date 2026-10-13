import { getCollection } from 'astro:content';

/** Drafts show in `npm run dev` and in PR previews, never in the production build. */
const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === 'true';

export async function getPosts() {
  const posts = await getCollection('blog', (p) => showDrafts || !p.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const projects = await getCollection('projects', (p) => showDrafts || !p.data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
