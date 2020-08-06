---
title: Example
---

The typical use-case for `forme` is with a static site generator, such as Next.js, Gatsby, Nuxt or VuePress.

The following example assumes Next.js.

```javascript title="./src/pages/index.js"
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

      {/* Assume `bodyContent` is a compatible JSON spec object 
        * generated via GraphQL from a headless CMS.*/}
      <BodyContent>{bodyContent}</BodyContent>
    </Fragment>
  )
}

export default Page

```

`<BodyContent>` is a pre-configured instance of `forme`, wrapped as a reusable React component.

```jsx title="./src/components/BodyContent.js"
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

`<BodyContent>` accepts the JSON array as its `children` prop and passes it to a configured instance of `forme` for rendering. The output is a React `<Fragment>` containing a tree of React components.
