# PyTexas Foundation Website Justfile
# Available commands for MkDocs website development

# Default recipe - show available commands
default:
    @just --list

# Install dependencies using uv
install:
    uv sync

# Build the documentation site
build:
    uv run mkdocs build

# Run local development server with hot reload
serve:
    uv run mkdocs serve

# Run local development server on specific port
serve-port PORT="8001":
    uv run mkdocs serve --dev-addr=127.0.0.1:{{PORT}}

# Check all links using lychee against the built site (builds first)
link-check: build
    lychee --cache --verbose 'site/**/*.html'

# Clean generated files and cache
clean:
    rm -rf site/
    rm -rf .lycheecache/
    rm -rf __pycache__/
    find . -name "*.pyc" -delete
    find . -name ".DS_Store" -delete

# Run all quality checks (link-check includes build)
check: link-check

# Validate mkdocs configuration
validate:
    uv run mkdocs build --strict

# Deploy to GitHub Pages (production only - use with caution)
deploy:
    uv run mkdocs gh-deploy --force

# Show help for common workflows
help:
    @echo "=== PyTexas Foundation Website - Available Commands ==="
    @echo ""
    @echo "== Setup & Development =="
    @echo "  just install              Install dependencies using uv"
    @echo "  just serve                Start development server (port 8000)"
    @echo "  just serve-port 8001      Start dev server on specific port"
    @echo ""
    @echo "== Building & Validation =="
    @echo "  just build                Build the documentation site"
    @echo "  just validate             Build with strict validation"
    @echo "  just link-check           Check all links (with caching)"
    @echo "  just check                Run all quality checks"
    @echo ""
    @echo "== Deployment =="
    @echo "  just deploy               Deploy to GitHub Pages (production only)"
    @echo ""
    @echo "== Utilities =="
    @echo "  just clean                Clean generated files and cache"
    @echo "  just help                 Show this help message"
    @echo ""
    @echo "=== Common Workflows ==="
    @echo "Development:       just install && just serve"
    @echo "Pre-publish:       just check"
    @echo "Clean start:       just clean && just build"
    @echo "Full validation:   just validate && just link-check"
