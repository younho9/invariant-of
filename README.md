# InvariantOf

> Make TypeScript type system [invariant](https://basarat.gitbook.io/typescript/type-system/type-compatibility#variance)

## Motivation

Type compatibility in TypeScript is based on structural subtyping.

Therefore, there are [some limitations](https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208) in narrowing the types of Object methods like `Object.keys` or `Object.entries`.

> Further reading
>
> - https://fettblog.eu/typescript-better-object-keys
> - https://effectivetypescript.com/2020/05/26/iterate-objects/
> - https://twitter.com/phry/status/1348982969575346183

However, if use invariant type system, the following typing is possible.

```typescript
export interface ObjectConstructor {
  getOwnPropertyNames<T extends object>(o: T): Array<keyof T>;
  keys<T extends object>(o: T): Array<keyof T>;
  entries<T extends object>(o: T): Array<[keyof T, T[keyof T]]>;
}
```

It has similar benefit to using a [Nominal Type System](https://basarat.gitbook.io/typescript/main-1/nominaltyping).

**But, no needs to brand**

## How?

Make object type invariance.

- Invariance does not accept supertypes.
- Invariance does not accept subtypes.

```typescript
import {invariantOf, InvariantOf} from 'invariant-of';

interface Base {
  foo: string;
}

interface Derived extends Base {
  bar: string;
}

declare function method1(value: Base): void;
declare function method2(value: InvariantOf<Base>): void;

method1({foo: 'foo'} as Base); // Okay
method1({foo: 'foo', bar: 'bar'} as Derived); // Okay

method2({foo: 'foo'} as InvariantOf<Base>); // Okay
method2(invariantOf({foo: 'foo'})); // Okay
method2({foo: 'foo', bar: 'bar'} as InvariantOf<Derived>); // Error
```

[Here](/index.test-d.ts) is a comparison with default behavior.

[It does not affect runtime behavior](/index.test.js).

## Install

```sh
npm install invariant-of
```

## Usage

```typescript
import {invariantOf, InvariantOf} from 'invariant-of';

interface Base {
  foo: number;
  bar?: string;
}

interface Derived extends Base {
  baz: string;
}

const someObject: Base = {foo: 123, bar: 'hello'};
const derivedObject: Derived = {foo: 123, bar: 'hello', baz: 'bye'};

function getKeys(args: InvariantOf<Base>): Array<keyof Base> {
  return Object.keys(args);
}

getKeys(someObject); // Error
getKeys(derivedObject); // Error
getKeys(invariantOf(someObject)); // Work
getKeys(invariantOf(derivedObject)); // Error
```

## LICENSE

[MIT](/LICENSE)
