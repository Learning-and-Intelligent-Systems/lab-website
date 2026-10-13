declare module 'bibtex-parse-js' {
  interface Entry {
    citationKey: string;
    entryType: string;
    entryTags?: Record<string, string>;
  }
  const bibtexParse: {
    toJSON(input: string): Entry[];
    toBibtex(entries: Entry[], compact?: boolean): string;
  };
  export default bibtexParse;
}
