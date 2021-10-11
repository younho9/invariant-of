import {expectAssignable, expectNotAssignable, expectType} from 'tsd';

import {invariantOf, InvariantOf} from '.';

type BaseType = {
  foo: number;
  bar?: string;
};

type SubType = BaseType & {
  baz: number | undefined;
};

type SameType = {
  foo: number;
  bar?: string;
};

interface BaseInterface {
  foo: number;
  bar?: string;
}

interface SubInterface extends BaseInterface {
  baz: number | undefined;
}

interface SameInterface {
  foo: number;
  bar?: string;
}

class BaseClass {
  foo!: number;
  bar?: string;
}

class SubClass extends BaseClass {
  baz: number | undefined;
}

class SameClass {
  foo!: number;
  bar?: string;
}

/** Invariance does accept same type */
expectType<BaseType>({} as BaseType);
expectType<InvariantOf<BaseType>>({} as InvariantOf<BaseType>);
expectType<InvariantOf<BaseInterface>>({} as InvariantOf<BaseInterface>);
expectType<InvariantOf<BaseClass>>({} as InvariantOf<BaseClass>);

/** Invariance does accept equal structure type */
expectType<BaseType>({} as SameType);
expectType<InvariantOf<BaseType>>({} as InvariantOf<SameType>);
expectType<InvariantOf<SameInterface>>({} as InvariantOf<SameInterface>);
expectType<InvariantOf<SameClass>>({} as InvariantOf<SameClass>);

/** Invariance does not accept sub type */
expectAssignable<BaseType>({} as SubType);
expectNotAssignable<InvariantOf<BaseType>>({} as InvariantOf<SubType>);
expectNotAssignable<InvariantOf<BaseInterface>>({} as InvariantOf<SubInterface>); // prettier-ignore
expectNotAssignable<InvariantOf<BaseClass>>({} as InvariantOf<SubClass>);

/** Invariance does not accept super type */
expectNotAssignable<SubType>({} as BaseType);
expectNotAssignable<InvariantOf<SubType>>({} as InvariantOf<BaseType>);
expectNotAssignable<InvariantOf<SubInterface>>({} as InvariantOf<BaseInterface>); // prettier-ignore
expectNotAssignable<InvariantOf<SubClass>>({} as InvariantOf<BaseClass>);

/** Invariant type is subtype of default type */
expectAssignable<BaseType>({} as InvariantOf<BaseType>);
expectAssignable<BaseInterface>({} as InvariantOf<BaseInterface>);
expectAssignable<BaseClass>({} as InvariantOf<BaseClass>);

const invariantObject = invariantOf({foo: 123, bar: '123'});

/** Invariant type is useful to iterate object */
expectType<Array<'foo' | 'bar'>>(Object.getOwnPropertyNames(invariantObject));
expectType<Array<'foo' | 'bar'>>(Object.keys(invariantObject));
expectType<Array<["foo" | "bar", string | number]>>(Object.entries(invariantObject)); // prettier-ignore
