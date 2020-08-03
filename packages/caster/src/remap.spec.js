import { __, prop } from 'ramda'

//-----------------------------------------------------------------------------

import { remap } from './remap'

//-----------------------------------------------------------------------------

describe('remap', () => {
  it("Remaps array of objects' values using provided spec object", () => {
    const result = remap(
      { media: getMediaQueryForBreakpointIdentifier },
      fixture
    )
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = [
  {
    media: 'sm',
    srcSet: 'small',
  },
  {
    media: 'md',
    srcSet: 'medium',
  },
  {
    media: 'lg',
    srcSet: 'large',
  },
]

const expected = [
  {
    media: '(min-width: 640px) and (max-width: 767px)',
    srcSet: 'small',
  },
  {
    media: '(min-width: 768px) and (max-width: 1023px)',
    srcSet: 'medium',
  },
  {
    media: '(min-width: 1024px) and (max-width: 1279px)',
    srcSet: 'large',
  },
]

//-----------------------------------------------------------------------------

const mq = {
  xs: `(min-width: 0px) and (max-width: 639px)`,
  sm: `(min-width: 640px) and (max-width: 767px)`,
  md: `(min-width: 768px) and (max-width: 1023px)`,
  lg: `(min-width: 1024px) and (max-width: 1279px)`,
  xl: `(min-width: 1280px)`,
}

const getMediaQueryForBreakpointIdentifier = prop(__, mq)
