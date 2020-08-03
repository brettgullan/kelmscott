import { one } from './one'

//-----------------------------------------------------------------------------

describe('one', () => {
  it('Returns first element of array at path', () => {
    const result = one('profile.linkedin')(fixture)
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = {
  id: '9',
  title: 'Another Folio Entry',
  profile: {
    linkedin: [
      {
        src: 'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
      },
    ],
  },
}

const expected = {
  id: '9',
  title: 'Another Folio Entry',
  profile: {
    linkedin: {
      src: 'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
    },
  },
}
