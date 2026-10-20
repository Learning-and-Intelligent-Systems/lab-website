---
title: "{{ replaceRE `^\d{4}-\d{2}-` "" .File.ContentBaseName | humanize | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
authors: []   # people ids, e.g. [jane-doe] for assets/people/jane-doe.yaml
summary: One or two sentences for the blog list.
# cover: ./cover.png
draft: true
---

Write here. Put images in this folder and link them as ![alt](./image.png).
