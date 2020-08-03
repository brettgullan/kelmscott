import { remove } from './remove'

//-----------------------------------------------------------------------------

describe('remove', () => {
  it('Removes the specified element', () => {
    const result = remove('profile')(fixture)
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = {
  id: '9',
  title: 'Another Folio Entry',
  profile: [
    [
      'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
    ],
  ],
}

const expected = {
  id: '9',
  title: 'Another Folio Entry',
}
