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
export class Shape<Base extends object> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected readonly __keys__: keyof Base;
}

/**
 * Invariant type of object type
 */
export declare type InvariantOf<Base extends object> = Base & Shape<Base>;

/**
 * Constructs a invariant object type
 */
export declare function invariantOf<Base extends object>(
  object: Base,
): InvariantOf<Base>;
