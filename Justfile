#!/usr/bin/env just --justfile

# List all commands
help:
    @just --list --unsorted

# Start the dev server
dev ARGS='--host=0.0.0.0':
    astro dev {{ ARGS }}

# Build the website
build:
    astro build

# Preview the website
preview ARGS='--host=0.0.0.0':
    astro preview {{ ARGS }}

# Run multiple formatters on source files, including remark and prettier
format:
    remark . -u frontmatter -u gfm -fo
    remark . -e mdx -u frontmatter -u gfm -u mdx -fo
    prettier . --write

# Run type checking
check:
    astro check
    tsc --noEmit
