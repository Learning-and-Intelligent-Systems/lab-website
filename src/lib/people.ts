import { getCollection, type CollectionEntry } from 'astro:content';

export type Person = CollectionEntry<'people'>;

const lastName = (name: string) => name.replace(/\(.*?\)|“.*?”|".*?"/g, '').trim().split(/\s+/).at(-1) ?? name;

export function byLastName(a: Person, b: Person) {
  return lastName(a.data.name).localeCompare(lastName(b.data.name)) || a.data.name.localeCompare(b.data.name);
}

const normalize = (s: string) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

/** Lookup from normalized name to person, for linking publication authors to people pages. */
export async function peopleByName(): Promise<Map<string, Person>> {
  const people = await getCollection('people', (p) => p.data.role !== 'pet');
  return new Map(people.flatMap((p) => [p.data.name, ...p.data.aliases].map((n) => [normalize(n), p] as const)));
}

export function findPerson(map: Map<string, Person>, author: string): Person | undefined {
  return map.get(normalize(author.replace(/\*/g, '')));
}
