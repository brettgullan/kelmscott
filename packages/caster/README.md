# `@kelmscott/caster`

Kelmscott **Caster** is a utility library for transforming and reshaping JSON data.

It comprises a `cast` function (the default export) and a number of pre-built utility transformation functions that are commonly required when re-shaping JSON data.

## About

APIs are generally multi-purpose data feeds; they will typically be agnostic with respect to the final use of the data being served. This is the case regardless of whether data is accessed via REST, GraphQL, etc. As a result, the data requested from an API usually requires reshaping to conform to the requirements of the end-user or front-end application.

This is the problem **Caster** is designed to solve.

For the purposes of content-driven, statically-generated sites, most, if not all of this overhead can be implemented at build time. For dynamic (React) apps this may need to be implemented client-side, within components or as a request side-effect.

Either way, **Caster** is agnostic and can be used client or server side.

## Principles

Caster is built on the principle of code over configuration.  
There is zero-configuration required, and no DSL to learn.

## Installation
Caster requires some additional libraries to be installed with it.

```shell
$ npm i ramda ramda-adunct traverse @kelmscott/caster
```


## Usage

```javascript
import caster from '@kelmscott/caster'
```

## Transformations

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

A transformation can be a function or a plain javascript object. The array of transformers may contain any combination of functions and objects. Caster processes each in order, from first to last.

### Transformer Functions

A function must accept a source object (JSON) and return a modified (JSON) object.

```javascript
export const transformerFn = (source) => {
  const transformedObject = {}

  // transform object here ...

  return transformedObject
}
```

### Transformer Specs

If a transformation is described using an object, this is passed to Ramda's `evolve` function.

```javascript
export const transformerSpec = {
  someField: when(isNonEmptyArray, head),
  anotherField: upper,
  anArrayField: map(filter(someFilterFn)),
  anObjectField: {
    someOtherField: compose(last, split('_)),
  }
}
```


## Example

The following basic example demonstrates how Caster can be used within the context of a statically generated page, using [Next.js](https://nextjs.org).

#### Set up a Transformer for an API request
```javascript
// my-api-transformer.js

import cast from '@kelmscott/caster'

const transformers = [
  myTransformFunction,
  {
    someField: when(isNonEmptyArray, head),
  },
  ...
]

export default cast(transformers)
```

#### And consume it:

```javascript
import myApiTransformer from './my-api-transformer'

...

export const getStaticProps = async ({ params }) => {
  const { data } = await fetch(MY_API_QUERY, {
    id: params.id,
  })

  return {
    props: {
      data: myApiTransformer(data),
    },
  }
}

```



---

## Prior Art

 - https://github.com/APIs-guru/graphql-lodash
 - https://www.fourkitchens.com/blog/development/graphql-leveler-controlling-shape-query/
 - https://labs.getninjas.com.br/pain-points-of-graphql-7e83ba5ddef7#db9d
 - https://github.com/bazaarvoice/jolt#Demo