// noinspection JSClosureCompilerSyntax

/**
 * Represents a type that can be either the specified type `T` or `null`.
 *
 * @template T
 * @typedef {T | null} Nullable - A union type that represents either the specified type `T` or `null`.
 *
 * @description
 * The `Nullable` type alias is used to indicate that a value can be either of type `T`
 * or `null`. It is a union type that combines the specified type `T` with the `null` type.
 *
 * This is commonly used when a value is optional or when `null` is a valid value for a
 * particular variable or property.
 *
 * @example
 * type User = {
 *   name: string;
 *   age: Nullable<number>;
 * };
 *
 * const user: User = {
 *   name: 'John Doe',
 *   age: null, // Valid, age can be null
 * };
 */

/**
 * Creates a branded type by combining a base type `T` with a unique brand name `Brand`.
 *
 * @template T
 * @template Brand
 * @typedef {T & { __brand: Brand }} BrandedType - A branded type that combines the base type `T` with the unique brand name `Brand`.
 *
 * @description
 * The `BrandedType` type alias allows you to create distinct types that are not assignable
 * to each other, even if they have the same structure. It achieves this by intersecting
 * the base type `T` with an object type containing a property `__brand` of type `Brand`.
 *
 * @example
 * type USD = BrandedType<number, 'USD'>;
 * type EUR = BrandedType<number, 'EUR'>;
 *
 * const usdAmount: USD = 100 as USD;
 * const eurAmount: EUR = 100 as EUR;
 *
 * // Error: Type 'USD' is not assignable to type 'EUR'.
 * // const invalid: EUR = usdAmount;
 */

/**
 * Extracts the base type from a branded type.
 *
 * @template Branded
 * @template [FallbackType=never]
 * @typedef {Branded extends BrandedType<infer T, any> ? T : FallbackType} BrandedBase
 */

/**
 * Represents a value that has both human-readable `H` and machine-readable `M` representations.
 *
 * @template H
 * @template M
 * @typedef {{ human: H, machine: M }} HumanMachineReadable
 */

/**
 * Represents a string that is a valid percentage, e.g., "50%", "-20.5%", "100%".
 *
 * @typedef {`${number}%`} PercentageString
 */

/**
 * Checks if a value is a valid percentage string.
 *
 * @param {unknown} value
 * @returns {value is PercentageString}
 */
export function isPercentageString(value) {
  const regex = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?%$/;
  return typeof value === "string" && regex.test(value);
}

/**
 * Throws an error indicating that the code path is unreachable.
 *
 * This function is used to mark code paths that should never be reached.
 * It throws an error with the message "Unreachable" to signal that an
 * unexpected situation has occurred.
 *
 * @example
 * function handleValue(value: string | number) {
 *   if (typeof value === "string") {
 *     // Handle string value
 *   } else if (typeof value === "number") {
 *     // Handle number value
 *   } else {
 *     unreachable();
 *   }
 * }
 *
 * @throws {Error} Always throws an error indicating "Unreachable" code path.
 * @returns {never}
 */
export function unreachable() {
  const error = new Error();
  const stack = error.stack?.split("\n");

  if (stack && stack.length > 2) {
    const callerStack = stack[2];
    const match = callerStack.match(/at (.+) \((.+):(\d+):(\d+)\)/);

    if (match) {
      const functionName = match[1];
      const fileName = match[2];
      const lineNumber = match[3];
      const columnNumber = match[4];

      console.log({ functionName, fileName, lineNumber, columnNumber });
      throw new Error(
        `Unreachable code reached in ${functionName} (${fileName}:${lineNumber}:${columnNumber})`,
      );
    }
  }

  throw new Error("Unreachable code reached");
}
