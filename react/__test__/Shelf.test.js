/* eslint-env jest */
import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductList from '../ProductList'
import { productMock } from '../__mocks__/productMock'

describe('Shelf component', () => {

  const renderComponent = customProps => {
    const props = {
      maxItems: 1,
      itemsPerPage: 1,
      arrows: true,
      showTitle: true
    }

    const wrapper = render(<ProductList {...props} {...customProps} />)
    return wrapper
  }

  it('should be rendered', () => {
    const component = renderComponent()
    expect(component).toBeDefined()
  })

  it('should render nothing if there is no products', () => {
    const component = renderComponent({ products: [] })

    expect(component.container.querySelector('.title')).toBeFalsy()
  })

  it('should match the snapshot', () => {
    const component = renderComponent({ products: productMock })
    expect(component.asFragment()).toMatchSnapshot()
  })
})
