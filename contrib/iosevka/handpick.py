import marimo

__generated_with = "0.14.12"
app = marimo.App(width="medium")


@app.cell
def _():
    from __future__ import annotations

    import sys
    import unicodedata as ud
    from pathlib import Path

    import marimo as mo
    import tomli_w
    from fontTools import unicodedata

    from subsetting import UnicodeSubset, load_unicode_blocks_subsets, load_unicode_scripts_subsets
    return (
        Path,
        UnicodeSubset,
        load_unicode_blocks_subsets,
        load_unicode_scripts_subsets,
        mo,
        sys,
        tomli_w,
        unicodedata,
    )


@app.cell
def _():
    from rich.console import Console

    console = Console()
    return


@app.cell
def _(mo):
    mo.md(r"""## Iosevka entire collection""")
    return


@app.cell
def _(UnicodeSubset):
    iosevka = UnicodeSubset.from_font_file(
        "vendor/iosevka/dist/IosevkaCustomPropo/WOFF2/IosevkaCustomPropo-Regular.woff2"
    )
    return (iosevka,)


@app.cell
def _(mo):
    mo.md(r"""## Subsets based on Google Fonts""")
    return


@app.cell
def _(UnicodeSubset):
    google_latin = UnicodeSubset.from_str(
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
        name="GoogleLatin",
    )

    google_latin_ext = UnicodeSubset.from_str(
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
        name="GoogleLatinExtended",
    )

    google_greek = UnicodeSubset.from_str(
        "U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF", name="GoogleGreek"
    )

    google_greek_ext = UnicodeSubset.from_str("U+1F00-1FFF", name="GoogleGreekExtended")

    google_cyrillic = UnicodeSubset.from_str(
        "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", name="GoogleCyrillic"
    )

    google_cyrillic_ext = UnicodeSubset.from_str(
        "U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F",
        name="GoogleCyrillicExtended",
    )

    google_vietnamese = UnicodeSubset.from_str(
        "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
        name="GoogleVietnamese",
    )

    google_armenian = UnicodeSubset.from_str(
        "U+0308, U+0530-058F, U+2010, U+2024, U+25CC, U+FB13-FB17",
        name="GoogleArmenian",
    )

    google_math = UnicodeSubset.from_str(
        "U+0302-0303, U+0305, U+0307-0308, U+0310, U+0312, U+0315, U+031A, U+0326-0327, U+032C, U+032F-0330, U+0332-0333, U+0338, U+033A, U+0346, U+034D, U+0391-03A1, U+03A3-03A9, U+03B1-03C9, U+03D1, U+03D5-03D6, U+03F0-03F1, U+03F4-03F5, U+2016-2017, U+2034-2038, U+203C, U+2040, U+2043, U+2047, U+2050, U+2057, U+205F, U+2070-2071, U+2074-208E, U+2090-209C, U+20D0-20DC, U+20E1, U+20E5-20EF, U+2100-2112, U+2114-2115, U+2117-2121, U+2123-214F, U+2190, U+2192, U+2194-21AE, U+21B0-21E5, U+21F1-21F2, U+21F4-2211, U+2213-2214, U+2216-22FF, U+2308-230B, U+2310, U+2319, U+231C-2321, U+2336-237A, U+237C, U+2395, U+239B-23B7, U+23D0, U+23DC-23E1, U+2474-2475, U+25AF, U+25B3, U+25B7, U+25BD, U+25C1, U+25CA, U+25CC, U+25FB, U+266D-266F, U+27C0-27FF, U+2900-2AFF, U+2B0E-2B11, U+2B30-2B4C, U+2BFE, U+3030, U+FF5B, U+FF5D, U+1D400-1D7FF, U+1EE00-1EEFF",
        name="GoogleMath",
    )

    google_music = UnicodeSubset.from_str(
        "U+25CC, U+2669-266F, U+1D000-1D0F5, U+1D100-1D126, U+1D129-1D1EA, U+1D200-1D245",
        name="GoogleMusic",
    )

    google_symbols = UnicodeSubset.from_str(
        "U+0001-000C, U+000E-001F, U+007F-009F, U+20DD-20E0, U+20E2-20E4, U+2150-218F, U+2190, U+2192, U+2194-2199, U+21AF, U+21E6-21F0, U+21F3, U+2218-2219, U+2299, U+22C4-22C6, U+2300-243F, U+2440-244A, U+2460-24FF, U+25A0-27BF, U+2800-28FF, U+2921-2922, U+2981, U+29BF, U+29EB, U+2B00-2BFF, U+4DC0-4DFF, U+FFF9-FFFB, U+10140-1018E, U+10190-1019C, U+101A0, U+101D0-101FD, U+102E0-102FB, U+10E60-10E7E, U+1D2C0-1D2D3, U+1D2E0-1D37F, U+1F000-1F0FF, U+1F100-1F1AD, U+1F1E6-1F1FF, U+1F30D-1F30F, U+1F315, U+1F31C, U+1F31E, U+1F320-1F32C, U+1F336, U+1F378, U+1F37D, U+1F382, U+1F393-1F39F, U+1F3A7-1F3A8, U+1F3AC-1F3AF, U+1F3C2, U+1F3C4-1F3C6, U+1F3CA-1F3CE, U+1F3D4-1F3E0, U+1F3ED, U+1F3F1-1F3F3, U+1F3F5-1F3F7, U+1F408, U+1F415, U+1F41F, U+1F426, U+1F43F, U+1F441-1F442, U+1F444, U+1F446-1F449, U+1F44C-1F44E, U+1F453, U+1F46A, U+1F47D, U+1F4A3, U+1F4B0, U+1F4B3, U+1F4B9, U+1F4BB, U+1F4BF, U+1F4C8-1F4CB, U+1F4D6, U+1F4DA, U+1F4DF, U+1F4E3-1F4E6, U+1F4EA-1F4ED, U+1F4F7, U+1F4F9-1F4FB, U+1F4FD-1F4FE, U+1F503, U+1F507-1F50B, U+1F50D, U+1F512-1F513, U+1F53E-1F54A, U+1F54F-1F5FA, U+1F610, U+1F650-1F67F, U+1F687, U+1F68D, U+1F691, U+1F694, U+1F698, U+1F6AD, U+1F6B2, U+1F6B9-1F6BA, U+1F6BC, U+1F6C6-1F6CF, U+1F6D3-1F6D7, U+1F6E0-1F6EA, U+1F6F0-1F6F3, U+1F6F7-1F6FC, U+1F700-1F7FF, U+1F800-1F80B, U+1F810-1F847, U+1F850-1F859, U+1F860-1F887, U+1F890-1F8AD, U+1F8B0-1F8BB, U+1F8C0-1F8C1, U+1F900-1F90B, U+1F93B, U+1F946, U+1F984, U+1F996, U+1F9E9, U+1FA00-1FA6F, U+1FA70-1FA7C, U+1FA80-1FA89, U+1FA8F-1FAC6, U+1FACE-1FADC, U+1FADF-1FAE9, U+1FAF0-1FAF8, U+1FB00-1FBFF",
        name="GoogleSymbols",
    )
    return (
        google_armenian,
        google_cyrillic,
        google_cyrillic_ext,
        google_greek,
        google_greek_ext,
        google_latin,
        google_latin_ext,
        google_music,
        google_vietnamese,
    )


@app.cell
def _(mo):
    mo.md(r"""## Subsets from Unicode blocks and script""")
    return


@app.cell
def _(load_unicode_blocks_subsets, load_unicode_scripts_subsets):
    blocks_subsets = load_unicode_blocks_subsets()
    scripts_subsets = load_unicode_scripts_subsets()
    return (blocks_subsets,)


@app.cell
def _(mo):
    mo.md(r"""## Handcrafted subsets""")
    return


@app.cell
def _(UnicodeSubset, sys, unicodedata):
    currency = UnicodeSubset(
        name="Currency",
        codepoints=[
            c  # Unicode codepoint
            for c in range(sys.maxunicode)
            if unicodedata.category(chr(c)) == 'Sc'
        ],
    )
    print(currency)
    return (currency,)


@app.cell
def _(UnicodeSubset, sys, unicodedata):
    separated_block_quadrant = UnicodeSubset(
        name="SeparatedBlockQuadrant",
        codepoints=[
            c  # Unicode codepoint
            for c in range(sys.maxunicode)
            if unicodedata.name(chr(c), '').startswith("SEPARATED BLOCK QUADRANT-")
        ],
    )
    print(separated_block_quadrant)
    return (separated_block_quadrant,)


@app.cell
def _(UnicodeSubset, sys, unicodedata):
    block_octant = UnicodeSubset(
        name="BlockOctant",
        codepoints=[
            c  # Unicode codepoint
            for c in range(sys.maxunicode)
            if unicodedata.name(chr(c), '').startswith("BLOCK OCTANT-")
        ],
    )
    print(block_octant)
    return (block_octant,)


@app.cell
def _(UnicodeSubset, sys, unicodedata):
    large_type_piece = UnicodeSubset(
        name="LargeTypePiece",
        codepoints=[
            c  # Unicode codepoint
            for c in range(sys.maxunicode)
            if unicodedata.name(chr(c), '').startswith("LARGE TYPE PIECE")
        ],
    )
    print(large_type_piece)
    return (large_type_piece,)


@app.cell
def _(UnicodeSubset, sys, unicodedata):
    separated_block_sextant = UnicodeSubset(
        name="SeparatedBlockSextant",
        codepoints=[
            c  # Unicode codepoint
            for c in range(sys.maxunicode)
            if unicodedata.name(chr(c), '').startswith("SEPARATED BLOCK SEXTANT-")
        ],
    )
    print(separated_block_sextant)
    return (separated_block_sextant,)


@app.cell
def _(UnicodeSubset, sys, unicodedata):
    block_sextant = UnicodeSubset(
        name="BlockSextant",
        codepoints=[
            c  # Unicode codepoint
            for c in range(sys.maxunicode)
            if unicodedata.name(chr(c), '').startswith("BLOCK SEXTANT-")
        ],
    )
    print(block_sextant)
    return (block_sextant,)


@app.cell
def _(
    UnicodeSubset,
    block_octant,
    block_sextant,
    blocks_subsets,
    currency,
    google_cyrillic_ext,
    google_latin,
    google_latin_ext,
    google_music,
    large_type_piece,
    separated_block_quadrant,
    separated_block_sextant,
):
    latin = UnicodeSubset(name="Latin")
    latin.update(google_latin, currency)

    phonetics = UnicodeSubset(name="Phonetics")
    phonetics.update(
        blocks_subsets["IPA Extensions"],
        blocks_subsets["Phonetic Extensions"],
        blocks_subsets["Phonetic Extensions Supplement"],
        blocks_subsets["Modifier Tone Letters"],
    )

    combining_marks = UnicodeSubset(name="CombiningMarks")
    combining_marks.update(
        blocks_subsets["Spacing Modifier Letters"],
        blocks_subsets["Combining Diacritical Marks"],
        blocks_subsets["Combining Diacritical Marks Extended"],
        blocks_subsets["Combining Diacritical Marks Supplement"],
        blocks_subsets["Combining Diacritical Marks for Symbols"],
        blocks_subsets["Combining Half Marks"],
    )

    math_simple = UnicodeSubset(name="MathSimple")
    math_simple.update(
        blocks_subsets["Superscripts and Subscripts"],
        blocks_subsets["Number Forms"],
        blocks_subsets["Letterlike Symbols"],
        # Ceiling and Floor from "Miscellaneous Technical"
        UnicodeSubset.from_str("U+2308-230B"),
    )

    math_letters = UnicodeSubset(name="MathLetters")
    math_letters.update(
        blocks_subsets["Mathematical Alphanumeric Symbols"],
        UnicodeSubset.from_str("U+1CCD6-1CCF9"),
    )

    math_symbols = UnicodeSubset(name="MathSymbols")
    math_symbols.update(
        blocks_subsets["Mathematical Operators"],
        blocks_subsets["Miscellaneous Mathematical Symbols-A"],
        blocks_subsets["Miscellaneous Mathematical Symbols-B"],
        blocks_subsets["Supplemental Mathematical Operators"],
    )

    i_ching = UnicodeSubset(name="IChing")
    i_ching.update(
        # Trigram From "Miscellaneous Symbols"
        UnicodeSubset.from_str("U+2630-2637"),
        # Monogram and Digram From "Miscellaneous Symbols"
        UnicodeSubset.from_str("U+268A-268F"),
        # Hexagram from "Yijing Hexagram Symbols"
        UnicodeSubset.from_str("U+4DC0-4DFF"),
        # Tetragram from "Tai Xuan Jing Symbols"
        UnicodeSubset.from_str("U+1D300-1D356"),
    )

    box_drawing = UnicodeSubset(name="BoxDrawing")
    box_drawing.update(
        blocks_subsets["Box Drawing"],
        blocks_subsets["Block Elements"],
        separated_block_quadrant,
        block_octant,
        large_type_piece,
        separated_block_sextant,
        block_sextant,
        # Box Drawings Light from "Symbols for Legacy Computing Supplement"
        UnicodeSubset.from_str("U+1CC1B-1CC1E,U+1CE16-1CE19"),
        # Box Drawings Double from "Symbols for Legacy Computing Supplement"
        UnicodeSubset.from_str("U+1CC1F-1CC20,U+1CE09-1CE0A"),
        # One Sixteenth Block from "Symbols for Legacy Computing Supplement"
        UnicodeSubset.from_str("U+1CE90-1CE9F"),
        # Quarter Block from "Symbols for Legacy Computing Supplement"
        UnicodeSubset.from_str("U+1CEA0-1CEAF"),
        # Diagonal Block From "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FB3C-1FB67"),
        # Triangular Quarter Block from "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FB68-1FB6F"),
        # Eighths Blocks from "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FB70-1FB8B"),
        # Shades, Fills, and Checkers from "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FB8C-1FB99,U+1FB9C-1FB9F"),
        # Triangular Half Block from "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FB9A-1FB9B"),
        # Box Drawings Light from "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FBA0-1FBAF,U+1FBE4-1FBE7"),
        # Thirds Block from "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FBCE-1FBCF"),
        # One Quarter Block from "Symbols for Legacy Computing"
        UnicodeSubset.from_str("U+1FBD0-1FBDF"),
    )

    pictographs = UnicodeSubset(name="Pictographs")
    pictographs.update(
        blocks_subsets["Miscellaneous Symbols and Pictographs"],
        blocks_subsets["Emoticons"],
        # Time Devices from "Miscellaneous Technical"
        UnicodeSubset.from_str("U+231A-231B,U+23F0-23F3"),
    )

    geometric_shapes = UnicodeSubset(name="GeometricShapes")
    geometric_shapes.update(
        blocks_subsets["Dingbats"],
        # Black Medium Triangles from "Miscellaneous Technical"
        UnicodeSubset.from_str("U+23F4-23F7"),
        blocks_subsets["Geometric Shapes"],
        blocks_subsets["Geometric Shapes Extended"],
    )

    common_symbols = UnicodeSubset(name="CommonSymbols")
    common_symbols.update(
        blocks_subsets["Arrows"],
        blocks_subsets["Miscellaneous Symbols and Arrows"],
        google_music,
        # Ligature Displays from "Alphabetic Presentation Forms"
        UnicodeSubset.from_str("U+FB00-FB06"),
        blocks_subsets["Miscellaneous Symbols"],
        # Media Control from "Miscellaneous Technical"
        UnicodeSubset.from_str("U+23E9-23EF,U+23F8-23FA"),
    )

    supplemental_arrows = UnicodeSubset(name="SupplementalArrows")
    supplemental_arrows.update(
        blocks_subsets["Supplemental Arrows-A"],
        blocks_subsets["Supplemental Arrows-B"],
        blocks_subsets["Supplemental Arrows-C"],
    )

    braille = UnicodeSubset(name="Braille")
    braille.update(
        blocks_subsets["Braille Patterns"],
    )

    enclosed_letters = UnicodeSubset(name="EnclosedLetters")
    enclosed_letters.update(
        blocks_subsets["Enclosed Alphanumerics"],
        blocks_subsets["Enclosed CJK Letters and Months"],
        blocks_subsets["Enclosed Alphanumeric Supplement"],
    )

    latin_ext = UnicodeSubset(name="LatinExt")
    latin_ext.update(
        google_latin_ext,
        blocks_subsets["Latin Extended-E"],
        blocks_subsets["Latin Extended-F"],
        blocks_subsets["Latin Extended-G"],
    )

    cyrillic_ext = UnicodeSubset(name="CyrillicExt")
    cyrillic_ext.update(
        google_cyrillic_ext,
        blocks_subsets["Cyrillic Extended-D"],
    )
    return (
        box_drawing,
        braille,
        combining_marks,
        common_symbols,
        cyrillic_ext,
        enclosed_letters,
        geometric_shapes,
        i_ching,
        latin,
        latin_ext,
        math_letters,
        math_simple,
        math_symbols,
        phonetics,
        pictographs,
        supplemental_arrows,
    )


@app.cell
def _(
    box_drawing,
    braille,
    combining_marks,
    common_symbols,
    cyrillic_ext,
    enclosed_letters,
    geometric_shapes,
    google_armenian,
    google_cyrillic,
    google_greek,
    google_greek_ext,
    google_vietnamese,
    i_ching,
    latin,
    latin_ext,
    math_letters,
    math_simple,
    math_symbols,
    phonetics,
    pictographs,
    supplemental_arrows,
):
    selected_subsets = [
        latin,
        phonetics,
        combining_marks,
        math_simple,
        math_letters,
        math_symbols,
        i_ching,
        box_drawing,
        pictographs,
        geometric_shapes,
        common_symbols,
        supplemental_arrows,
        braille,
        enclosed_letters,
        latin_ext,
        google_greek.with_name("Greek"),
        google_greek_ext.with_name("GreekExt"),
        google_cyrillic.with_name("Cyrillic"),
        cyrillic_ext,
        google_vietnamese.with_name("Vietnamese"),
        google_armenian.with_name("Armenian"),
    ]
    return (selected_subsets,)


@app.cell
def _(mo):
    mo.md(r"""## Playground""")
    return


@app.cell
def _(Path, iosevka, selected_subsets, tomli_w):
    exporting_data = {}

    remaining = iosevka.with_name("Others")
    for subset in selected_subsets:
        intersect = remaining.intersection(subset)
        remaining.difference_update(intersect)
        exporting_data[subset.name] = format(intersect, "U+XXXX-XXXX, ")

    exporting_data["Others"] = format(remaining, "U+XXXX-XXXX, ")

    with Path("contrib/iosevka/handpick.partial.toml").open('wb') as f:
        tomli_w.dump(exporting_data, f)
    return


@app.cell
def _():
    return


if __name__ == "__main__":
    app.run()
