import { curry } from 'ramda'

//-----------------------------------------------------------------------------

import { asMany } from './as-many'
import { mutate } from './mutate'

//-----------------------------------------------------------------------------

/**
 * Convert an elements to a singleton array at specified path.
 * Similar to `asMany` but accepts a target path and source object.
 *
 * @param {string} target dot-delimited path of target element
 * @param {object} source object containing target to wrap into an array
 * @return {object} mutated copy of source object
 */
export const many = curry((target, source) => mutate(target, asMany, source))

