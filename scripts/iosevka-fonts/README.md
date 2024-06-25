# Generating Iosevka Custom Web Fonts

This project uses two custom versions of Iosevka fonts, namely `Iosevka Custom Web Propo` and `Iosevka Custom Web Mono`. The [customizer tool](https://typeof.net/Iosevka/customizer) was used to generate configuration file [`private-build-plans.toml`](private-build-plans.toml).

The following commands are used to generate the fonts:

```sh
$ git clone --depth 1 https://github.com/be5invis/Iosevka.git
$ cd Iosevka
$ cp /path/to/Iosevka-Custom.toml private-build-plans.toml
$ npm install
$ npm run build -- --jCmd=12 webfont::IosevkaCustomWebPropo webfont::IosevkaCustomWebMono
```

Notes:
- `--jCmd=12` is used to enable parallel build, which is faster.
- The output fonts will be located at `dist/*/WOFF2` directories.
