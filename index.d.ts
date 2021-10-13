/**
 * Using declaration merging feature
 */
declare global {
  export interface ObjectConstructor {
    getOwnPropertyNames<T extends object>(o: InvariantOf<T>): Array<keyof T>;
    keys<T extends object>(o: InvariantOf<T>): Array<keyof T>;
    entries<T extends object>(o: InvariantOf<T>): Array<[keyof T, T[keyof T]]>;
  }
}

/**
 * Helper for `InvariantOf` and is not useful on its own
 */
export declare class Shape<Base extends object> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected readonly __keys__: keyof Base;
}

/**
 * Invariant type of object type
 */
export declare type InvariantOf<
  Base,
  IsDeep extends boolean = false,
> = Base extends object
  ? IsDeep extends true
    ? InvariantOf<{
        [KeyType in keyof Base]: InvariantOf<Base[KeyType], true>;
      }>
    : Base & Shape<Base>
  : Base;

/**
 * Constructs a invariant object type
 */
export declare function invariantOf<Base extends object>(
  object: Base,
  options: {
    deep: true;
  },
): InvariantOf<Base, true>;
export declare function invariantOf<Base extends object>(
  object: Base,
  options?: {
    deep: boolean;
  },
): InvariantOf<Base>;
