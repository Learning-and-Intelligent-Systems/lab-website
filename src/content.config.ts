import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { bibtexLoader } from './lib/bibtex-loader';

export const ROLES = {
  pi: 'Principal Investigators',
  postdoc: 'Postdoctoral Associates',
  phd: 'PhD Students',
  meng: 'MEng Students',
  urop: 'UROP Students',
  visiting: 'Visiting Researchers',
  staff: 'Staff',
  pet: 'Furry Friends of the Lab',
  other: 'Other',
} as const;

const link = z.object({ label: z.string(), url: z.url() });

const people = defineCollection({
  loader: glob({ pattern: '*.{yaml,yml}', base: './src/content/people' }),
  schema: ({ image }) =>
    z.strictObject({
      name: z.string(),
      role: z.enum(Object.keys(ROLES) as [keyof typeof ROLES, ...(keyof typeof ROLES)[]]),
      /** Shown under the name for PIs, e.g. "Professor of ..., MIT". */
      title: z.string().optional(),
      website: z.url().optional(),
      /** Square-ish headshot next to the YAML file, e.g. ./jane-doe.jpg */
      photo: image().optional(),
      alumni: z.boolean().default(false),
      /** Other spellings used in publications.bib, e.g. "L. P. Kaelbling", so papers link to you. */
      aliases: z.array(z.string()).default([]),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.strictObject({
      title: z.string(),
      date: z.coerce.date(),
      /** People ids (file names in src/content/people without extension). */
      authors: z.array(reference('people')).default([]),
      /** Co-authors who are not in the people directory. */
      external_authors: z.array(z.object({ name: z.string(), url: z.url().optional() })).default([]),
      summary: z.string(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.strictObject({
      /** "area" pages describe a broad research direction; "project" pages a specific effort. */
      kind: z.enum(['area', 'project']).default('project'),
      title: z.string(),
      summary: z.string(),
      cover: image().optional(),
      people: z.array(reference('people')).default([]),
      /** Citation keys from src/content/publications.bib */
      publications: z.array(reference('publications')).default([]),
      links: z.array(link).default([]),
      status: z.enum(['active', 'past']).default('active'),
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

const publications = defineCollection({
  loader: bibtexLoader('src/content/publications.bib'),
  schema: z.object({
    type: z.string(),
    title: z.string().min(1),
    authors: z.array(z.string()).min(1),
    year: z.number().int(),
    venue: z.string(),
    url: z.url().optional(),
    pdf: z.url().optional(),
    code: z.url().optional(),
    website: z.url().optional(),
    doi: z.string().optional(),
    /** Plain-text part of the BibTeX note, e.g. "Best Paper Award". */
    note: z.string().optional(),
    /** Links taken from \href{url}{label} in the note. */
    links: z.array(link).default([]),
    /** Position in the .bib file; entries keep this order within a year. */
    order: z.number(),
    bibtex: z.string(),
  }),
});

export const collections = { people, blog, projects, publications };
