# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the PyTexas Foundation website, built with MkDocs using the Material theme. The site serves as the main web presence for the PyTexas Foundation, a non-profit dedicated to educating engineers about Python in Texas.

## Development Setup

The project uses `uv` as the Python package manager. The repository includes a `pyproject.toml` with dependencies and a `uv.lock` file. Python 3.13 is required (specified in `.python-version`).

### Commands

```bash
# Install dependencies using uv
uv sync

# Run the development server (port 8000, hot-reload enabled)
uv run mkdocs serve

# Build the site (outputs to site/ directory)
uv run mkdocs build

# Deploy to GitHub Pages (typically done via CI)
uv run mkdocs gh-deploy --force

# Check for broken links (runs automatically in CI)
# Uses lychee tool configured in .github/workflows/link-check.yml
```

## Architecture

### Content Structure

The site content is organized in the `docs/` directory:
- **Main pages**: Located directly in `docs/` (index.md, conference.md, meetup-info.md, privacy.md)
- **Foundation pages**: In `docs/foundation/` - governance documents, meeting minutes, sponsorship info
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
- **Redirects**: Many short URLs redirect to external services or archived content (configured in mkdocs.yml)
- **Responsive design**: Material theme provides mobile-friendly layouts
- **Social media integration**: Automatic social cards generation for sharing
- **Search functionality**: Built-in search across all content
- **Link validation**: Automated link checking in CI prevents broken links