import { asMany } from './as-many'

//-----------------------------------------------------------------------------

describe('asMany', () => {
  it('Wraps an element in an array', () => {
    const result = asMany(fixture)
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = {
  id: '9',
  title: 'Another Folio Entry',
}

const expected = [
  {
    id: '9',
    title: 'Another Folio Entry',
  },
]
