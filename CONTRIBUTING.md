# Contributing to the LIS website

Everything on the site is a plain file in this repo. To change something, edit or add a file and
open a pull request. A bot comments on the PR with a **preview link** within a couple of minutes, so
you can see the change before it goes live. Once a maintainer merges it, it deploys automatically.

You don't need to install anything: all of the steps below work in the GitHub web editor
("Add file" → "Create new file" / "Upload files"). If you'd rather work locally, see the README.

## Add or update yourself

1. Create `src/content/people/<first-last>.yaml`:

   ```yaml
   name: "Jane Doe"
   role: phd                      # pi | postdoc | phd | meng | urop | visiting | staff | other | pet
   website: "https://janedoe.github.io"
   photo: ./jane-doe.jpg
   aliases: ["J. Doe", "Jane Q. Doe"]   # optional: other spellings of your name in publications.bib
   ```

2. Upload your photo next to it as `src/content/people/jane-doe.jpg`. A square-ish headshot of about 600×600 px and under 1 MB works best.
3. Open a PR.

When you graduate, add `alumni: true`. Your entry moves to the Alumni list, grouped by the
`role` you had in the lab.

The file name (without `.yaml`) is your **id**, used to credit you on blog posts and projects.

## Write a blog post

1. Make a folder `src/content/blog/YYYY-MM-short-title/` with an `index.md`:

   ```md
   ---
   title: "Bilevel Planning for Robots: An Illustrated Introduction"
   date: 2026-11-07
   authors: [jane-doe, tomas-lozano-perez]   # people ids
   external_authors:                          # optional, collaborators outside LIS
     - name: Ada Lovelace
       url: https://example.com
   summary: One or two sentences shown on the blog list.
   cover: ./cover.png                         # optional
   draft: true
   ---

   Your post in Markdown. ![Figure 1](./figure1.png)
   ```

2. Put images in the same folder.
3. Open a PR. While `draft: true` is set, the post appears in the PR preview but not on the live site.
   Remove it when you're ready to publish.

Everything after the `---` is regular Markdown: headings, lists, tables, code blocks and quotes all work.

## Add a project

> The Research section is on hold and not built into the site yet (its pages live in
> `src/pages/_research/`; Astro skips folders starting with `_`). Project files are still validated.

Create `src/content/projects/<name>.md`. See `src/content/projects/example-project.md` for every
field. `people` takes people ids and `publications` takes BibTeX citation keys.

## Add publications

Append BibTeX entries to `src/content/publications.bib`. Besides the standard fields, you can add
`url`, `pdf`, `code`, `website` and `doi`; these show up as links. A `note` is shown under the entry
(e.g. `note = {Best Paper Award}`), and any `\href{url}{label}` inside it becomes another link.
Entries are grouped by year and keep their file order within a year, so add new papers at the top.

Authors whose names match someone in `src/content/people` (by `name` or `aliases`) are linked to
their website automatically.

## Post an opening

Edit `src/pages/opportunities.md`.

## If the build fails

The CI check prints which file and field is wrong, for example:

```
people → jane-doe data does not match collection schema.
  role: Invalid option: expected one of "pi"|"postdoc"|"phd"|...
src/content/blog/2026-11-my-post/index.md: authors "jane-doo" not found (file name in src/content/people, without .yaml)
```

## Shortcut for local contributors

```sh
npm run new -- person "Jane Doe" phd
npm run new -- post "My post title"
npm run new -- project "Project name"
```
