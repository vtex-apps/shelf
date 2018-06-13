/* eslint-env jest */
import { mount } from 'enzyme'
import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'

import productsQuery from '../queries/productsQuery.gql'
import ShelfContainer from '../ShelfContainer'

describe('ShelfContainer component', () => {
  let wrapper

  beforeEach(done => {
    const mockedProducts = [
      {
        productId: '1',
        productName: 'Product1',
        description: 'Description',
        categories: [],
        link: 'http://mylink.com/p',
        linkText: 'p',
        brand: 'brand',
        items: [
          {
            name: 'name',
            itemId: '291',
            referenceId: [
              {
                Value: 'ref1234',
              },
            ],
            images: [
              {
                imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
                imageTag:
                  '<img src="//www.allfree-clipart.com/Business/computer.jpg">',
              },
            ],
            sellers: [
              {
                commertialOffer: {
                  Price: 400,
                  ListPrice: 200,
                },
              },
            ],
          },
        ],
      },
      {
        productId: '2',
        productName: 'Product2',
        description: 'Description',
        categories: [],
        link: 'http://mylink.com/p',
        linkText: 'p',
        brand: 'brand',
        items: [
          {
            name: 'name',
            itemId: '292',
            referenceId: [
              {
                Value: 'ref1234',
              },
            ],
            images: [
              {
                imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
                imageTag:
                  '<img src="//www.allfree-clipart.com/Business/computer.jpg"',
              },
            ],
            sellers: [
              {
                commertialOffer: {
                  Price: 400,
                  ListPrice: 200,
                },
              },
            ],
          },
        ],
      },
      {
        productId: '3',
        productName: 'Product3',
        description: 'Description',
        categories: [],
        link: 'http://mylink.com/p',
        linkText: 'p',
        brand: 'brand',
        items: [
          {
            name: 'name',
            itemId: '293',
            referenceId: [
              {
                Value: 'ref1234',
              },
            ],
            images: [
              {
                imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
                imageTag:
                  '<img src="//www.allfree-clipart.com/Business/computer.jpg"',
              },
            ],
            sellers: [
              {
                commertialOffer: {
                  Price: 400,
                  ListPrice: 200,
                },
              },
            ],
          },
        ],
      },
    ]

    wrapper = mount(
      <MockedProvider
        mocks={[
          {
            request: {
              query: productsQuery,
              variables: {
                specificationFilters: [],
                from: 0,
                to: 9,
              },
            },
            result: { data: { products: mockedProducts } },
          },
        ]}>
        <ShelfContainer />
      </MockedProvider>
    )

    // necessary because we need to wait for the graphql
    // response, even if it's a mocked one
    process.nextTick(() => {
      wrapper.update()
      done()
    })
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render 3 slide items', () => {
    expect(wrapper.find('.vtex-shelf').length).toBe(1)
    expect(wrapper.find('.vtex-shelf div div')).toBeDefined()
  })
})
