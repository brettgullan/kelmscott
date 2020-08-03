import { insert } from './insert'

//-----------------------------------------------------------------------------

describe('insert', () => {
  it('Inserts the specified element', () => {
    const result = insert('profile.linkedin.src', element)(fixture)
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = {
  id: '9',
  title: 'Another Folio Entry',
}

const element = [
  [
    'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
  ],
]

const expected = {
  id: '9',
  title: 'Another Folio Entry',
  profile: {
    linkedin: {
      src: element,
    },
  },
}
