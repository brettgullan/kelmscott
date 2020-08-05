---
title: API
---

**Caster** includes a library of commonly used transformations, intended to address many data shaping requirements.

### As-Many

**Convert a single element to a singleton array.**  

If the supplied `source` element is already an array, this function is a no-op.

#### Example

```javascript
import cast, { asMany } from '@kelmscott/caster'

const data = {
  one: {
    id: '1',
  }
}

const transformations = {
  one: asMany,
}

const result = cast(transformations, data)

// result ...
// {
//   one: [
//     {
//       id: '1',
//     }
//   ]
// }
```


### As-One

**Convert a (singleton) array to a single element.**  

Many elements in query responses are returned as a singleton array.
This function simply returns the first element of the array (whatever that is).  

If the supplied `source` element is not an array, this function is a no-op.  

Use carefully, as this functions performs no sanity checking, if the source array has multiple
elements, only the first will be returned. Any remaining elements will be discarded.

#### Example

```javascript
import cast, { asOne } from '@kelmscott/caster'

const data = {
  one: [
    {
      id: '1',
    }
  ]
}

const transformations = {
  one: asOne,
}

const result = cast(transformations, data)

// result ...
// {
//   one: {
//     id: '1',
//   }
// }
```

## Collect

**Collect elements that match supplied regex and move into an object at specified destination.**  


If destination does not exist it will be created.  
If destination exists, collected elements will be added to it.  

Note, existing elements with same keys will be overwritten.  
If destination exists but is not an object, it wil be overwritten.  

#### Example

```javascript
import cast, { collect } from '@kelmscott/caster'

const data = {
  id: 1,
  key_one: 'one',
  key_two: 'two',
  key_three: 'three',
}

const transformations = collect(/key_/, 'nested.path')

cast(transformations, data)

// result ...
// {
//   id: 1,
//   nested: {
//     path: {
//       key_one: 'one',
//       key_two: 'two',
//       key_three: 'three',
//     }
//   }
// }
```

## Collect-By-Keys

**Collect elements that match supplied regex and move to destinations determined by original keys.**

If elements along destination paths do not exist they will be created.  
If elements along destination paths exist, collected elements will be added to them.  
Note, existing elements with same keys will be overwritten.  

#### Example

```javascript
import cast, { collectByKeys } from '@kelmscott/caster'

const data = {
  id: 1,
  key_one: 'one',
  key_two: 'two',
  key_three: 'three',
}

const transformations = collectByKeys(/(key)_(\w*)/)

cast(transformations, data)

// result ...
// {
//   id: 1,
//   key: {
//     one: 'one',
//     two: 'two',
//     three: 'three',
//   }
// }
```

## Insert

**Insert (new) element at specified target.**

If elements along target paths do not exist they will be created.  
If elements along target paths exist, inserted element will be added to them.  
Note, existing elements with same keys will be overwritten.  

#### Example

```javascript
import cast, { insert } from '@kelmscott/caster'

const data = {
  id: 1,
}

const extra = {
  some: 'extra data',
}

const transformations = insert('new.path', extra)

cast(transformations, data)

// result ...
// {
//   id: 1,
//   new: {
//     path: {
//       some: 'extra data',
//     }
//   }
// }
```

## Many

**Convert an element to a singleton array at specified path.**

Similar to `asMany` but uses a target path instead of applying directly to the source object.  
Passes to `asMany` for the affected object.

#### Example

```javascript
import cast, { many } from '@kelmscott/caster'

const data = {
  id: 1,
  my: {
    path: {
      some: 'data'
    }
  }
}

const transformations = many('my.path')

cast(transformations, data)

// result ...
// {
//   id: 1,
//   my: {
//     path: [
//      {
//         some: 'data',
//       }
//     ]
//   }
// }
```

## Move

**Move element at specified target path to destination path.**

#### Example

```javascript
import cast, { move } from '@kelmscott/caster'

const data = {
  id: 1,
  my: {
    path: {
      some: 'data'
    }
  }
}

const transformations = move('my.path', 'new.path')

cast(transformations, data)

// result ...
// {
//   id: 1,
//   my: {
//   }
//   new: {
//     path: {
//       some: 'data',
//     }
//   }
// }
```

## Mutate

**Mutate element at specified target path using supplied mutator function.**

Mutator function should accept a single argument and (optinally) return a value.

#### Example

```javascript
import cast, { mutate } from '@kelmscott/caster'
import { evolve, toUpper } from 'ramda'

const data = {
  id: 1,
  my: {
    path: {
      some: 'data'
    }
  }
}

const mutator = evolve({
  some: toUpper,
})

const transformations = mutate('my.path', mutator)

cast(transformations, data)

// result ...
// {
//   id: 1,
//   my: {
//     path: {
//       some: 'DATA',
//     }
//   }
// }
```

## Mutate-Any

**Walk the specified source object and mutate any node that matches the given predicate.**

Useful when needing to mutate an object based on one (or more) of its keys.  

* Both predicate and mutator functions accept the node as single parameter.
* Predicate function must return boolean result.
* Mutator function must return the transformed node.

#### Example

Find any object with a `component` value of 'heading' and change the `heading` key name to 'children'.

```javascript
import cast, { mutateAny } from '@kelmscott/caster'
import { propEq } from 'ramda'
import { renameKeys } from 'ramda-adjunct'

const data = {
  id: 1,
  children: [
    {
      component: 'heading',
      heading: 'This is a heading',
    },
    {
      component: 'body',
      children: [
        {
          component: 'heading',
          heading: 'This is a heading',
        },
      ],
    },
  ]
}

const predicate = propEq('nomatch', 'heading')
const mutator = renameKeys({ heading: 'children' })

const transformations = mutateAny(predicate, mutator)

cast(transformations, data)

// result ...
// {
//   id: 1,
//   children: [
//     {
//       component: 'heading',
//       children: 'This is a heading',
//     },
//     {
//       component: 'body',
//       children: [
//         {
//           component: 'heading',
//           children: 'This is a heading',
//         },
//       ],
//     },
//   ]
// }
```


## Mutate-By-Key

**Walk the specified source object and mutate any value for key that matches target.**

#### Example

Modify the value of any object key that matches `component`.

```javascript
import cast, { mutateAny } from '@kelmscott/caster'
import { compose, nth, split } from 'ramda'

const data = {
  id: 1,
  component: 'bodycontent_block',
  children: [
    {
      component: 'bodycontent_heading',
      heading: 'This is a heading',
    },
    {
      component: 'bodycontent_block',
      children: [
        {
          component: 'bodycontent_heading',
          heading: 'This is a heading',
        },
      ],
    },
  ]
}

const mutator = compose(nth(1), split('_'))

const transformations = mutateAny(/^component$/, mutator)

cast(transformations, data)

// result ...
// {
//   id: 1,
//   component: 'block',
//   children: [
//     {
//       component: 'heading',
//       heading: 'This is a heading',
//     },
//     {
//       component: 'block',
//       children: [
//         {
//           component: 'heading',
//           heading: 'This is a heading',
//         },
//       ],
//     },
//   ]
// }
```

## One

**Convert a (singleton) array to a single element at specified path.**

Similar to `asOne` but accepts a target path and source object.  
Passes to `asOne` for the affected object.

#### Example

```javascript
import cast, { one } from '@kelmscott/caster'

const data = {
  id: 1,
  my: {
    path: [
      {
        some: 'data'
      }
    ]
  }
}

const transformations = one('my.path')

cast(transformations, data)

// result ...
// {
//   id: 1,
//   my: {
//     path: {
//       some: 'data',
//     }
//   }
// }
```


## Pivot

**Converts an object into an array of objects, with specified keys.**

Each key/value pair in the source object is turned into a two-element object in the returned array.
If the source object has three key/value pairs, the result of `pivot` will be a three-element array of objects.

#### Example

```javascript
import cast, { pivot } from '@kelmscott/caster'

const data = {
  sm: 'small value',
  md: 'medium value',
  lg: 'large value'
}

const keys = ['media', 'srcset']

const transformations = pivot(keys)

cast(transformations, data)

// result ...
// [
//   {
//     media: 'sm',
//     srcset: 'small value',
//   },
//   {
//     media: 'md',
//     srcset: 'medium value',
//   },
//   {
//     media: 'lg',
//     srcset: 'large value',
//   },
// ]
```

## Remap

**Remap arbitrary elements in an array of objects.**

This is just a convenience wrapper around Ramda's `evolve` function, applies a spec object to an array of (like) objects.

#### Example

```javascript
import cast, { remap } from '@kelmscott/caster'
import { __, prop } from 'ramda'

const data = [
  {
    media: 'sm',
    srcSet: 'small',
  },
  {
    media: 'md',
    srcSet: 'medium',
  },
  {
    media: 'lg',
    srcSet: 'large',
  },
]

const mq = {
  xs: `(min-width: 0px) and (max-width: 639px)`,
  sm: `(min-width: 640px) and (max-width: 767px)`,
  md: `(min-width: 768px) and (max-width: 1023px)`,
  lg: `(min-width: 1024px) and (max-width: 1279px)`,
  xl: `(min-width: 1280px)`,
}

const transformations = remap({
  media: prop(__, mq)
})

cast(transformations, data)

// result ...
// [
//   {
//     media: '(min-width: 640px) and (max-width: 767px)',
//     srcSet: 'small',
//   },
//   {
//     media: '(min-width: 768px) and (max-width: 1023px)',
//     srcSet: 'medium',
//   },
//   {
//     media: '(min-width: 1024px) and (max-width: 1279px)',
//     srcSet: 'large',
//   },
// ]
```

## Remove

**Remove element at specified target.**

#### Example

```javascript
import cast, { remove } from '@kelmscott/caster'

const data = {
  id: 1,
  my: {
    path: {
      some: 'data'
    }
  }
}

const transformations = remove('my.path')

cast(transformations, data)

// result ...
// {
//   id: 1,
//   my: {
//   }
// }
```

## Spread

**Lifts the attributes of the specified object up to the parent object.**

#### Example

```javascript
import cast, { spread } from '@kelmscott/caster'

const data = {
  id: 1,
  my: {
    path: {
      title: 'Some title',
      slug: 'some-slug',
      date: '2020-08-04',
    }
  }
}

const transformations = spread('my.path')

cast(transformations, data)

// result ...
// {
//   id: 1,
//   my: {
//   }
//   title: 'Some title',
//   slug: 'some-slug',
//   date: '2020-08-04',
// }
```
