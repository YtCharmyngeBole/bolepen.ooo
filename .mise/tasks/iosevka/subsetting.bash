#!/usr/bin/env bash
# shellcheck shell=bash
#
#MISE description="Subset Iosevka fonts generated in vendor/iosevka/"
#
set -euo pipefail

# Loads config values from a file at the project root
config_path="config.toml"
mapfile -t build_plans < <(yq eval -e '.iosevka.build_plans[]' "$config_path")
build_plans_file="$(yq eval -e '.iosevka.build_plans_file' "$config_path")"
vendor_dir="$(yq eval -e '.iosevka.vendor_dir' "$config_path")"
iosevka_version="$(yq eval -e '.iosevka.font_version' "$config_path")"
build_suffix="$(yq eval -e '.iosevka.subsetting.build_suffix' "$config_path")"
subsets_config_file="$(yq eval -e '.iosevka.subsetting.subsets_config' "$config_path")"
font_sample="$(yq eval -e '.iosevka.subsetting.font_sample' "$config_path")"
css_initial_base_url="$(yq eval -e '.iosevka.subsetting.css_base_url' "$config_path")"
base_output_dir="$(yq eval -e '.iosevka.subsetting.output_dir' "$config_path")"

# Loads the actual Iosevka font version from the package.json file
# located in the vendor directory and compare it with the expected version
actual_iosevka_version="$(yq eval -er '.version' "${vendor_dir%/}/package.json")"
if [[ "${actual_iosevka_version}" != "${iosevka_version}" ]]; then
  echo >&2 "Error: expected Iosevka version ${iosevka_version}, but found ${actual_iosevka_version}."
  exit 1
fi

# For each build plan, constructs the program arguments for the subsetting.py script
for build_plan in "${build_plans[@]}"; do
  set -x

  input_dir="${vendor_dir%/}/dist/${build_plan}/WOFF2"
  output_subdir="${build_plan}-${iosevka_version}-${build_suffix}"
  output_dir="${base_output_dir%/}/${output_subdir}"
  css_font_base_url="${css_initial_base_url%/}/${output_subdir}"

  ./contrib/iosevka/subsetting.py \
    --input-dir="${input_dir}" \
    --output-dir="${output_dir}" \
    --css-font-base-url="${css_font_base_url}" \
    --build-plans="${build_plans_file}" \
    --plan-name="${build_plan}" \
    --subsets-config="${subsets_config_file}" \
    --sample-font="${font_sample}" \
    --commit
  set +x

  echo >&2
done
