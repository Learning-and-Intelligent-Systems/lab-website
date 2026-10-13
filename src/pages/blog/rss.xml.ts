import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../../lib/content';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  return rss({
    title: 'LIS Group Blog',
    description: 'Posts from the Learning & Intelligent Systems Group at MIT CSAIL.',
    site: new URL(import.meta.env.BASE_URL, context.site),
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `blog/${p.id}/`,
    })),
  });
}
