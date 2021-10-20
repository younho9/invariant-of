import type {Primitive} from 'type-fest';

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
 * Internal type to generate Invariant type using function signature
 */
type InvariantProperty<Type> = (arg: Type) => Type;

/**
 * Internal private key to save Invariant property type
 */
declare const tag: unique symbol;

/**
 * Internal type to generate Invariant type using function signature
 */
type InvariantSignature<Type> = {
  readonly [tag]: InvariantProperty<Type>;
};

/**
 * Make type as Invariant
 *
 * @category Utilities
 */
export type InvariantOf<Type> = Type & InvariantSignature<Type>;

/**
 * Make type as Invariant deeply
 *
 * @category Utilities
 */
export type InvariantOfDeep<Type> = Type extends Primitive
  ? InvariantOf<Type>
  : InvariantOf<{
      [KeyType in keyof Type]: InvariantOfDeep<Type[KeyType]>;
    }>;

/**
 * Constructs a invariant type
 */
export function invariantOf<Type>(value: Type): InvariantOf<Type>;

/**
 * Constructs a deep invariant type
 */
export function invariantOfDeep<Type>(value: Type): InvariantOfDeep<Type>;

export {};
