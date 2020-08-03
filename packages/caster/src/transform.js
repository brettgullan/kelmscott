import { curry, either, evolve, of, reduce, when } from 'ramda'
import { isFunction, isPlainObject } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

/**
 * Transfrom a data structure.
 * Applies a list of functions or specs to the supplied JSON object.
 * This is a simple reducing function that iterates over the list of
 * transformations, successively mutating copies of the original data structure.
 *
 * @param {Array|Function|object} transformations a single function or evolve spec or an array of either
 * @param {object} source the source JSON object to transform
 * @return {object} a copy of source with transformations applied
 */
export const transform = curry((transformations, source) => {
  // Sanity checking ...
  // Allow transformations to be a single function or object,
  // and if so, wrap as array.
  const _transformations = when(
    either(isPlainObject, isFunction),
    of
  )(transformations)

  // Transformer applies function transformations and evolves object transformations.
  const transformer = (acc, value) =>
    isFunction(value) ? value(acc) : evolve(value, acc)

  // Iterate over our supplied list of transformations,
  // applying them in order, to the source object.
  return reduce(transformer, source, _transformations)
})
