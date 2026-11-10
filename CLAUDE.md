# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the PyTexas Foundation website, built with MkDocs using the Material theme. The site serves as the main web presence for the PyTexas Foundation, a non-profit dedicated to educating engineers about Python in Texas.

## Development Setup

The project uses `uv` as the Python package manager. The repository includes a `pyproject.toml` with dependencies and a `uv.lock` file. Python 3.13 is required (specified in `.python-version`).

### Commands

A `justfile` wraps the common commands:

```bash
just install      # uv sync
just serve        # uv run mkdocs serve (port 8000, hot reload)
just build        # uv run mkdocs build (outputs to site/)
just validate     # uv run mkdocs build --strict; run this before committing
just link-check   # build, then lychee --cache over site/**/*.html
just deploy       # mkdocs gh-deploy --force (CI does this on push to main)
```

`just link-check` needs `lychee` installed locally. URLs that fail for reasons outside our control go in `.lycheeignore`.

## Architecture

### Content Structure

The site content is organized in the `docs/` directory:
- **Main pages**: Located directly in `docs/` (index.md, conference.md, meetup-info.md, privacy.md)
- **Stub pages**: `docs/20XX.md`, `discord.md`, `links.md`, `newsletter.md`, `friends.md` are placeholders or redirect targets; most are overridden by `redirect_maps` in `mkdocs.yml`
- **Foundation pages**: In `docs/foundation/` - about, officers (`who.md`), bylaws (`governance.md`), annual meeting minutes, code of conduct, contact
- **Blog**: In `docs/blog/` with posts in `docs/blog/posts/`
- **Sponsorship tiers**: In `docs/sponsorship/` - different sponsorship options (friends, meetup, conference, charitable)
- **Assets**: Images and static files in `docs/assets/`
- **Theme overrides**: Custom HTML templates in `docs/overrides/`

### Configuration

The site is configured through `mkdocs.yml` which defines:
- Navigation structure with tabs enabled
- Material theme settings with light/dark mode toggle
- Plugins: search, social cards, blog (with categories and archives), and redirects
- Redirect mappings for legacy URLs and external links (Discord, newsletter, past conference sites)
- Social media links in the footer (Twitter, Mastodon, Bluesky, Discord, LinkedIn, YouTube, Meetup, GitHub)

### Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch. The CI workflow (`.github/workflows/ci.yml`) uses GitHub Actions to:
1. Install uv and Python 3.13 (version specified in `.python-version`)
2. Install system dependencies for image processing (libcairo2, zlib1g-dev, libjpeg-dev)
3. Run `uv sync` to install Python dependencies
4. Deploy using `mkdocs gh-deploy --force`
5. Cache MkDocs Material assets for faster builds

A separate link-check workflow validates all links on push, pull request, or manual trigger.

## Key Features

- **Blog plugin**: Posts are written in Markdown with YAML frontmatter. New posts should be added to `docs/blog/posts/`
- **Redirects**: Many short URLs redirect to external services or archived content (configured in mkdocs.yml). To retire a page, delete the Markdown file, remove it from `nav`, and add it to `redirect_maps`; mkdocs-redirects generates the redirect page without a stub source file
- **Responsive design**: Material theme provides mobile-friendly layouts
- **Social media integration**: Automatic social cards generation for sharing
- **Search functionality**: Built-in search across all content
- **Link validation**: Automated link checking in CI prevents broken links

## Content That Goes Stale

These pages hold dated facts and need a yearly check, usually after the April conference and annual meeting:

- `docs/index.md` and `docs/conference.md`: current conference year, dates, CFP, and the archive entry for the past year
- `docs/sponsorship/conference.md`: link to the current year's sponsor page
- `docs/sponsorship/meetup.md`: supported meetups, newsletter and Discord audience numbers, sponsor availability
- `docs/foundation/who.md`: officers and term end dates (two-year staggered terms, elected at the annual meeting)
- `docs/foundation/minutes.md`: new annual meeting entry, newest first; source notes live in the PyTexas shared Google Drive as `YYYY-MM-DD Annual Meeting` docs
- `mkdocs.yml`: footer copyright year

## Session Notes

`.ai-sessions/` holds session summaries and `lessons.md` from past Claude Code sessions. Read the latest summary and `lessons.md` before starting related work.
