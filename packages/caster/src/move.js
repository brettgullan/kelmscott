import { assocPath, converge, dissocPath, path, split } from 'ramda'

//-----------------------------------------------------------------------------

/**
 * Move element at specified target path to destination path.
 *
 * @param {string} target dot-delimited path of target element
 * @param {string} destination dot-delimited path of destination for element
 * @param {object} source object containing target to move
 * @return {object} mutated copy of source object
 */
export const move = (target, destination) => {
  const targetPath = split('.', target)
  const destinationPath = split('.', destination)

  return converge(assocPath(destinationPath), [
    path(targetPath),
    dissocPath(targetPath),
  ])
}
