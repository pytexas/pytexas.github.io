# PyTexas Foundation Website

The official website for the [PyTexas Foundation](https://pytexas.org), a 501(c)(3) non-profit dedicated to fostering the growth of the Python language and community in Texas.



## About

This site serves as the main site for the PyTexas Foundation, hosting information about:
- Foundation governance and meeting minutes
- Sponsorship opportunities
- Community blog and updates
- Various events throughout the state
    - Information about the PyTexas Conference can be found at `https://pytexas.org/YEAR` where the YEAR is the year of the conference you want information about. 
        - Our upcoming conference information can be found at [https://pytexas.org/2026](https://pytexas.org/2026)
    - Information about the PyTexas Meetup and other local meetups can be found at [https://pytexas.org/meetup](https://pytexas.org/meetup)

## Tech Stack

- **Static Site Generator**: [MkDocs](https://www.mkdocs.org/)
- **Theme**: [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- **Package Manager**: [uv](https://docs.astral.sh/uv/)
- **Hosting**: GitHub Pages
- **Python**: 3.13

## Contributing

### Prerequisites

- Python 3.8+
- [uv](https://docs.astral.sh/uv/) package manager
- [lychee](https://lychee.cli.rs/) for link checking

### Installation

```bash
# Clone the repository
git clone https://github.com/pytexas/pytexas.github.io.git
cd pytexas.github.io

# Install dependencies
uv sync

# Start development server
uv run mkdocs serve
```

Visit http://localhost:8000 to see the site.

### Building

```bash
# Build static site
uv run mkdocs build
```

The built site will be in the `site/` directory.

## Project Structure

```
docs/                   # All content files
├── assets/            # Images and static files
├── blog/              # Blog posts and configuration
├── foundation/        # Governance documents
├── sponsorship/       # Sponsorship tiers
└── overrides/         # Custom theme templates

mkdocs.yml             # Site configuration
pyproject.toml         # Python dependencies
```