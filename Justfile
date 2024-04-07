#!/usr/bin/env just --justfile

# List all commands
help:
    @just --list --unsorted

# Run prettier on all source files
prettier:
    prettier --write '**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,cjsx,tsx,mtsx,ctsx,astro,svelte,vue,css}'

# Start the dev server
dev ARGS='--host=0.0.0.0':
    npx astro dev {{ARGS}}

# Build the website
build:
    npx astro build

# Preview the website
preview ARGS='--host=0.0.0.0':
    npx astro preview {{ARGS}}

# Type checking
check:
    npx astro check && tsc --noEmit
