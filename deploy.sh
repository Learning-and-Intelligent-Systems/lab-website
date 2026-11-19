#!/usr/bin/env bash
# Build the site from origin/main and copy it to the AFS directory CSAIL serves it from.
#
# Run on a CSAIL machine with AFS (e.g. `ssh login.csail.mit.edu`), from a clone of this repo:
#   kinit && aklog      # only if `tokens` shows no csail.mit.edu token
#   ./deploy.sh         # add -n for a dry run that shows what would change
#
# The live site updates as soon as the copy finishes.
set -euo pipefail

# Where lis.csail.mit.edu is served from. To move the site, change this line, deploy, ask TIG to
# point the domain at the new directory, then delete the old one.
TARGET=/afs/csail.mit.edu/group/lis/site

# Only deploy into a directory that has this file, so a wrong TARGET can't wipe another folder.
MARKER=.lis-website-deploy-target

# Folders from the pre-2020 site that old publication links still point to (/pubs/..., /movies/...).
# They were copied by hand into TARGET from /afs/csail.mit.edu/group/lis/docroot (CSAIL's web
# server won't follow symlinks to files owned by other users) and are not in this repo, so rsync
# --delete must leave them alone. Add new PDFs for /pubs directly to $TARGET/pubs.
LEGACY_DIRS=(pubs movies code bhpnNAMO)

# Everything runs inside main, which bash parses in full before running. The git checkout below
# can rewrite this file, and bash would otherwise read the new version mid-run.
main() {
  local dry_run=
  [[ "${1:-}" == "-n" ]] && dry_run=--dry-run

  cd "$(dirname "$0")"

  command -v hugo >/dev/null || die "hugo not found (login.csail.mit.edu has it in /usr/bin)."
  [[ -d /afs/csail.mit.edu ]] || die "no AFS here; run this on a CSAIL machine such as login.csail.mit.edu."
  tokens 2>/dev/null | grep -q 'csail.mit.edu' || die "no AFS token; run 'kinit && aklog' first."

  # Deploy exactly what is on GitHub's main branch, not local edits.
  [[ -z "$(git status --porcelain)" ]] || die "uncommitted changes in $(pwd); commit, stash or discard them first."
  git fetch --quiet origin main
  if ! git diff --quiet HEAD origin/main -- deploy.sh; then
    # A newer deploy.sh (e.g. a new TARGET) is on main: switch to it and run that one instead.
    git checkout --quiet --detach origin/main
    exec ./deploy.sh "$@"
  fi
  git checkout --quiet --detach origin/main
  echo "deploy: building $(git log -1 --format='%h %s')"

  # First deploy: create the directory with its marker, readable by the web server.
  if [[ ! -e "$TARGET/$MARKER" ]]; then
    if [[ -d "$TARGET" && -n "$(ls -A "$TARGET")" ]]; then
      die "$TARGET is not empty and has no $MARKER file. Refusing to overwrite it."
    fi
    if [[ -n "$dry_run" ]]; then
      echo "deploy: first deploy; would create $TARGET"
      return
    fi
    mkdir -p "$TARGET"
    # Subdirectories copy this ACL when rsync creates them.
    fs setacl "$TARGET" www rl
    touch "$TARGET/$MARKER"
  fi

  # Global, not local: the EXIT trap runs after main has returned.
  out=$(mktemp -d)
  trap 'rm -rf "$out"' EXIT
  hugo --minify --panicOnWarning --destination "$out"

  # --checksum skips files whose content didn't change. The marker and legacy folders are
  # protected from --delete, so the build must not produce files at those paths.
  local filters=(--filter="protect /$MARKER") name
  for name in "${LEGACY_DIRS[@]}"; do
    [[ ! -e "$out/$name" ]] || die "the build contains /$name, which is reserved for the legacy folder $TARGET/$name."
    filters+=(--filter="protect /$name/")
  done
  rsync -rl --checksum --delete "${filters[@]}" $dry_run --itemize-changes "$out"/ "$TARGET"/

  if [[ -n "$dry_run" ]]; then
    echo "deploy: dry run, nothing changed."
  else
    echo "deploy: done, $TARGET updated."
  fi
}

die() { echo "deploy: $*" >&2; exit 1; }

main "$@"
exit
