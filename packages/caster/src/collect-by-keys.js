import {
  __,
  assocPath,
  compose,
  converge,
  forEachObjIndexed,
  match,
  pickBy,
  slice,
  test,
} from 'ramda'
import { omitBy } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

/**
 * Collect elements that match supplied regex and move to destinations
 * determined by original keys.
 *
 * For instance, an element key such as `my_key_path`, might be resolved to:
 * {
 *    my: {
 *      key: {
 *        path: 'original element value'
 *      }
 *    }
 * }
 *
 * If elements along destination paths do not exist they will be created.
 * If elements along destination paths exist, collected elements will be added to them.
 * Note, existing elements with same keys will be overwritten.
 *
 * @param {RegEx} regex to match keys of elements to collect
 * @param {function} destinationFn (optional) function to apply to key
 * @param {object} source object containing elements to collect
 * @return {object} mutated copy of source object
 */
export const collectByKeys = (regex, destinationFn) => {
  const isTargetElement = (value, key) => test(regex, key)
  const defaultDestinationFn = compose(slice(1, Infinity), match(regex))
  const makeDestinationPath = destinationFn || defaultDestinationFn

  const insertAttributesByKey = (tgt, dest) => {
    let result = dest
    forEachObjIndexed((value, key) => {
      result = assocPath(makeDestinationPath(key), value, result)
    }, tgt)
    return result
  }

  return converge(insertAttributesByKey, [
    pickBy(isTargetElement),
    omitBy(isTargetElement),
  ])
}
