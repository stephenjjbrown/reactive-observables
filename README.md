![alt text](https://github.com/stephenjjbrown/computed-observable/blob/master/readme-header.jpg?raw=true)

[![Build Status](https://travis-ci.com/stephenjjbrown/reactive-observables.svg?branch=master)](https://travis-ci.com/stephenjjbrown/reactive-observables)
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-configured-green.svg)](https://wallabyjs.com)
[![codecov](https://codecov.io/gh/stephenjjbrown/reactive-observables/branch/master/graph/badge.svg?token=32BYQKS6R0)](https://codecov.io/gh/stephenjjbrown/reactive-observables)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/0491eb927376489994ff5035ea00c885)](https://www.codacy.com/gh/stephenjjbrown/reactive-observables/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=stephenjjbrown/reactive-observables&amp;utm_campaign=Badge_Grade)

# Reactive Observables

Framework-agnostic observables and computed properties that update when their dependencies change, a la Knockout or Vue.js observables, built on and compatible with RxJS.

---

**Different words for the same thing:**

RxJS and some frameworks like Knockout and Vue use different implementations of the observable pattern and different definitions for an *observable*. 

An observable in RxJS is an abstract stream that simply provides a new value to subscribers when .next() is called on it. They are not stateful, and the last used value is not stored. Subscribers always get notified, regardless of whether the new value is different from the last one.

An observable in Knockout is meant to be used like a variable. It stores a value that can be set and accessed. Reads and writes to it are tracked, so that *Computed* values which are dependent on the observable will update when it updates. Subscribers are only notified when the new value is different.

An observable in Knockout is basically the same as a *BehaviorSubject* in RxJS. There is no equivalent to a knockout computed value in RxJS.

This library attempts to replicate that additional dependency tracking and change-checking that you get with those other frameworks, but in the vernacular and API of RxJS. At the same time it aims to create a agnostic observable library that can be used independent of—or in the absence of—a front-end framework.

---
## Using reactive()

In an attempt to simplify the syntax, a new reactive() function has been added in the 2.0.0-beta version

```ts
// Passing in a primitive yields an observable/TrackedSubject
const foo = reactive(3);
const bar = reactive(5);

// Passing in a function yields a Computed value
const baz = reactive(() => foo.value + bar.value); 
baz.value; // 15

// Passing in an array yields a TrackedArray
const array = reactive([1, 2, 3]);
```

---

## Observables

TrackedSubject is equivalent to ko.observable and similar to Vue.observable.

```js
import { TrackedSubject } from "computed-observable";

const foo = new TrackedSubject(3);

// Get the value
foo.value; // 3

// Set the value
foo.value = 5;

// Subscribe to changes
foo.subscribe(newValue => {
    console.log(`Foo is now ${ newValue }`);
});
```


### As a Decorator

Can also be used as a TypeScript decorator

```ts
class Bar {
    @tracked
    foo = 3;

    constructor() {
        // Use just like any property
        foo = 5;

        // Subscribe to changes on the property
        subscribe(this, "foo", newValue => {
            console.log(newValue);
        });
    }
}

---

## Computed Observables

TrackedComputedSubject is the equivilant of ko.computed. Automatically updates when dependencies update.

```js
import { TrackedComputedSubject } from "computed-observable";

const foo = new TrackedSubject(3);

// Create the computed with a getter function
const doubled = new TrackedComputedSubject(() => foo.value * 2);

// Foo gets changed
foo.value = 5;

// Computed automatically updates
doubled.value; // 10;

// Subscribe to the computed as you would any observable
doubled.subscribe(newValue => {
    console.log(`New value is ${ newValue }`);
});
```

### As a Decorator

Can also be used as a TypeScript decorator:

```ts
class Bar {
    @tracked
    foo = 3;

    @computed
    get doubled() {
        return foo * 2;
    }

    constructor() {

        // Foo gets changed
        foo = 5;

        // Computed automatically updates
        doubled; // 10

        // Subcribe to the property
        subscribe(this, "doubled", newValue => {
            console.log(newValue);
        });
    }
}
```

---

## Arrays

The equivalent of ko.observableArray. Arrays are treated as immutable and are frozen. Shallow equal comparer is used to determine whether array has changed.

```js
import { TrackedArray } from "computed-observable";

const array = new TrackedArray([1, 2, 3]);

// Get the value
array.value;

// Set the value
array.value = [4, 5, 6];

// Push a new value
array.value = [...array.value, 7];

// Not allowed, will throw error
array.value.push(8);

// Built-in array functions still available
const doubled = array.value.map(n => n * 2);

// Subscribe to changes
array.subscribe(newValue => console.log(`New value is ${ newValue }`));
```

### As a Decorator

Can also be used as a TypeScript decorator:

```ts
class Bar {
    @tracked
    foo = [1, 2, 3];

    constructor() {
        // Get the array
        foo; // [1, 2, 3]

        // Set the array
        foo = [4, 5, 6];

        // Push to the array
        foo = [...foo, 7];

        // Subscribe to the array
        subscribe(this, "foo", newValue => {
            console.log(newValue);
        });
    }
}
```

##
