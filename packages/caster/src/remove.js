import { dissocPath, curry, split } from 'ramda'

//-----------------------------------------------------------------------------

/**
 * Remove element at specified target.
 *
 * @param {string} target dot-delimited path of target element
 * @param {object} source object containing target to remove
 * @return {object} mutated copy of source object
 */
export const remove = curry((target, source) =>
  dissocPath(split('.', target), source)
)
