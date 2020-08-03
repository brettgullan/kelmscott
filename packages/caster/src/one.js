import { curry } from 'ramda'

//-----------------------------------------------------------------------------

import { asOne } from './as-one'
import { mutate } from './mutate'

//-----------------------------------------------------------------------------

/**
 * Convert a (singleton) array to a single element at specified path.
 * Similar to `asOne` but accepts a target path and source object.
 *
 * @param {string} target dot-delimited path of target array
 * @param {object} source object containing target to coerce to single element
 * @return {object} mutated copy of source object
 */
export const one = curry((target, source) => mutate(target, asOne, source))

