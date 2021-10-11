import test from 'ava';
import {invariantOf} from './index.js';

class SomeClass {
  constructor({foo, bar, baz}) {
    this.foo = foo;
    this.bar = bar;
    this.baz = baz;
  }
}

const object = {foo: 123, bar: 'hello', baz: 456};
const classInstance = new SomeClass({foo: 123, bar: 'hello', baz: 456});

test('does not affect runtime behavior', (t) => {
  t.is(invariantOf(object), object);
  t.is(invariantOf(classInstance), classInstance);
  t.is(invariantOf(classInstance) instanceof SomeClass, true);
});
