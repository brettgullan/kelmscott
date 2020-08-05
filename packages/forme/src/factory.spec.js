import { create } from 'react-test-renderer'

//-----------------------------------------------------------------------------

import { factory } from './factory'
import componentMap from '../fixtures'
import cardConfig from '../fixtures/card-config'

//-----------------------------------------------------------------------------

describe('factory', () => {
  it('Renders components from data', () => {
    const renderer = factory(componentMap)
    const testRenderer = create(renderer(cardConfig))
    // const testInstance = testRenderer.root

    const json = testRenderer.toJSON()
    console.log(json)
    expect(json.props.className).toEqual('card')
    expect(json.children.length).toEqual(2)
    expect(json.children[1].children.length).toEqual(4)
    expect(json.children[1].children[1].children[0]).toEqual(
      'This is the subtitle'
    )
  })
})
