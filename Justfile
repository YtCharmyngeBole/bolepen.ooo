#!/usr/bin/env just --justfile

# List all commands
help:
    @just --list --unsorted

# Start the dev server
dev *args='--host=0.0.0.0':
    astro dev {{args}}

# Build the website
build:
    astro build

# Preview the website
preview *args='--host=0.0.0.0':
    astro preview {{args}}

# Format the codebase using remark and prettier
format:
    remark . -u frontmatter -u gfm -fo
    remark . -e mdx -u frontmatter -u gfm -u mdx -fo
    prettier . --write

# Run type checking
check:
    astro check
    tsc --noEmit
