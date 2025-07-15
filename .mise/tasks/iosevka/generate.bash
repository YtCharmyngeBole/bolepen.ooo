#!/usr/bin/env bash
# shellcheck shell=bash
#
#MISE description="Generate Iosevka fonts from private build plans"
#
set -euxo pipefail

# Copies `private-build-plans.toml` to the vendor directory
cp "./contrib/iosevka/private-build-plans.toml" "./vendor/iosevka/private-build-plans.toml"

# Install Iosevka dependencies and build the fonts
npm install --prefix "vendor/iosevka/"
npm run build --prefix "vendor/iosevka/" -- \
  --jCmd="$(nproc)" webfont::IosevkaCustomPropo webfont::IosevkaCustomMono
