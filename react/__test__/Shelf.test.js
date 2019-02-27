/* eslint-env jest */
import React from 'react'
import { render } from 'test-utils'
import ProductList from '../ProductList'

describe('Shelf component', () => {
  const renderComponent = (customProps = {}) => {
    const props = {
      maxItems: 1,
      itemsPerPage: 1,
      arrows: true,
      showTitle: true,
    }

    const wrapper = render(<ProductList {...props} />)
    return wrapper
  }

  it('should be rendered', () => {
    const component = renderComponent()
    expect(component).toBeDefined()
  })

  it('should match the snapshot', () => {
    const component = renderComponent()
    expect(component.asFragment()).toMatchSnapshot()
  })
})
