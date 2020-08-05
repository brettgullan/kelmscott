import React, { Fragment } from 'react'

//-----------------------------------------------------------------------------

/**
 * Render a tree of components for given a configuration map and JSON data specification.
 * 
 * @see https://www.pluralsight.com/guides/how-to-render-a-component-dynamically-based-on-a-json-config
 */
export const factory = (componentMap) => {

  // Our renderer ...
  // For any given JSON data object, locate the matching React component (if exists),
  // create it and pass in any props, and recurse into any children, 
  // calling render for each of them also.
  const renderer = ({ component, children, ...props }) => {
    const Component = componentMap[component]
    return Component
      && React.createElement(
        Component,
        props,
        Array.isArray(children)
          ? children.map(render)
          : children
      )
  }

  // Just a convenience when mapping over arrays of configs
  // to automatically generate `key` values, to prevent React warnings.
  const render = (config, idx) => renderer({ ...config, key: idx })

  // Map over our JSON configuration data and output React components.
  return (config) => (
    <Fragment>
      {config.map(render)}
    </Fragment>
  )
}
