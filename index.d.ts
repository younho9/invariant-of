export type ObjectKey<O extends object> = Exclude<keyof O, symbol>;

/**
 * Using declaration merging feature
 */
declare global {
  export interface ObjectConstructor {
    getOwnPropertyNames<T extends object>(
      o: InvariantOf<T>,
    ): Array<ObjectKey<T>>;

    keys<T extends object>(o: InvariantOf<T>): Array<ObjectKey<T>>;

    entries<T extends object>(
      o: InvariantOf<T>,
    ): Array<[ObjectKey<T>, T[ObjectKey<T>]]>;
  }
}

declare const _keys: unique symbol;

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
    : Base & {readonly [_keys]: keyof Base}
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
