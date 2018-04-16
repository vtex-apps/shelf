/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'
import { MockedProvider } from 'react-apollo/test-utils'

import Shelf from '../Shelf'
import productsQuery from '../graphql/productsQuery.gql'
import gql from 'graphql-tag';

describe('Shelf component', () => {
  let wrapper

  beforeEach( (done) => {
    const mockedProducts = [
      {
        productId: '1',
        productName: 'Product1',
        items: [{
          images: [{
            imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
          }],
          sellers: [{
            commertialOffer: {
              Price: 400,
            },
          }],
        }],
      },
      {
        productId: '2',
        productName: 'Product2',
        items: [{
          images: [{
            imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
          }],
          sellers: [{
            commertialOffer: {
              Price: 400,
            },
          }],
        }],
      },
      {
        productId: '3',
        productName: 'Product3',
        items: [{
          images: [{
            imageUrl: '//www.allfree-clipart.com/Business/computer.jpg',
          }],
          sellers: [{
            commertialOffer: {
              Price: 400,
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
    ).toBe(3)
  })
})
