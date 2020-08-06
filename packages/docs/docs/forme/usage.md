---
title: Usage
---

## Import

```javascript
import forme from '@kelmscott/forme'
```

## Configuration Map

**Forme** uses a simple configuration map to resolve any components referenced in the JSON specification.

```javascript
const Card = (props) => (
  <div className="card" {...props} />
)

const CardImg = (props) => (
  <img className="cardImg" {...props} />
)

const configMap = {
  card: Card,
  img: CardImg,
}
```

## Component Specification

The JSON specification for the above components might be:
```javascript
const spec = [
  {
    component: "card",
    children: [
      {
        component: "img",
        src:
          "https://images.pexels.com/photos/2877188.jpeg"
      }
    ]
  }
]
```

Then use **Forme** to render a React component tree:
```javascript
const renderer = forme(configMap)

renderer(spec)

// returns ...
///
// <Fragment>
//   <Card>
//     <CardImg src="https://images.pexels.com/photos/2877188.jpeg" />
//   </CardImg>
// </Fragment>
```


**The component specification is a simple JSON tree:**  

### Root element
The root of the specification must be an array, containing zero or more objects.

### Component key
Each object must contain a `component` key with a value that corresponds to a component key specified in the configuration map.  

If `forme` does not find a matching component key, the object is ignored (renders `null`).

### Children key
Each object may optionally specify `children`.  

If `children` is an array, `forme` assumes these are child components and recursively walks them, attempting to construct a Component from the configuration map for each. Otherwise, `children` is passed as-is to the Component.

### Props
All other key/value pairs defined in the specification are treated as React `props` and passed as such, when `forme` creates each Component.
