import { compose, curry, map, toPairs, zipObj } from 'ramda'

//-----------------------------------------------------------------------------

/**
 * Converts an object into an array of objects, with specified keys.
 * Each key/value pair in the source object is turned into a two-element
 * object in the returned array.
 * 
 * If the source object has three key/value pairs, the result of `pivot` will be
 * a three-element array of objects.
 * 
 * Example:
 * ```
 * const source = {
 *   sm: 'small value',
 *   md: 'medium value',
 *   lg: 'large value'
 * }
 * const keys = ['media', 'srcset']
 * 
 * pivot(keys, source)
 * ```
 * will return result:
 * ```
 * [
 *   {
 *     media: 'sm',
 *     srcset: 'small value',
 *   },
 *   {
 *     media: 'md',
 *     srcset: 'medium value',
 *   },
 *   {
 *     media: 'lg',
 *     srcset: 'large value',
 *   },
 * ]
 * ```
 * 
 * @param {Array} keys a two-element array of names for key and value
 * @param {object} source object to convert to an array
 */
export const pivot = curry(
  (keys, source) => compose(map(zipObj(keys)), toPairs)(source)

  // This works, but was overkill for requirements.
  //
  // @see: https://www.jeremydaly.com/transducers-supercharge-functional-javascript/
  // @see: https://jrsinclair.com/articles/2019/magical-mystical-js-transducers/
  //
  // Would make more sense if transformer function had more steps.
  // transduce() converts a transformer pipeline so it only iterates over the
  // supplied array once, applying all transformations to each element
  // rather than iterating multiple times. More efficient, but not necessary for this.
  // const transformer = map(zipObj(keys))
  // return compose(
  //   transduce(transformer, appendFlipped, []),
  //   toPairs
  // )(source)
)

