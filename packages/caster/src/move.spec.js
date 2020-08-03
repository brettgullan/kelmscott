import { move } from './move'

//-----------------------------------------------------------------------------

describe('move', () => {
  it('Moves the specified element to an existing object', () => {
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
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        linkedin: {
          slug: 'another-folio-entry',
          src:
            'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
        },
      },
    }

    const result = move('slug', 'profile.linkedin.slug')(fixture)
    expect(result).toEqual(expected)
  })

  //-------------------------------------------

  it('Moves the specified element to a new object', () => {
    const fixture = {
      id: '9',
      title: 'Another Folio Entry',
      slug: 'another-folio-entry',
    }
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        linkedin: {
          slug: 'another-folio-entry',
        },
      },
    }

    const result = move('slug', 'profile.linkedin.slug')(fixture)
    expect(result).toEqual(expected)
  })

  //-------------------------------------------

  it('Moves the specified element and overwrites existing value', () => {
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
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        linkedin: {
          src: 'another-folio-entry',
        },
      },
    }

    const result = move('slug', 'profile.linkedin.src')(fixture)
    expect(result).toEqual(expected)
  })

  //-------------------------------------------

  it('Moves the specified element up the tree -- on same path', () => {
    const fixture = {
      id: '9',
      title: 'Another Folio Entry',
      profile: [
        {
          src:
            'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
        },
      ],
    }
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      profile: {
        src:
          'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
      },
    }

    const result = move('profile.0', 'profile')(fixture)
    expect(result).toEqual(expected)
  })

  //-------------------------------------------

  it('Moves the specified element up the tree (careful, weird results with arrays!)', () => {
    const fixture = {
      id: '9',
      title: 'Another Folio Entry',
      profile: [
        {
          linkedin: {
            src:
              'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
          },
        },
      ],
    }
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      // Note that if we pull a sub-object out of an array, and subsequently dissoc that path,
      // Ramda will convert it into an object!!
      profile: {
        0: {},
      },
      linkedin: {
        src:
          'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
      },
    }

    const result = move('profile.0.linkedin', 'linkedin')(fixture)
    expect(result).toEqual(expected)
  })

  //-------------------------------------------

  it('Moves the specified element up the tree (careful, weird results with arrays!)', () => {
    const fixture = {
      id: '9',
      title: 'Another Folio Entry',
      profile: [
        {
          linkedin: {
            src:
              'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
          },
        },
        {
          twitter: {
            src:
              'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
          },
        },
      ],
    }
    const expected = {
      id: '9',
      title: 'Another Folio Entry',
      // Note that if we pull a sub-object out of an array, and subsequently dissoc that path,
      // Ramda will convert it into an object!!
      profile: {
        0: {},
        1: {
          twitter: {
            src:
              'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
          },
        },
      },
      linkedin: {
        src:
          'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
      },
    }

    const result = move('profile.0.linkedin', 'linkedin')(fixture)
    expect(result).toEqual(expected)
  })

  //-------------------------------------------

  it('Moves the specified element up the tree, without deleting clashing element', () => {
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
      profile: [
        'https://s3.ap-southeast-2.amazonaws.com/logo-branding.jpg',
      ],
    }

    const result = move('profile.0', 'profile')(fixture)
    expect(result).toEqual(expected)
  })
})
