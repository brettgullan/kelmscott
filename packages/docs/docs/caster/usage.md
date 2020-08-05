---
title: Usage
---

## Basic Usage

At its core Caster offers a single `cast` function that accepts an array of transformations and a source object to which they are applied. It returns a mutated (copy) of the original source object.


```javascript
import cast from '@kelmscott/caster'

const transformers = [
  {
    someField: when(isNonEmptyArray, head),
  },
  ...
]

const dataObject = {
  someField: [
    { id: 0 }
  ]
}

const result = cast(transformers, dataObject)

// result ...
// {
//   someField: { id: 0}
// }
```

The cast function is curried, so it can be preconfigured with transformations and the `source` object applied later. For instance:

```javascript
const result = compose(
  ...
  cast(transformers)
)(source)
```

## Transformations

A transformation can be a function or a plain javascript object. The array of transformations may contain any combination of functions and objects. Caster processes each in order, from first to last.

### Functions

A function must accept a source object (JSON) and return an object (JSON).
It is recommended that transformer functions do not mutate the source object, although this is up to you.

```javascript
export const transformerFn = (source) => {
  const transformedObject = {}

  // transform object here ...

  return transformedObject
}
```

### Specs

If a transformation is described using an object, this is passed to Ramda's [evolve](https://ramdajs.com/docs/#evolve) function.

```javascript
export const transformerSpec = {
  someField: when(isNonEmptyArray, head),
  anotherField: toUpper,
  anArrayField: map(filter(someFilterFn)),
  anObjectField: {
    someOtherField: compose(last, split('_')),
  }
}
```


