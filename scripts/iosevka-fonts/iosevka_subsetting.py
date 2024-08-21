#!/usr/bin/env python
# /// script
# name = "iosevka-fonts"
# description = "Iosevka Subsetting Script"
# license = "Apache-2.0"
#
# requires-python = ">=3.12"
# dependencies = [
#     "brotli~=1.1",
#     "click~=8.1",
#     "fonttools~=4.53",
#     "tqdm~=4.66",
# ]
#
# [[authors]]
# name = "That Charming BOLE"
# email = "165321522+YtCharmyngeBole@users.noreply.github.com"
# ///
"""
Font subsetting script for Iosevka Custom Web fonts.
The script expects a collection of Iosevka font files with complete set of character sets.

Before using this script...

1. Install UV Python package manager v0.3 or above.
   UV will automatically install package dependencies whenever you invoke this script with `uv run` command.
   See https://docs.astral.sh/uv/getting-started/installation/ for installation instructions.

2. Ensure that the working directory should contain Iosevka font files
   with the following structure:

       {working_dir}/{family}-{version}/{family}-{variant}.woff2

   where:
   - {family} is the font family name (e.g. IosevkaCustomWebPropo)
   - {version} is the version of the font (e.g. 30.3.0-0)
   - {variant} is the font variant (e.g. Regular, Bold, LightItalic, etc.)

3. Set the following constants in the Script Config section:
   - `WORKING_DIR`: Path to the working directory containing the font files.
   - `IOSEVKA_VERSION`: Version of the Iosevka font.
   - `IOSEVKA_FAMILIES`: List of Iosevka font families.
   - `IOSEVKA_SAMPLE_FONT_FILE`: Path to a sample Iosevka font file.

Then, just run the script with the desired mode using the command `uv run iosevka_subsetting.py`.
The complete list of command line options is shown below:

```bash
$ uv run iosevka_subsetting.py --help          # view commands
$ uv run iosevka_subsetting.py --dry-run       # dry run (no file generation), default
$ uv run iosevka_subsetting.py --css-only      # generate CSS files only
$ uv run iosevka_subsetting.py --subsets-only  # generate WOFF2 files only
$ uv run iosevka_subsetting.py --all           # generate both CSS and WOFF2 files
```
"""

from __future__ import annotations

import dataclasses
import itertools
import os
import re
import subprocess
import textwrap
import tomllib
import typing as t
from collections.abc import Iterable
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path

import click
import fontTools.unicodedata as ud
from fontTools.ttLib import TTFont
from tqdm import tqdm

if t.TYPE_CHECKING:
    from collections.abc import Iterator

type Weight = t.Literal[100, 200, 300, 400, 500, 600, 700, 800, 900]
type Style = t.Literal["normal", "italic"]

WEIGHTS: list[Weight] = list(t.get_args(Weight.__value__))
STYLES: list[Style] = list(t.get_args(Style.__value__))

THIS_DIR = Path(__file__).absolute().parent
RANKS_FILE = THIS_DIR / "ranks.toml"

#  ____            _       _      ____             __ _
# / ___|  ___ _ __(_)_ __ | |_   / ___|___  _ __  / _(_) __ _
# \___ \ / __| '__| | '_ \| __| | |   / _ \| '_ \| |_| |/ _` |
#  ___) | (__| |  | | |_) | |_  | |__| (_) | | | |  _| | (_| |
# |____/ \___|_|  |_| .__/ \__|  \____\___/|_| |_|_| |_|\__, |
#                   |_|                                 |___/
#

WORKING_DIR = THIS_DIR / "assets"
IOSEVKA_VERSION = "30.3.0-0"
IOSEVKA_FAMILIES = ["IosevkaCustomWebPropo", "IosevkaCustomWebMono"]
IOSEVKA_SAMPLE_FONT_FILE = (
    WORKING_DIR
    / f"IosevkaCustomWebPropo-{IOSEVKA_VERSION}"
    / "IosevkaCustomWebPropo-Regular.woff2"
)


@click.command()
@click.option("--css-only", "mode", flag_value="css-only", help="Generate CSS only.")
@click.option(
    "--subsets-only",
    "mode",
    flag_value="subsets-only",
    help="Generate font subsets only.",
)
@click.option("--all", "mode", flag_value="all", help="Generate all assets.")
@click.option(
    "--dry-run",
    "-n",
    "mode",
    flag_value="dry-run",
    default=True,
    show_default=True,
    help="Dry run.",
)
def program(mode):
    """
    Generates font subsets and CSS for Iosevka Custom Web fonts.
    For more information, please inspect the source code.
    """
    subsets = get_font_subsets(RANKS_FILE, IOSEVKA_SAMPLE_FONT_FILE)

    font_infos = [
        IosevkaFontInfo(
            parent_dir=WORKING_DIR / f"{family}-{IOSEVKA_VERSION}",
            abbr_family=family,
            weight=t.cast(Weight, weight),
            style=t.cast(Style, style),
        )
        for family in IOSEVKA_FAMILIES
        for weight in WEIGHTS
        for style in STYLES
    ]

    runners = [
        FontSubsetRunner(input_font_info, subset_name, unicodes)
        for input_font_info in font_infos
        for subset_name, unicodes in subsets.items()
    ]

    if mode in ("css-only", "all"):
        css_output_file = WORKING_DIR / "build" / "iosevka.css"
        generate_css(css_output_file, runners)

    if mode in ("subsets-only", "all"):
        generate_font_subsets(runners)

    if mode == "dry-run":
        print("Dry run: List of output font files to generate:")
        for runner in runners:
            print("\t", runner.font_output_file, sep="")


def generate_css(output_file: Path, runners: list[FontSubsetRunner]):
    print(f"Generating CSS to {output_file}...")
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with output_file.open("w") as f:
        for runner in runners:
            print(runner.generate_css(), file=f)


def generate_font_subsets(runners: list[FontSubsetRunner]):
    print("Generating font subsets...")
    with ProcessPoolExecutor() as executor:
        futures = {executor.submit(runner.create_subset): runner for runner in runners}
        with tqdm(as_completed(futures), total=len(futures)) as tasks:
            for future in tasks:
                runner = futures[future]
                output_file = runner.font_output_file.name
                try:
                    future.result()
                    tasks.write(f"Generated {output_file}")
                except Exception as exc:
                    tasks.write(f"Error generating {output_file}: {exc}")


#  _____           _     ____        _              _     ____        __ _       _ _   _
# |  ___|__  _ __ | |_  / ___| _   _| |__  ___  ___| |_  |  _ \  ___ / _(_)_ __ (_) |_(_) ___  _ __  ___
# | |_ / _ \| '_ \| __| \___ \| | | | '_ \/ __|/ _ \ __| | | | |/ _ \ |_| | '_ \| | __| |/ _ \| '_ \/ __|
# |  _| (_) | | | | |_   ___) | |_| | |_) \__ \  __/ |_  | |_| |  __/  _| | | | | | |_| | (_) | | | \__ \
# |_|  \___/|_| |_|\__| |____/ \__,_|_.__/|___/\___|\__| |____/ \___|_| |_|_| |_|_|\__|_|\___/|_| |_|___/
#


def get_font_subsets(
    ranks_file: Path, sample_iosevka_font_file: Path
) -> dict[str, UnicodeRanges]:
    """Gather the font subsets from the ranks file."""

    with ranks_file.open("rb") as f:
        data = tomllib.load(f)

    iosevka_unicodes = UnicodeRanges.from_font_file(sample_iosevka_font_file)

    subsets = {}

    common_unicodes = UnicodeRanges()
    for k, v in data["codepoints"]["common"].items():
        name = k.replace("-", " ").title().replace(" ", "")
        subsets[name] = UnicodeRanges.from_range_str(v)
        common_unicodes.update(subsets[name])

    handpicked_unicodes = UnicodeRanges()
    for k, v in data["codepoints"]["handpick"].items():
        name = k.replace("-", " ").title().replace(" ", "")
        subsets[name] = UnicodeRanges.from_range_str(v) - common_unicodes
        handpicked_unicodes.update(subsets[name])

    subsets["Others"] = iosevka_unicodes.difference(
        common_unicodes, handpicked_unicodes
    )
    return subsets


#  ___                     _           _____           _     ___        __
# |_ _|___  ___  _____   _| | ____ _  |  ___|__  _ __ | |_  |_ _|_ __  / _| ___
#  | |/ _ \/ __|/ _ \ \ / / |/ / _` | | |_ / _ \| '_ \| __|  | || '_ \| |_ / _ \
#  | | (_) \__ \  __/\ V /|   < (_| | |  _| (_) | | | | |_   | || | | |  _| (_) |
# |___\___/|___/\___| \_/ |_|\_\__,_| |_|  \___/|_| |_|\__| |___|_| |_|_|  \___/
#


@dataclasses.dataclass(frozen=True)
class IosevkaFontInfo:
    """
    Represents the metadata and other information regarding of an Iosevka font file.
    """

    parent_dir: Path
    abbr_family: str
    weight: Weight
    style: Style

    @classmethod
    def from_path(cls, path: Path) -> t.Self:
        """Parses the font file path to create an instance of IosevkaFontInfo."""

        match = cls.weight_style_re.fullmatch(path.name)
        if match is None:
            raise ValueError(f"Invalid font file name: {path.name}")

        abbr_family = match.group("family")
        weight = t.cast(Weight, cls.weight_as_number(match.group("weight")))
        style = t.cast(Style, (match.group("style") or "normal").lower())

        return cls(path.parent, abbr_family, weight, style)

    @property
    def path(self) -> Path:
        """Reconstructs the path to the font file."""
        return self.parent_dir / f"{self.abbr_family}-{self.variant}.woff2"

    @property
    def variant(self) -> str:
        """The weight and style of the font."""
        weight = self.weight_as_string(self.weight)
        style = "" if self.style == "normal" else self.style.capitalize()
        return f"{weight}{style}" or "Regular"

    @property
    def family(self) -> str:
        """The full name of the font family."""
        return " ".join(self.capitalized_word_re.findall(self.abbr_family))

    @classmethod
    def weight_as_number(cls, weight: str) -> int:
        """Converts a weight enum to a number."""
        return next(
            num for text, num in cls.weights_map if text.casefold() == weight.casefold()
        )

    @classmethod
    def weight_as_string(cls, weight: Weight) -> str:
        """Converts a weight number to a string."""
        return next(text for text, num in cls.weights_map if num == weight)

    capitalized_word_re: t.ClassVar[re.Pattern] = re.compile(r"[A-Z][a-z]*")
    weight_style_re: t.ClassVar[re.Pattern] = re.compile(
        r"(?P<family>\w+)-"
        r"(?P<weight>(?i:|Thin|ExtraLight|Light|Regular|Medium|SemiBold|Bold|ExtraBold|Heavy|Black))"
        r"(?P<style>(?i:|Italic))"
        r"(?:-\w+)?"
        r"\.woff2"
    )
    weights_map: t.ClassVar[list[tuple[str, Weight]]] = [
        ("Thin", 100),
        ("ExtraLight", 200),
        ("Light", 300),
        ("", 400),
        ("Regular", 400),  # empty preferred
        ("Medium", 500),
        ("SemiBold", 600),
        ("Bold", 700),
        ("ExtraBold", 800),
        ("Heavy", 900),
        ("Black", 900),  # 'heavy' preferred
    ]


#  _____           _     ____        _              _   _   _               ____
# |  ___|__  _ __ | |_  / ___| _   _| |__  ___  ___| |_| |_(_)_ __   __ _  |  _ \ _   _ _ __  _ __   ___ _ __
# | |_ / _ \| '_ \| __| \___ \| | | | '_ \/ __|/ _ \ __| __| | '_ \ / _` | | |_) | | | | '_ \| '_ \ / _ \ '__|
# |  _| (_) | | | | |_   ___) | |_| | |_) \__ \  __/ |_| |_| | | | | (_| | |  _ <| |_| | | | | | | |  __/ |
# |_|  \___/|_| |_|\__| |____/ \__,_|_.__/|___/\___|\__|\__|_|_| |_|\__, | |_| \_\\__,_|_| |_|_| |_|\___|_|
#                                                                   |___/


@dataclasses.dataclass
class FontSubsetRunner:
    """
    Runs the font subsetting process.
    WARNING: do not reuse this class implementation as it is not generic.
    """

    input_metadata: IosevkaFontInfo
    subset_name: str
    subset_unicodes: UnicodeRanges

    def create_subset(self):
        args = [
            "pyftsubset",
            f"{self.input_metadata.path}",
            f"--unicodes={self.subset_unicodes.range_str(sep=',')}",
            "--flavor=woff2",
            f"--output-file={self.font_output_file}",
        ]
        self.font_output_file.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(args, capture_output=True, check=True)  # noqa: S603

    def generate_css(self) -> str:
        return textwrap.dedent(f"""\
            @font-face {{
              font-family: "{self.input_metadata.family}";
              font-display: swap;
              font-weight: {self.input_metadata.weight};
              font-stretch: normal;
              font-style: {self.input_metadata.style};
              src: url("{self.in_css_output_file}") format("woff2");
              unicode-range: {self.subset_unicodes.range_str()};
            }}
        """)

    @property
    def font_output_file(self) -> Path:
        """Output file path of the font subset."""
        input_file = self.input_metadata.path
        return (
            input_file.parent.parent
            / "build"
            / input_file.parent.name
            / f"{input_file.stem}-{self.subset_name}.woff2"
        )

    @property
    def in_css_output_file(self) -> Path:
        """Output file path of a font subset to include in CSS string."""
        input_file = self.input_metadata.path
        return (
            Path("/fonts")
            / input_file.parent.name
            / f"{input_file.stem}-{self.subset_name}.woff2"
        )


#  _   _       _               _        ____
# | | | |_ __ (_) ___ ___   __| | ___  |  _ \ __ _ _ __   __ _  ___  ___
# | | | | '_ \| |/ __/ _ \ / _` |/ _ \ | |_) / _` | '_ \ / _` |/ _ \/ __|
# | |_| | | | | | (_| (_) | (_| |  __/ |  _ < (_| | | | | (_| |  __/\__ \
#  \___/|_| |_|_|\___\___/ \__,_|\___| |_| \_\__,_|_| |_|\__, |\___||___/
#                                                        |___/


@dataclasses.dataclass
class UnicodeRanges:
    """Represents a set of Unicode code points."""

    charset: set[int] = dataclasses.field(default_factory=set)

    #################################
    # Encoding and decoding methods #
    #################################
    @classmethod
    def from_chars(cls, s: str) -> UnicodeRanges:
        """Creates a UnicodeRanges from a string of characters."""
        return cls({ord(c) for c in s})

    @classmethod
    def from_range_str(cls, s: str) -> UnicodeRanges:
        """
        Constructs a UnicodeRanges from a comma-separated range strings
        of the form U+XXXX[-YYYY].
        """
        charset = set()
        for cont_range_str in s.split(","):
            cont_range = ContUnicodeRange.from_range_str(cont_range_str)
            charset.update(
                t.cast(Iterable[int], range(cont_range.start, cont_range.end + 1))
            )
        return cls(charset)

    @classmethod
    def from_font_file(cls, font_file: Path | str) -> UnicodeRanges:
        """Creates a UnicodeRanges from a font file."""
        font = TTFont(os.fspath(font_file))
        return cls.from_font(font)

    @classmethod
    def from_font(cls, font: TTFont) -> UnicodeRanges:
        """Creates a UnicodeRanges from a font object."""
        charset = {
            code
            for table in font["cmap"].tables  # pyright: ignore [reportAttributeAccessIssue]
            if table.isUnicode()
            for code in table.cmap
        }
        return cls(charset)

    def chars(self) -> str:
        """Return a string of all codepoints."""
        charset = sorted(self.without_invalid().charset)
        return "".join(chr(i) for i in charset)

    def range_str(self, *, sep: str = ", ") -> str:
        """
        Returns a string representation of the UnicodeRanges
        as a comma-separated list of contiguous range strings U+XXXX[-YYYY].
        """
        return sep.join(
            cont_range.range_str()  #
            for cont_range in self.cont_unicode_ranges()
        )

    ###################
    # Iterator method #
    ###################

    def cont_unicode_ranges(self) -> Iterator[ContUnicodeRange]:
        """Produces a list of contiguous Unicode ranges."""
        if not self.charset:
            return
        charset = sorted(self.charset)
        cont_range_start = charset[0]
        for prev, curr in itertools.pairwise(charset):
            if curr > prev + 1:
                yield ContUnicodeRange(cont_range_start, prev)
                cont_range_start = curr
        yield ContUnicodeRange(cont_range_start, charset[-1])

    ###################################
    # Non-operator, immutable methods #
    ###################################

    def empty(self) -> bool:
        """Return True if the charset is empty."""
        return not bool(self.charset)

    def print_debug(self):
        """Prints a debug representation of the UnicodeRanges."""
        print(f"Codepoints: {len(self.charset)}")
        for c in sorted(self.charset):
            print(f"U+{c:04X}: {chr(c)} {ud.name(chr(c), None)}")

    def is_disjoint(self, other) -> bool:
        """Return True if the charset is disjoint with the other."""
        return self.charset.isdisjoint(other.charset)

    def is_subset(self, other) -> bool:
        """Return True if the charset is a subset of the other."""
        return self.charset.issubset(other)

    def is_superset(self, other) -> bool:
        """Return True if the charset is a superset of the other."""
        return self.charset.issuperset(other)

    def union(self, *others: Iterable[int]) -> UnicodeRanges:
        """Return a new UnicodeRanges with the union of the charset and others."""
        new_unicode_ranges = self.copy()
        new_unicode_ranges.update(*others)
        return new_unicode_ranges

    def intersection(self, *others: Iterable[int]) -> UnicodeRanges:
        """Return a new UnicodeRanges with the intersection of the charset and others."""
        new_unicode_ranges = self.copy()
        new_unicode_ranges.intersection_update(*others)
        return new_unicode_ranges

    def difference(self, *others: Iterable[int]) -> UnicodeRanges:
        """Return a new UnicodeRanges with the difference of the charset and others."""
        new_unicode_ranges = self.copy()
        new_unicode_ranges.difference_update(*others)
        return new_unicode_ranges

    def copy(self) -> UnicodeRanges:
        """Return a shallow copy of the UnicodeRanges."""
        return UnicodeRanges(self.charset.copy())

    def without_invalid(self) -> UnicodeRanges:
        """Return a new UnicodeRanges with only valid code points."""
        return UnicodeRanges({code for code in self.charset if self.check_valid(code)})

    #################################
    # Non-operator, mutable methods #
    #################################

    def add(self, code: int | str):
        """Add a code point to the charset."""
        code = self.ensure_code(code)
        if self.check_valid(code):
            self.charset.add(code)

    def remove(self, code: int | str):
        """Remove a code point from the charset."""
        code = self.ensure_code(code)
        self.charset.remove(code)

    def discard(self, code: int | str):
        """Remove a code point from the charset if it is a member."""
        code = self.ensure_code(code)
        self.charset.discard(code)

    def update(self, *others: Iterable[int]):
        """Update the charset with the union of itself and others."""
        self.charset.update(*others)

    def intersection_update(self, *others: Iterable[int]):
        """Update the charset with the intersection of itself and others."""
        self.charset.intersection_update(*others)

    def difference_update(self, *others: Iterable[int]):
        """Update the charset with the difference of itself and others."""
        self.charset.difference_update(*others)

    def clear_invalid(self):
        """Remove all invalid code points from the charset."""
        self.charset = {code for code in self.charset if self.check_valid(code)}

    #########################
    # Static helper methods #
    #########################

    @staticmethod
    def ensure_code(code: int | str) -> int:
        """Ensure that the code is an integer codepoint."""
        if isinstance(code, str):
            return ord(code)
        elif isinstance(code, int):
            return code
        else:
            raise TypeError(f"code must be int or str, not {type(code).__name__}")

    @staticmethod
    def check_valid(code: int) -> bool:
        """Check if a code point is a valid Unicode character."""
        return bool(ud.name(chr(code), None))

    ########################
    # Magic dunder methods #
    ########################

    def __repr__(self):
        return f"{self.__class__.__name__}.from_range_str({self.range_str()!r})"

    def __len__(self):
        return len(self.charset)

    def __contains__(self, code):
        return code in self.charset

    def __iter__(self) -> Iterator[int]:
        return iter(self.charset)

    def __le__(self, other: UnicodeRanges) -> bool:
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for <=: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        return self.charset <= other.charset

    def __lt__(self, other: UnicodeRanges) -> bool:
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for <: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        return self.charset < other.charset

    def __ge__(self, other: UnicodeRanges) -> bool:
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for >=: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        return self.charset >= other.charset

    def __gt__(self, other: UnicodeRanges) -> bool:
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for >: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        return self.charset > other.charset

    def __or__(self, other: UnicodeRanges) -> UnicodeRanges:
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for |: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        return self.union(other)

    def __and__(self, other: UnicodeRanges) -> UnicodeRanges:
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for &: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        return self.intersection(other)

    def __sub__(self, other: UnicodeRanges) -> UnicodeRanges:
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for -: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        return self.difference(iter(other))

    def __ior__(self, other):
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for |: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        self.update(other)

    def __iand__(self, other):
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for &: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        self.intersection_update(other)

    def __isub__(self, other):
        if not isinstance(other, self.__class__):
            raise TypeError(
                f"unsupported operand type(s) for -: '{self.__class__.__name__}' and '{type(other).__name__}'"
            )
        self.difference_update(other)


#   ____            _     _   _       _               _        ____
#  / ___|___  _ __ | |_  | | | |_ __ (_) ___ ___   __| | ___  |  _ \ __ _ _ __   __ _  ___  ___
# | |   / _ \| '_ \| __| | | | | '_ \| |/ __/ _ \ / _` |/ _ \ | |_) / _` | '_ \ / _` |/ _ \/ __|
# | |__| (_) | | | | |_  | |_| | | | | | (_| (_) | (_| |  __/ |  _ < (_| | | | | (_| |  __/\__ \
#  \____\___/|_| |_|\__|  \___/|_| |_|_|\___\___/ \__,_|\___| |_| \_\__,_|_| |_|\__, |\___||___/
#                                                                               |___/


@dataclasses.dataclass
class ContUnicodeRange:
    """
    Represents a contiguous range of Unicode code points
    whose string has one of the following formats:
    - U+XXXX
    - U+XXXX-YYYY
    - U+XXXX-U+YYYY
    """

    start: int
    end: int

    #: Regular expressions for parsing a contiguous unicode range: U+XXXX[-[U+]YYYY]
    cont_unicode_range_re: t.ClassVar[re.Pattern] = re.compile(
        r"U\+([0-9A-F]+)(?:-(?:U\+)?([0-9A-F]+))?"
    )

    @classmethod
    def from_range_str(cls, s: str) -> t.Self:
        """Parse a contiguous range string in the format U+XXXX[-YYYY]."""
        match = cls.cont_unicode_range_re.fullmatch(s.strip())
        if match is None:
            raise ValueError(f"Invalid range string: {s}")
        start, end = match.groups()
        end = end or start
        return cls(int(start, 16), int(end, 16))

    def chars(self) -> str:
        """Return a string of all codepoints in the range."""
        return "".join(chr(i) for i in range(self.start, self.end + 1))

    def range_str(self) -> str:
        """Return a string representation of the contiguous range."""
        if self.start == self.end:
            return f"U+{self.start:04X}"
        else:
            return f"U+{self.start:04X}-{self.end:04X}"


if __name__ == "__main__":
    program()
