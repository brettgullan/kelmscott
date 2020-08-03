import { propEq } from 'ramda'
import { renameKeys } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

import { mutateAny } from './mutate-any'

//-----------------------------------------------------------------------------


describe('mutateAny', () => {
  it("Mutates any element with 'component' key of value 'heading'", () => {
    const predicate = propEq('component', 'heading')
    const mutator = renameKeys({ heading: 'children' })

    const result = mutateAny(predicate, mutator)(fixture)
    expect(result).toEqual(expected)
  })

  it('Returns source unchanged for non-match', () => {
    const predicate = propEq('nomatch', 'heading')
    const mutator = renameKeys({ heading: 'children' })

    const result = mutateAny(predicate, mutator)(fixture)
    expect(result).toEqual(fixture)
  })
})

//-----------------------------------------------------------------------------

const fixture = [
  {
    component: 'foliocontent_card_BlockType',
    children: [
      {
        component: 'heading',
        heading: 'This is a heading',
      },
      {
        component: 'foliocontent_body_BlockType',
        children: [
          {
            component: 'heading',
            heading: 'This is a heading',
          },
        ],
      },
    ],
  },
]

const expected = [
  {
    component: 'foliocontent_card_BlockType',
    children: [
      {
        component: 'heading',
        children: 'This is a heading',
      },
      {
        component: 'foliocontent_body_BlockType',
        children: [
          {
            component: 'heading',
            children: 'This is a heading',
          },
        ],
      },
    ],
  },
]

