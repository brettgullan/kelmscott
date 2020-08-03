import { of, when } from 'ramda'
import { isNotArray } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

/**
 * Convert a single element to a singleton array.
 *
 * If the supplied `source` element is already an array, this function is a no-op.
 *
 * @param {object} source element to wrap into an array
 * @return {Array} the array-wrapped element
 */
export const asMany = when(isNotArray, of)
