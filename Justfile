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

# Run formatters: remark, prettier, and xo
format:
    remark . -qfo
    remark . -e mdx -u mdx -qfo
    prettier '**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,cjsx,tsx,mtsx,ctsx,astro,svelte,vue,css}' --write --log-level warn

# Run type checking
check:
    astro check
    tsc --noEmit
