/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'
import { MockedProvider } from 'react-apollo/test-utils'

import Shelf from '../Shelf'
import productsQuery from '../graphql/productsQuery.gql'

describe('Shelf component', () => {
  let wrapper

  beforeEach((done) => {
    const mockedProducts = [
      {
        productId: '1',
        productName: 'Product1',
        brand: 'brand',
        link: 'http://mylink.com',
        items: [{
          name: 'name',
          referenceId: [{
            Value: 'ref1234',
          }],
          images: [{
            imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
            imageTag: '<img src="//www.allfree-clipart.com/Business/computer.jpg">',
          }],
          sellers: [{
            commertialOffer: {
              Price: 400,
              ListPrice: 200,
            },
          }],
        }],
      },
      {
        productId: '2',
        productName: 'Product2',
        brand: 'brand',
        link: 'http://mylink.com',
        items: [{
          name: 'name',
          referenceId: [{
            Value: 'ref1234',
          }],
          images: [{
            imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
            imageTag: '<img src="//www.allfree-clipart.com/Business/computer.jpg"',
          }],
          sellers: [{
            commertialOffer: {
              Price: 400,
              ListPrice: 200,
            },
          }],
        }],
      },
      {
        productId: '3',
        productName: 'Product3',
        brand: 'brand',
        link: 'http://mylink.com',
        items: [{
          name: 'name',
          referenceId: [{
            Value: 'ref1234',
          }],
          images: [{
            imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
            imageTag: '<img src="//www.allfree-clipart.com/Business/computer.jpg"',
          }],
          sellers: [{
            commertialOffer: {
              Price: 400,
              ListPrice: 200,
            },
          }],
        }],
      },
    ]

    wrapper = render(
      <MockedProvider
        mocks={[
          {
            request: { query: productsQuery, variables: {
              specificationFilters: [],
              from: 0,
              to: 9,
            } },
            result: { data: { products: mockedProducts } },
          },
        ]}
      >
        <Shelf />
      </MockedProvider>
    )

    // necessary because we need to wait for the graphql
    // response, even if it's a mocked one
    setTimeout(() => {
      done()
    }, 0)
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should render 3 slide items', () => {
    expect(
      wrapper.container.querySelectorAll('.vtex-shelf').length
    ).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.slick-slider').length
    ).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.slick-slide').length
    ).toBe(6) // 6 because the slide is infinite
  })
})
