#!/usr/bin/env bash
# shellcheck shell=bash
#
#MISE description="Generate Iosevka fonts from private build plans"
#
set -euo pipefail

# Loads config values from a file at the project root
config_path="config.toml"
mapfile -t build_plans < <(yq eval -e '.iosevka.build_plans[]' "$config_path")
build_plans_file="$(yq eval -e '.iosevka.build_plans_file' "$config_path")"
vendor_dir="$(yq eval -e '.iosevka.vendor_dir' "$config_path")"
iosevka_version="$(yq eval -e '.iosevka.font_version' "$config_path")"

# Loads the actual Iosevka font version from the package.json file
# located in the vendor directory and compare it with the expected version
actual_iosevka_version="$(yq eval -er '.version' "${vendor_dir%/}/package.json")"
if [[ "${actual_iosevka_version}" != "${iosevka_version}" ]]; then
  >&2 echo "Error: expected Iosevka version ${iosevka_version}, but found ${actual_iosevka_version}."
  exit 1
fi

# Copies over the private build plans file to the vendor directory
# and install dependencies in vendor directory for Iosevka font generation
set -x
cp -f "${build_plans_file}" "${vendor_dir%/}/private-build-plans.toml"
npm install --prefix "vendor/iosevka/"
set +x

# Constructs 'npm run build' arguments
mapfile -t npm_build_args < <(printf "%s\n" "${build_plans[@]}" | sed 's/^/webfont::/')

# ...and use it to build font targets
set -x
npm run build --prefix "vendor/iosevka/" -- --jCmd="$(nproc)" "${npm_build_args[@]}"
set +x
