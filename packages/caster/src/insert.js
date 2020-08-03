import { assocPath, curry, split } from 'ramda'

//-----------------------------------------------------------------------------
  
  /**
   * Insert (new) element at specified target.
   *
   * @param {string} target dot-delimited path of target element
   * @param {object} element to insert
   * @param {object} source object containing target to remove
   * @return {object} mutated copy of source object
   */
  export const insert = curry((target, element, source) =>
    assocPath(split('.', target), element, source)
  )
  
