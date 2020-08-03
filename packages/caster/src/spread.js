import { curry, split } from 'ramda'
import { spreadPath } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

/**
 * Lifts the attributes of the specified object up to the parent object.
 */
export const spread = curry((target, source) =>
  spreadPath(split('.', target), source)
)
