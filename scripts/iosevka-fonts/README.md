# Generating Iosevka Custom Web Fonts

This project utilizes two modified Iosevka webfont types:

- `Iosevka Custom Web Propo` (quasi-proportional family)
- `Iosevka Custom Web Mono` (monospaced family)

Creating these fonts involves two steps:

1. [Generating the fonts](#1-font-generation)
2. [Subsetting the fonts](#2-font-subsetting)

## 1. Font Generation

This step creates Iosevka fonts for every possible combination of:

- Font family (_propo_ or _mono_)
- Weight (_100_ to _900_)
- Style (_normal_ or _italic_)

The [Customizer Tool](https://typeof.net/Iosevka/customizer)
was used to create the configuration file
[`private-build-plans.toml`](private-build-plans.toml),
which specifies the desired fonts.

Next, use the [custom build script](https://github.com/be5invis/Iosevka/blob/main/doc/custom-build.md)
to generate the initial set of Iosevka font files:

```bash
# Clone the Iosevka repository
git clone --depth 1 https://github.com/be5invis/Iosevka.git
cd Iosevka

# Copy over the configuration file
cp /path/to/Iosevka-Custom.toml private-build-plans.toml

# Install dependencies
npm install

# Build the custom  fonts
npm run build -- --jCmd=12 webfont::IosevkaCustomWebPropo webfont::IosevkaCustomWebMono
```

### Notes:

- `--jCmd=12` enables faster parallel building.
- Output fonts will be in `dist/*/WOFF2` directories.

## 2. Font Subsetting

The initial Iosevka fonts are large and contain many unused characters.
Font subsetting splits the fonts into smaller sets based on scripts and usage
to reduce file size and improve web page loading.

This project contains the script [`iosevka-subsetting.py`](iosevka_subsetting.py)
which will produce font subsets files from the original font files generated from the previous step.

Refer to the script's documentation for usage instructions.
This may involve adjusting the file structure
and modifying the script for your environment.
