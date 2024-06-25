# Generating Iosevka Custom Web Fonts

This project uses two custom versions of Iosevka webfonts,
namely `Iosevka Custom Web Propo` (quasi-proportional family)
and `Iosevka Custom Web Mono` (monospaced family).
The generation involves two important steps:

1. Generates Iosevka fonts for all possible combinations of font families,
   weights (100 through 900), and styles (*normal* and *italic*).
2. Subdivides each font into multiple character sets,
   through the process known as font subsetting.


## 1. Generating Iosevka Fonts

We use the [customizer tool](https://typeof.net/Iosevka/customizer)
to generate the configuration file [`private-build-plans.toml`](private-build-plans.toml)
and the [custom build script](https://github.com/be5invis/Iosevka/blob/main/doc/custom-build.md)
to generate the original set of Iosevka font files.

The following commands are used to generate the fonts:

```bash
$ git clone --depth 1 https://github.com/be5invis/Iosevka.git
$ cd Iosevka
$ cp /path/to/Iosevka-Custom.toml private-build-plans.toml
$ npm install
$ npm run build -- --jCmd=12 webfont::IosevkaCustomWebPropo webfont::IosevkaCustomWebMono

```

Notes:
- `--jCmd=12` is used to enable parallel build, which is faster.
- The output fonts will be located at `dist/*/WOFF2` directories.


## 2. Subsetting Iosevka Fonts

We use [`iosevka-subsetting.py`](iosevka-subsetting.py) python script
to subdivide all fonts generated through step 1.

Before we can use the script, we need to install the required dependencies:
- `fonttools` for font manipulation
- `brotli` for WOFF2 compression
- `click` for command-line interface
- `tqdm` for progress bar

The original scripts assumes that the path to all font files are in the following format:
```text
<SANDBOX_DIR>/<FAMILY>-<VERSION>/<FAMILY>-<VARIANT>.woff2
```
This can be changed by modifying the script directly
and/or adjusting the following global variables in the script:
- `SANDBOX_DIR` points to the base directory of the Iosevka fonts
- `IOSEVKA_VERSION` is the version of the Iosevka fonts
- `IOSEVKA_FAMILIES` is the list of Iosevka font families
- `IOSEVKA_SAMPLE_FONT_FILE` is the sample font file to be used 
  for discovering all unicode codepoints of the font

After that, we can run the script to subset the fonts:
```shell
$ python iosevka-subsetting.py --help          # see all available commands
$ python iosevka-subsetting.py --css-only      # generate CSS files only
$ python iosevka-subsetting.py --subsets-only  # generate WOFF2 files only
$ python iosevka-subsetting.py --all           # performs both operations
```
