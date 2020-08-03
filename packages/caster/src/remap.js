import { curry, evolve, lift } from 'ramda'

//-----------------------------------------------------------------------------

/**
 * Remap arbitrary elements in an array of objects.
 * This is just a convenience wrapper around Ramda's `evolve` function,
 * applies a spec object to an array of (like) objects.
 */
export const remap = curry((spec, source) => lift(evolve(spec))(source))
