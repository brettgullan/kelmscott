import { __, assocPath, compose, curry, pickBy, split, test } from 'ramda'
import { omitBy } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

/**
 * Collect elements that match supplied regex and move into an object
 * at specified destination.
 *
 * If destination does not exist it will be created.
 * If destination exists, collected elements will be added to it.
 * Note, existing elements with same keys will be overwritten.
 * If destination exists but is not an object, it wil be overwritten.
 *
 * @param {RegEx} regex to match keys of elements to collect
 * @param {string} destination dot-delimited path of destination for collected elements
 * @param {object} source object containing elements to collect
 * @return {object} mutated copy of source object
 */
export const collect = curry((regex, destination, source) => {
  const destinationPath = split('.', destination)
  const isTargetElement = (value, key) => test(regex, key)

  return compose(
    omitBy(isTargetElement),
    assocPath(destinationPath, __, source),
    pickBy(isTargetElement)
  )(source)
})
