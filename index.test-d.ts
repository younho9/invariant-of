import {expectAssignable, expectNotAssignable, expectType} from 'tsd';

import {invariantOf, InvariantOf} from '.';

expectNotAssignable<InvariantOf<string>>('someString' as InvariantOf<'someString'>); // prettier-ignore
expectNotAssignable<InvariantOf<string>>('someString' as InvariantOf<'someString'>); // prettier-ignore
expectNotAssignable<InvariantOf<string | number>>('someString' as InvariantOf<string>); // prettier-ignore
expectNotAssignable<InvariantOf<string>>('someString' as InvariantOf<string | number>); // prettier-ignore

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
  declare foo: number;
  declare bar?: string;
}

class SubClass extends BaseClass {
  declare baz: number | undefined;
}

class SameClass {
  declare foo: number;
  declare bar?: string;
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

type DeepBaseType = {
  foo: number;
  bar?: BaseType;
};

type DeepSubType = DeepBaseType & {
  bar?: SubType;
  baz: number | undefined;
};

type DeepSameType = {
  foo: number;
  bar?: BaseType;
};

interface DeepBaseInterface {
  foo: number;
  bar?: BaseInterface;
}

interface DeepSubInterface extends DeepBaseInterface {
  bar?: SubInterface;
  baz: number | undefined;
}

interface DeepSameInterface {
  foo: number;
  bar?: BaseInterface;
}

class DeepBaseClass {
  declare foo: number;
  declare bar?: BaseClass;
}

class DeepSubClass extends DeepBaseClass {
  declare bar?: SubClass;
  declare baz: number | undefined;
}

class DeepSameClass {
  declare foo: number;
  declare bar?: BaseClass;
}

/** Invariance does accept same type */
expectType<DeepBaseType>({} as DeepBaseType);
expectType<InvariantOf<DeepBaseType>>({} as InvariantOf<DeepBaseType>);
expectType<InvariantOf<DeepBaseInterface>>({} as InvariantOf<DeepBaseInterface>); // prettier-ignore
expectType<InvariantOf<DeepBaseClass>>({} as InvariantOf<DeepBaseClass>);

/** Invariance does accept equal structure type */
expectType<DeepBaseType>({} as DeepSameType);
expectType<InvariantOf<DeepBaseType>>({} as InvariantOf<DeepSameType>);
expectType<InvariantOf<DeepSameInterface>>({} as InvariantOf<DeepSameInterface>); // prettier-ignore
expectType<InvariantOf<DeepSameClass>>({} as InvariantOf<DeepSameClass>);

/** Invariance does not accept sub type */
expectAssignable<DeepBaseType>({} as DeepSubType);
expectNotAssignable<InvariantOf<DeepBaseType>>({} as InvariantOf<DeepSubType>);
expectNotAssignable<InvariantOf<DeepBaseInterface>>({} as InvariantOf<DeepSubInterface>); // prettier-ignore
expectNotAssignable<InvariantOf<DeepBaseClass>>({} as InvariantOf<DeepSubClass>); // prettier-ignore

/** Invariance does not accept super type */
expectNotAssignable<DeepSubType>({} as DeepBaseType);
expectNotAssignable<InvariantOf<DeepSubType>>({} as InvariantOf<DeepBaseType>);
expectNotAssignable<InvariantOf<DeepSubInterface>>({} as InvariantOf<DeepBaseInterface>); // prettier-ignore
expectNotAssignable<InvariantOf<DeepSubClass>>({} as InvariantOf<DeepBaseClass>); // prettier-ignore

/** Invariant type is subtype of default type */
expectAssignable<DeepBaseType>({} as InvariantOf<DeepBaseType>);
expectAssignable<DeepBaseInterface>({} as InvariantOf<DeepBaseInterface>);
expectAssignable<DeepBaseClass>({} as InvariantOf<DeepBaseClass>);

const deepInvariantObject = invariantOf(
  {
    foo: 123,
    bar: {
      foo: 123,
      bar: '123',
    },
  },
  {
    deep: true,
  },
);

/** Invariant type is useful to iterate object */
expectType<Array<'foo' | 'bar'>>(Object.getOwnPropertyNames(deepInvariantObject.bar)); // prettier-ignore
expectType<Array<'foo' | 'bar'>>(Object.keys(deepInvariantObject));
expectType<Array<["foo" | "bar", InvariantOf<number> | InvariantOf<{ foo: number, bar: string }, true>]>>(Object.entries(deepInvariantObject)); // prettier-ignore
