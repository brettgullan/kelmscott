# `@kelmscott/forme`

<div>
  <!-- NPM Version -->
  <a href="https://www.npmjs.com/package/@kelmscott/forme" title="Current version">
    <img src="https://img.shields.io/npm/v/@kelmscott/forme.svg" alt="NPM Version">
  </a>
  <!-- License -->
  <a href="https://github.com/brettgullan/kelmscott/blob/master/packages/forme/LICENSE" title="MIT license">
    <img alt="NPM License" src="https://img.shields.io/npm/l/@kelmscott/forme">
  </a>
</div>

A configurable React factory component for generating a component tree from a JSON specification.

For complete documentation, see [Kelmscott.digital](https://kelmscott.digital/docs/forme).

## Install

```shell
$ npm i @kelmscott/forme
```

## Usage

```javascript
import forme from '@kelmscott/forme'
```

### Configuration Map

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

### Component Specification

The JSON specification would be:
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

Using **Forme** to render a React component tree:
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

The component specification is a simple JSON tree.  

#### Root element
The root of the specification must be an array, containing zero or more objects.

#### Component key
Each object must contain a `component` key with a value that corresponds to a component key specified in the configuration map.

#### Children key
Each object may optionally specify `children`.  
If `children` is an array, **Forme** assumes these are child components and recursively walks them, attempting to construct a Component from the configuration map for each.

#### Props
All other key/value pairs defined in the specification are treated as React `props` and passed as such, when **Forme** creates each Component.

---

## Typical Usage

The typical use-case for **Forme** is with a static site generator, such as Next.js, Gatsby, Nuxt or VuePress.

The following example assumes Next.js.

```javascript
// ./src/pages/index.js

import BodyContent from '../components/BodyContent'

const Page = ({ entry }) => {

  const { heroImage, bodyContent } = entry

  return (
    <Fragment>
      <div>
        <h1>{entry.title}</h1>
        <img src={heroImage.src} />
      </div>

      {/* Assume `bodyContent` is a JSON spec object 
        * generated via GraphQL from a headless CMS.*/}
      <BodyContent>{bodyContent}</BodyContent>
    </Fragment>
  )
}
```

`<BodyContent>` is a pre-configured instance of `forme`, wrapped as a reusable React component.

```javascript
// ./src/components/BodyContent.js

import forme from '@kelmscott/forme'
import { Heading, Subheading, Text, Image, PullQuote } from '.'

const componentMap = {
  heading: Heading,
  subhead: Subheading,
  text: Text,
  image: Image,
  pull-quote: PullQuote,
}

const renderer = forme(componentMap)

export default ({ children }) => renderer(children)
```

