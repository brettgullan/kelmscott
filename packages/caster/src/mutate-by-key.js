import { curry } from 'ramda'
import traverse from 'traverse'

//-----------------------------------------------------------------------------

/**
 * Walk the specified source object and mutate any value for key that matches target.
 *
 * @param {string|RegExp} target 
 * @param {function} mutator function to mutate target
 * @param {object} source object containing target to mutate
 * @return {object} mutated copy of source object
 */
export const mutateByKey = curry((target, mutator, source) => {
  return traverse(source).map(function(node) { // not arrow function, else `this` won't work
    target.test(this.key) && this.update(mutator(node))
  })
})

