import { pivot } from './pivot'

//-----------------------------------------------------------------------------

describe('pivot', () => {
  it('Returns array of objects with named keys', () => {
    const result = pivot(['media', 'srcSet'], fixture)
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
}

const expected = [
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
