import { collect } from './collect'

//-----------------------------------------------------------------------------

describe('collect', () => {
  it('Returns object with matching keys nested into new sub-object', () => {
    const result = collect(/source_/, 'collected.sources')(fixture)
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = {
  keyOne: 'string',
  keyTwo: 'something else',
  source_sm: 'small',
  source_md: 'medium',
  source_lg: 'large',
  src: [1, 2, 3],
}

const expected = {
  keyOne: 'string',
  keyTwo: 'something else',
  src: [1, 2, 3],
  collected: {
    sources: {
      source_sm: 'small',
      source_md: 'medium',
      source_lg: 'large',
    },
  },
}
