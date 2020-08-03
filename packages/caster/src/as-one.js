import { head, when } from 'ramda'
import { isNonEmptyArray } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

/**
 * Convert a (singleton) array to a single element.
 *
 * Many elements in query responses are returned as a singleton array.
 * This function simply returns the first element of the array (whatever that is).
 *
 * If the supplied `source` element is not an array, this function is a no-op.
 *
 * Use carefully, as it performs no sanity checking, if the array has multiple
 * elements, only the first will be returned. Any remaining elements will be discarded.
 *
 * @param {array} source array to 'unwrap'
 * @return {object} the first element of source array (or original value)
 */
export const asOne = when(isNonEmptyArray, head)
