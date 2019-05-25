/* eslint-env jest */
import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductList from '../components/ProductList'
import { productMock } from '../__mocks__/productMock'
import Shelf from '../Shelf'
const fs = require('fs')

describe('Shelf component', () => {
  const renderComponent = customProps => {
    const props = {
      maxItems: 1,
      itemsPerPage: 1,
      arrows: true,
      showTitle: true,
    }

    // TODO: Remove this later when we have a better way to resolve contentSchemas.json at test-tools
    const rawData = fs.readFileSync('../store/contentSchemas.json')
    const contentSchema = JSON.parse(rawData)
    const titleTextId = contentSchema.definitions.ProductList.properties.titleText.default

    const wrapper = render(<ProductList titleText={titleTextId} {...props} {...customProps} />)
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

  it('should show in Site Editor', () => {
    const schema = Shelf.schema || Shelf.getSchema({})
    expect(schema).toBeDefined()
    expect(typeof schema.title).toBe('string')
  })
})
