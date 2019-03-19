/* eslint-env jest */
import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductList from '../ProductList'

describe('Shelf component', () => {
  const productMock = [
    {
      brand: "Apple",
      cacheId: "long-sleeve-shirt",
      categories: ["/Clothing/Shirts/", "/Clothing/"],
      description: "Everything looks good on this trendy color. Even long sleeve shirts.",
      items: [{
        images: [{
          imageTag: "<img />",
          imageUrl: "https://storecomponents.vtex"
        }],
        itemId: "2000539",
        name: "Regular",
        referenceId: [{ Value: "98123719" }],
        sellers: [{
          commertialOffer: {
            AvailableQuantity: 2000000,
            Installments: [{
              InterestRate: 0,
              Name: "American Express à vista",
              NumberOfInstallments: 1,
              TotalValuePlusInterestRate: 9449.99,
              Value: 9449.99
            }],
            ListPrice: 9449.99,
            Price: 9449.99
          },
          sellerId: "1"
        }]
      }],
      link: "https://portal.vtexcommercestable.com.br/long-sleeve-shirt/p",
      linkText: "long-sleeve-shirt",
      productClusters: [],
      productId: "2000005",
      productName: "Long Sleeve Shirt - Regular"
    }
  ]

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
