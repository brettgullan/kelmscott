  
import { __, assocPath, compose, curry, path, split } from 'ramda'

//-----------------------------------------------------------------------------

/**
 * Mutate element at specified target path using supplied mutator function.
 * Mutator function should accept a single argument and (optinally) return a value.
 *
 * @param {string} target dot-delimited path of target element
 * @param {function} mutator function to mutate target
 * @param {object} source object containing target to mutate
 * @return {object} mutated copy of source object
 */
export const mutate = curry((target, mutator, source) => {
  const targetPath = split('.', target)
  return compose(
    assocPath(targetPath, __, source),
    mutator,
    path(targetPath)
  )(source)
})
  
