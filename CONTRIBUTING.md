# Contributing to the LIS website

Everything on the site is a plain file in this repo. To change something, edit or add a file and
open a pull request. A bot comments on the PR with a **preview link** within a couple of minutes, so
you can see the change before it goes live. Once a maintainer merges it, it deploys automatically.

You don't need to install anything: all of the steps below work in the GitHub web editor
("Add file" → "Create new file" / "Upload files"). If you'd rather work locally, see the README.

## Add or update yourself

1. Create `assets/people/<first-last>.yaml`:

   ```yaml
   name: "Jane Doe"
   role: phd                      # pi | postdoc | phd | meng | urop | visiting | staff | other | pet
   website: "https://janedoe.github.io"
   photo: ./jane-doe.jpg
   aliases: ["J. Doe", "Jane Q. Doe"]   # optional: other spellings of your name in publications.yaml
   ```

2. Upload your photo next to it as `assets/people/jane-doe.jpg`. A square-ish headshot of about 600×600 px and under 1 MB works best.
3. Open a PR.

When you graduate, add `alumni: true`. Your entry moves to the Alumni list, grouped by the
`role` you had in the lab.

The file name (without `.yaml`) is your **id**, used to credit you on blog posts.

## Write a blog post

1. Make a folder `content/blog/YYYY-MM-short-title/` with an `index.md`:

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

2. Put images in the same folder. Videos go in `static/media/blog/<post folder>/` and are embedded with
   `<video src="../../media/blog/<post folder>/clip.mp4" autoplay loop muted playsinline></video>`.
3. Open a PR. While `draft: true` is set, the post appears in the PR preview but not on the live site.
   Remove it when you're ready to publish.

Everything after the `---` is regular Markdown: headings, lists, tables, code blocks and quotes all work.
For a caption under a figure, add `<p class="caption">…</p>` right after it.

## Add publications

Add entries to the top of `assets/publications.yaml`:

```yaml
- key: doe2026planning              # unique citation key
  type: inproceedings               # BibTeX entry type
  title: Planning with Learned Abstractions
  author: [Jane Doe, Leslie Pack Kaelbling]
  booktitle: Conference on Robot Learning (CoRL)   # or journal, school, institution, ...
  year: 2026
  url: https://arxiv.org/abs/...
  # optional: pdf, code, website, doi (shown as links), note (e.g. Best Paper Award),
  # links: [{label: Video, url: https://...}], and other BibTeX fields such as pages or volume
```

The BibTeX shown on the site is generated from these fields. Entries are grouped by year and keep
their file order within a year, so add new papers at the top.

Authors whose names match someone in `assets/people` (by `name` or `aliases`) are linked to
their website automatically.

## Add a project

> The Research section is on hold and not built into the site yet. Project pages live in
> `research-on-hold/`; see `research-on-hold/example-project.md` for every field.

## If the build fails

The CI check prints which file and field is wrong, for example:

```
ERROR assets/people/jane-doe.yaml: role "student" must be one of pi, postdoc, phd, meng, urop, visiting, staff, pet, other
ERROR content/blog/2026-11-my-post/index.md: author "jane-doo" not found (file name in assets/people, without .yaml)
```

## Shortcut for local contributors

```sh
hugo new content blog/2026-11-my-post-title    # creates content/blog/2026-11-my-post-title/index.md
```
