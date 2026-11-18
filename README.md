# LIS website

Source for the [Learning & Intelligent Systems Group](https://lis.csail.mit.edu) website, built with
[Hugo](https://gohugo.io). It is a fully static site: content lives in Markdown and YAML files, there is
no JavaScript build step and no npm, and every PR gets a preview link. Merged changes go live when a
maintainer runs `deploy.sh` (see [Deploying](#deploying)).

**Want to add yourself, a blog post, or a publication? See [CONTRIBUTING.md](CONTRIBUTING.md).**

## Local development

Install Hugo (a single binary: `brew install hugo`, `sudo snap install hugo`, or a download from
[the releases page](https://github.com/gohugoio/hugo/releases)). The templates work with Hugo 0.92 and newer;
CI uses the version pinned in `.github/workflows/ci.yml`.

```sh
hugo server -D     # http://localhost:1313, live reload, drafts visible
hugo               # production build into public/ (drafts hidden)
```

## Layout

```
config.toml              site settings
content/                 pages; folder structure = URL structure
  _index.md              home page intro text
  blog/                  one folder per post (index.md + images)
  people.md, publications.md
assets/
  people/                one YAML file + photo per person
  publications.yaml      all publications
  css/main.css           colour tokens, typography, and all component styles
layouts/                 HTML templates (Hugo/Go templates)
  _default/baseof.html   page shell; people.html and publications.html are those pages
  blog/                  blog list, post page, RSS feed (/blog/rss.xml)
  partials/              header, footer, cards, publication entry, people lookup
  research/              templates for the on-hold research section
archetypes/              templates for `hugo new content`
static/                  copied as-is: logos, favicon, fonts, blog videos (static/media/)
research-on-hold/        project pages, not built yet (see its README)
```

Images in `assets/people` and blog covers are resized by Hugo at build time. Old WordPress blog URLs
redirect to the new ones through the `aliases` field in each post.

## CI and deployment

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | every PR and push to `main` | image size check, `hugo` build (fails on bad people ids, roles or fields) |
| `pr-preview.yml` | PRs | builds with drafts visible and publishes to GitHub Pages under `/pr-preview/pr-N/`; removed when the PR closes |

### Deploying

Merging to `main` does **not** update the live site. CSAIL serves lis.csail.mit.edu from a plain AFS
directory (`/afs/csail.mit.edu/group/lis/site`, set in `deploy.sh`), so a member of the `lis` AFS
group builds and copies the site by hand after merging. To check membership, run `pts membership lis`
on a CSAIL machine; any member can add you with `pts adduser <username> lis`. A newly added member
needs a fresh token (`aklog`) before they can write.

```sh
ssh login.csail.mit.edu
cd lab-website             # first time: git clone https://github.com/Learning-and-Intelligent-Systems/lab-website
tokens                     # no csail.mit.edu token listed? run: kinit && aklog
./deploy.sh -n             # optional dry run: lists what would change
./deploy.sh
```

`deploy.sh` builds whatever is on `origin/main` (not local edits) with the Hugo installed on the
CSAIL machines, then rsyncs it into the AFS directory. Changes are live as soon as it finishes. It
refuses to run without an AFS token, with uncommitted changes, or if the target directory lacks its
marker file, so a wrong path can't wipe another folder.

Group membership also gives write access to everything else in `/afs/csail.mit.edu/group/lis`
(old wikis, repositories, research data), so never point rsync or `rm` at anything there by hand.
The group volume is close to its quota; if a deploy fails with "disk quota exceeded", ask CSAIL TIG.

To move the site, change `TARGET` in `deploy.sh`, merge, and deploy. The script creates the new
directory, gives the web server (`www`) read access, and adds the marker. Then ask CSAIL TIG to point
the domain at the new path and delete the old directory.

One-time setup:

1. **Previews:** Settings → Pages → Source "Deploy from a branch", branch `gh-pages` / root. The `gh-pages` branch is created by the first preview run.
2. **Review:** protect `main` (require a PR, a passing `CI` check, and one approval). Optionally add a `CODEOWNERS` file.

Fonts: headings use [Jost](https://fonts.google.com/specimen/Jost), a free font close to the Futura used on the old
WordPress theme. Jost and Open Sans are self-hosted from `static/fonts/`.
