import { compose, nth, split } from 'ramda'

//-----------------------------------------------------------------------------

import { mutateByKey } from './mutate-by-key'

//-----------------------------------------------------------------------------

describe('mutateByKey', () => {
  it('Mutates any element with key that matches target', () => {
    const mutator = compose(nth(1), split('_'))

    const result = mutateByKey(/^component$/, mutator)(fixture)
    expect(result).toEqual(expected)
  })

  it('Returns source unchanged for non-match', () => {
    const mutator = compose(nth(1), split('_'))

    const result = mutateByKey(/^nothing$/, mutator)(fixture)
    expect(result).toEqual(fixture)
  })
})

//-----------------------------------------------------------------------------

const fixture = [
  {
    component: 'foliocontent_card_BlockType',
    children: [
      {
        component: 'foliocontent_img_BlockType',
        src:
          'https://images.pexels.com/photos/2877188/pexels-photo-2877188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        component: 'foliocontent_body_BlockType',
        children: [
          {
            component: 'foliocontent_title_BlockType',
            children: 'This is a title',
          },
          {
            component: 'foliocontent_subtitle_BlockType',
            children: 'This is the subtitle',
          },
          {
            component: 'foliocontent_text_BlockType',
            children:
              "Some quick example text to build on the card title and make up the bulk of the card's content.",
          },
          {
            component: 'foliocontent_button_BlockType',
            text: 'Click Me!',
          },
        ],
      },
    ],
  },
]

const expected = [
  {
    component: 'card',
    children: [
      {
        component: 'img',
        src:
          'https://images.pexels.com/photos/2877188/pexels-photo-2877188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        component: 'body',
        children: [
          {
            component: 'title',
            children: 'This is a title',
          },
          {
            component: 'subtitle',
            children: 'This is the subtitle',
          },
          {
            component: 'text',
            children:
              "Some quick example text to build on the card title and make up the bulk of the card's content.",
          },
          {
            component: 'button',
            text: 'Click Me!',
          },
        ],
      },
    ],
  },
]

