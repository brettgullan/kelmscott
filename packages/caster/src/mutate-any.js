import {curry} from 'ramda'
import traverse from 'traverse'

//-----------------------------------------------------------------------------

/**
 * Walk the specified source object and mutate any node that matches the given predicate.
 * Useful when needing to mutate an object based on one (or more) of its keys.
 * 
 * Both predicate and mutator functions accept the node as single parameter.
 * Predicate function must return boolean result.
 * Mutator function must return the transformed node.
 *
 * @param {Function} predicate function to test node
 * @param {Function} mutator function to mutate node
 * @param {object} source object containing node(s) to mutate
 * @return {object} mutated copy of source object
 */
export const mutateAny = curry((predicate, mutator, source) => {
  return traverse(source).map(function(node) { // not arrow function, else `this` won't work
    predicate(this.node) && this.update(mutator(node))
  })
})

