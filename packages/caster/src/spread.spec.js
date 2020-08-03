import { spread } from './spread'

//-----------------------------------------------------------------------------

describe('spread', () => {
  it('Spreads the attributes of the target object into the root', () => {
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      slug: 'another-folio-entry',
      linkedin: {
        src:
          'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
      },
    }

    const result = spread('profile', fixture)
    expect(result).toEqual(expected)
  })

  it('Spreads target object attributes into the root', () => {
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      slug: 'another-folio-entry',
      // Note this will leave an empty object behind!
      profile: {},
      src:
        'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
    }

    const result = spread('profile.linkedin', fixture)
    expect(result).toEqual(expected)
  })
})

//-----------------------------------------------------------------------------

const fixture = {
  id: '9',
  title: 'Another Folio Entry',
  slug: 'another-folio-entry',
  profile: {
    linkedin: {
      src:
        'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
    },
  },
}

