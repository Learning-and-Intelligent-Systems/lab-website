# LIS website

Source for the [Learning & Intelligent Systems Group](https://lis.csail.mit.edu) website, built with
[Astro](https://astro.build). It is a fully static site: content lives in Markdown, YAML and
BibTeX files, and every PR gets a preview link.

**Want to add yourself, a blog post, or a project? See [CONTRIBUTING.md](CONTRIBUTING.md).**

## Local development

Requires Node 22+.

```sh
npm install
npm run dev        # http://localhost:4321, live reload, drafts visible
npm run check      # type-check + validate all content against the schemas
npm run build      # production build into dist/ (drafts hidden)
```

## Layout

```
src/
  content.config.ts      schemas for every content type (the source of truth for allowed fields)
  content/
    people/              one YAML file + photo per person
    blog/                one folder per post (index.md + images)
    projects/            one Markdown file per project
    publications.bib     all publications
  pages/                 routes: /, /people, /publications, /blog, /opportunities
                         (_research/ is on hold: the leading underscore keeps it out of the build)
  components/            Header (logo + nav), Footer, cards
  layouts/               Base page shell, Page layout for Markdown pages
  styles/global.css      colour tokens and typography
public/images/           logos and favicon
scripts/                 `npm run new` scaffolder, image size check
```

## CI and deployment

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | every PR and push to `main` | image size check, `astro check`, build |
| `pr-preview.yml` | PRs | builds with drafts visible and publishes to GitHub Pages under `/pr-preview/pr-N/`; removed when the PR closes |
| `deploy.yml` | push to `main` | builds and rsyncs `dist/` to the CSAIL server over SSH |

One-time setup:

1. **Previews:** Settings → Pages → Source "Deploy from a branch", branch `gh-pages` / root. The `gh-pages` branch is created by the first preview run.
2. **Deploy:** add the `DEPLOY_*` secrets listed at the top of `.github/workflows/deploy.yml`.
3. **Review:** protect `main` (require a PR, a passing `CI` check, and one approval). Optionally add a `CODEOWNERS` file.

Fonts: headings use [Jost](https://fonts.google.com/specimen/Jost), a free font close to the Futura used on the old WordPress theme.
