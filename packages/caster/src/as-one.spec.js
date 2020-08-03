import { asOne } from './as-one'

//-----------------------------------------------------------------------------

describe('asOne', () => {
  it('Returns first element of array', () => {
    expect(asOne(fixture)).toEqual(fixture[0])
  })

  it('Returns non-array elements as-is', () => {
    const fixture = { one: 'two' }
    expect(asOne(fixture)).toEqual(fixture)
    expect(asOne('fixture')).toEqual('fixture')
  })

  it('Returns empty array elements as-is', () => {
    const fixture = []
    expect(asOne(fixture)).toEqual(fixture)
    expect(asOne(undefined)).toEqual(undefined)
    expect(asOne(null)).toEqual(null)
  })
})

//-----------------------------------------------------------------------------

const fixture = [
  {
    id: '8',
    title: 'Logo branding',
    alt: 'Logo branding',
    sources_sm: 'small',
    sources_md: 'medium',
    sources_lg: 'large',
    focalPoint: [0.5, 0.5],
    hasFocalPoint: false,
  },
]
