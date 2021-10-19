export type StringKeyOf<O extends object> = Extract<keyof O, string>;

/**
 * Using declaration merging feature
 */
declare global {
  export interface ObjectConstructor {
    getOwnPropertyNames<T extends object>(
      o: InvariantOf<T>,
    ): Array<StringKeyOf<T>>;

    keys<T extends object>(o: InvariantOf<T>): Array<StringKeyOf<T>>;

    entries<T extends object>(
      o: InvariantOf<T>,
    ): Array<[StringKeyOf<T>, T[StringKeyOf<T>]]>;
  }
}

declare const _: unique symbol;

export declare type InvariantProp<Type> = (arg: Type) => Type;

export declare type InvariantSignature<Type> = {
  readonly [_]: InvariantProp<Type>;
};

/**
 * Invariant type of object type
 */
export declare type InvariantOf<
  Base,
  IsDeep extends boolean = false,
> = IsDeep extends true
  ? InvariantOf<{
      [KeyType in keyof Base]: InvariantOf<Base[KeyType], true>;
    }>
  : Base & InvariantSignature<Base>;

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

export {};
