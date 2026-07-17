# Decision journal for contrib/iosevka

Records design decisions for the font tooling in this directory, newest entry first.


## 2026-07-17: Value types for style metric maps

### Context

The repo adopted basedpyright as the Python type checker of record.
It rejected the annotation `dict[str, ...]` used by `StyleMetric.map` and by the return type of
`FontStyleParser.load_style_config`, since `...` is not a valid value type.

The underlying types are genuinely mixed.
Widths and slopes map style names to CSS strings such as "condensed", while weights map to integers such as 700.
Worse, `load_style_config` builds values from three sources: a raw TOML `css` value, the metric's built-in map,
or the style key itself.
The TOML source meant a value like `css = "500"` could silently land as a string in the weights map,
which is annotated `dict[str, int]`, without any runtime check catching it.

### Options considered

**Option A: union type plus casts.**
Annotate everything `dict[str, str | int]` and `typing.cast` to the precise type at each call site.
Smallest diff, but the casts assert what nothing validates; the string-in-weights hole would remain,
now with the type checker vouching for it.
Rejected because it silences the checker without fixing the data-correctness gap.

**Option B: generic `StyleMetric[V]` with runtime validation.**
Parameterize the dataclass over its value type, carry a `value_type: type[V]` witness,
and have the loader validate each value with `isinstance` and reject bad TOML loudly.
Fully typed end to end with no casts, and the strictest option: it rejects rather than converts.
Rejected as more machinery than three fixed metrics warrant; the generic pays off when metrics multiply,
and they have not.

**Option C: validate in the loader, convert at the boundary (chosen).**
The loader returns an honest `dict[str, str | int]` and rejects non-scalar TOML values with a loud error
naming the metric, key, and plan.
`from_build_plan` then converts each map to its true type at the boundary: `str(v)` for widths and slopes,
`int(v)` for weights.
Garbage that cannot be a weight dies in `int()` with a `ValueError` naming the bad value.

### Why C

C achieves the same honesty as B with no generics and no casts,
and it fails loudly at the earliest boundary where the precise type is known.
The known quirk is that C coerces scalars rather than rejecting them:
TOML `css = "500"` becomes the integer 500 (treated as a feature),
and a numeric width would become its string form silently.
If the metrics ever grow beyond three or the coercion quirk bites, revisit Option B;
this entry describes it in enough detail to reconstruct.
