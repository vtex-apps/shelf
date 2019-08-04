/* eslint-env jest */
import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductList from '../components/ProductList'
import { productMock } from '../__mocks__/productMock'
import Shelf from '../Shelf'
import { resolvePaginationDots } from '../utils/resolvePaginationDots'
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

describe('Util functions', () => {
  it('should return the correct value for pagination dots visibility', () => {
    const MOBILE_ONLY = 'mobileOnly'
    const DESKTOP_ONLY = 'desktopOnly'
    const VISIBLE = 'visible'
    const HIDDEN = 'hidden'

    /** resolvePaginationDots(visibility: string, isMobile: boolean) */
    expect(resolvePaginationDots(MOBILE_ONLY, false)).toBeFalsy()
    expect(resolvePaginationDots(MOBILE_ONLY, true)).toBeTruthy()

    expect(resolvePaginationDots(DESKTOP_ONLY, false)).toBeTruthy()
    expect(resolvePaginationDots(DESKTOP_ONLY, true)).toBeFalsy()

    expect(resolvePaginationDots(VISIBLE, false)).toBeTruthy()
    expect(resolvePaginationDots(VISIBLE, true)).toBeTruthy()

    expect(resolvePaginationDots(HIDDEN, false)).toBeFalsy()
    expect(resolvePaginationDots(HIDDEN, true)).toBeFalsy()
  })
})
