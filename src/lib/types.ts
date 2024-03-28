/**
 * Represents a type that can be either the specified type `T` or `null`.
 *
 * @template T - The type that can be nullable.
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
 *
 * @returns A union type that represents either the specified type `T` or `null`.
 */
export type Nullable<T> = T | null;

/**
 * Creates a branded type by combining a base type `T` with a unique brand name `Brand`.
 *
 * @template T - The base type to be branded.
 * @template Brand - The unique brand name to distinguish the branded type.
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
 *
 * @returns A branded type that combines the base type `T` with the unique brand name `Brand`.
 */
export type BrandedType<T, Brand> = T & { __brand: Brand };

/**
 * Extracts the base type from a branded type.
 */
export type BrandedBase<Branded, FallbackType = never> =
  Branded extends BrandedType<infer T, any> ? T : FallbackType;

/**
 * Represents a value that has both human-readable and machine-readable representations.
 *
 * @property human - The human-readable representation of the value.
 * @property machine - The machine-readable representation of the value.
 */
export type HumanMachineReadable<H, M> = {
  human: H;
  machine: M;
};

/**
 * Throws an error indicating that the code path is unreachable.
 *
 * This function is used to mark code paths that should never be reached.
 * It throws an error with the message "Unreachable" to signal that an
 * unexpected situation has occurred.
 *
 * @throws {Error} Always throws an error indicating "Unreachable" code path.
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
 */
export function unreachable(): never {
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
