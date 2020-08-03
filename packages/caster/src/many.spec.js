import { many } from './many'

//-----------------------------------------------------------------------------

describe('many', () => {
  it('Wraps an element in an array at path', () => {
    const fixture = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        linkedin: {
          src:
            'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
        },
      },
    }
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        linkedin: [
          {
            src:
              'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
          },
        ],
      },
    }

    const result = many('profile.linkedin')(fixture)
    expect(result).toEqual(expected)
  })

  it("Doesn't wrap existing array element in an array", () => {
    const fixture = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        linkedin: [
          {
            src:
              'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
          },
        ],
      },
    }
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        linkedin: [
          {
            src:
              'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
          },
        ],
      },
    }

    const result = many('profile.linkedin')(fixture)
    expect(result).toEqual(expected)
  })
})