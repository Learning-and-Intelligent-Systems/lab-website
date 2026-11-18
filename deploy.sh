#!/usr/bin/env bash
# Build the site from origin/main and copy it to the AFS directory CSAIL serves it from.
#
# Run on a CSAIL machine with AFS (e.g. `ssh login.csail.mit.edu`), from a clone of this repo:
#   kinit && aklog      # only if `tokens` shows no csail.mit.edu token
#   ./deploy.sh         # add -n for a dry run that shows what would change
#
# The live site updates as soon as the copy finishes.
set -euo pipefail

# Where lis.csail.mit.edu is served from. To move the site, copy it to the new directory, ask TIG
# to point the domain there, and change this line.
TARGET=/afs/csail.mit.edu/u/v/vubt/public_html/lis

# Only deploy into a directory that has this file, so a wrong TARGET can't wipe another folder.
MARKER=.lis-website-deploy-target

DRY_RUN=
[[ "${1:-}" == "-n" ]] && DRY_RUN=--dry-run

die() { echo "deploy: $*" >&2; exit 1; }

cd "$(dirname "$0")"

command -v hugo >/dev/null || die "hugo not found (login.csail.mit.edu has it in /usr/bin)."
[[ -d /afs/csail.mit.edu ]] || die "no AFS here; run this on a CSAIL machine such as login.csail.mit.edu."
tokens 2>/dev/null | grep -q 'csail.mit.edu' || die "no AFS token; run 'kinit && aklog' first."

# Deploy exactly what is on GitHub's main branch, not local edits.
[[ -z "$(git status --porcelain)" ]] || die "uncommitted changes in $(pwd); commit, stash or discard them first."
git fetch --quiet origin main
git checkout --quiet --detach origin/main
echo "deploy: building $(git log -1 --format='%h %s')"

# First deploy: create the directory (it inherits the parent's AFS ACL) and its marker.
if [[ ! -e "$TARGET/$MARKER" ]]; then
  if [[ -d "$TARGET" && -n "$(ls -A "$TARGET")" ]]; then
    die "$TARGET is not empty and has no $MARKER file. Refusing to overwrite it."
  fi
  if [[ -n "$DRY_RUN" ]]; then
    echo "deploy: first deploy; would create $TARGET"
    exit 0
  fi
  mkdir -p "$TARGET"
  touch "$TARGET/$MARKER"
fi

OUT=$(mktemp -d)
trap 'rm -rf "$OUT"' EXIT
hugo --minify --panicOnWarning --destination "$OUT"

# --checksum skips files whose content didn't change; the marker is protected from --delete.
rsync -rl --checksum --delete --filter="protect $MARKER" $DRY_RUN --itemize-changes "$OUT"/ "$TARGET"/

[[ -n "$DRY_RUN" ]] && echo "deploy: dry run, nothing changed." || echo "deploy: done, https://lis.csail.mit.edu is live."
