import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { Loader } from 'astro/loaders';
import bibtexParse from 'bibtex-parse-js';

const ACCENTS: Record<string, Record<string, string>> = {
  "'": { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', c: 'ć', n: 'ń', s: 'ś', z: 'ź', y: 'ý' },
  '`': { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù', A: 'À', E: 'È' },
  '"': { a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü', A: 'Ä', O: 'Ö', U: 'Ü' },
  '^': { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û' },
  '~': { a: 'ã', n: 'ñ', o: 'õ', N: 'Ñ' },
  c: { c: 'ç', C: 'Ç' },
  v: { c: 'č', s: 'š', z: 'ž', r: 'ř', e: 'ě', C: 'Č', S: 'Š', Z: 'Ž' },
};

/** Turn common LaTeX escapes into Unicode and drop grouping braces. */
export function cleanLatex(s: string): string {
  return s
    .replace(/\{?\\([`'"^~cv])\s*\{?\\?([a-zA-Z])\}?\}?/g, (m, acc, ch) => ACCENTS[acc]?.[ch] ?? m)
    .replace(/\\l\b\s*/g, 'ł')
    .replace(/\\([&%#_$])/g, '$1')
    .replace(/--/g, '–')
    .replace(/\\[a-zA-Z]+\s*/g, '') // remaining commands such as \it
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "Last, First and First Last" -> ["First Last", "First Last"] */
function splitAuthors(s: string): string[] {
  return cleanLatex(s)
    .split(/\s+and\s+/)
    .map((a) => {
      const [last, first] = a.split(/,\s*/);
      return first ? `${first} ${last}` : a;
    })
    .filter(Boolean);
}

/** Pull \href{url}{label} and \url{url} out of a note, leaving the plain text. */
function splitNote(note = ''): { text?: string; links: { label: string; url: string }[] } {
  const links: { label: string; url: string }[] = [];
  const rest = note
    .replace(/\\href\{([^}]*)\}\{([^}]*)\}/g, (_, url, label) => (links.push({ label: cleanLatex(label), url }), ''))
    .replace(/\\url\{([^}]*)\}/g, (_, url) => (links.push({ label: 'Link', url }), ''));
  const text = cleanLatex(rest).replace(/^[\s,;.]+|[\s,;]+$/g, '');
  return { text: text || undefined, links };
}

/** Loads every entry of a BibTeX file into a content collection, keyed by citation key. */
export function bibtexLoader(path: string): Loader {
  return {
    name: 'bibtex-loader',
    load: async ({ store, parseData, watcher, logger, config }) => {
      const file = fileURLToPath(new URL(path, config.root));
      const sync = async () => {
        const entries = bibtexParse.toJSON(await readFile(file, 'utf8'));
        store.clear();
        let order = 0;
        for (const entry of entries) {
          if (!entry.entryTags) continue; // @comment / @preamble
          const tags = Object.fromEntries(
            Object.entries(entry.entryTags).map(([k, v]) => [k.toLowerCase(), String(v)]),
          );
          const id = entry.citationKey;
          const note = splitNote(tags.note);
          const data = await parseData({
            id,
            data: {
              type: entry.entryType.toLowerCase(),
              title: cleanLatex(tags.title ?? ''),
              authors: splitAuthors(tags.author ?? ''),
              year: Number(tags.year),
              venue: cleanLatex(tags.journal ?? tags.booktitle ?? tags.school ?? tags.institution ?? tags.publisher ?? tags.howpublished ?? ''),
              url: tags.url,
              pdf: tags.pdf,
              code: tags.code,
              website: tags.website,
              doi: tags.doi,
              note: note.text,
              links: note.links,
              order: order++,
              bibtex: bibtexParse.toBibtex([entry], false).trim(),
            },
          });
          store.set({ id, data });
        }
        logger.info(`Loaded ${store.keys().length} publications`);
      };
      await sync();
      watcher?.add(file);
      watcher?.on('change', (changed) => changed === file && sync());
    },
  };
}
