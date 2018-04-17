import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import Slider from 'react-slick'
import ShelfItem from './ShelfItem'
import Arrow from './Arrow'
import Dots from './Dots'
import Spinner from '@vtex/styleguide/lib/Spinner'
import Card from '@vtex/styleguide/lib/Card'
import spinnerStyle from '@vtex/styleguide/lib/Spinner/style.css'

import productsQuery from './graphql/productsQuery.gql'

/**
 * Shelf Component. Shows a collection of products.
 */
class Shelf extends Component {
  configureSettings() {
    const { arrows, scroll } = this.props
    
    return {
      slidesToShow: 5,
      slidesToScroll: scroll === 'BY_PAGE' ? 5 : 1,
      dots: true,
      arrows,
      nextArrow: <Arrow color="#000" />,
      prevArrow: <Arrow color="#000" />,
      infinite: false,
      appendDots: dots => <Dots color="#000" dots={dots} />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: scroll === 'BY_PAGE' ? 3 : 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
  }

  render() {
    const { data, maxItems, titleText } = this.props
    const products = !data || data['error'] ? [] : data.products
    const slideSettings = this.configureSettings()

    return (
      <div className="ml7 mr7 pv4 vtex-shelf">
        <div className="w-100 flex justify-center">
          <h1>{titleText}</h1>
        </div>
        {
          data.loading && (
            <div className="w-100 flex justify-center">
              <div className="w3 ma0">
                <Spinner style={spinnerStyle} />
              </div>
            </div>
          )}
        {
          !data.loading && products && (
            <Slider {...slideSettings}>
              {products.slice(0, maxItems).map(item => {
                return (
                  <div key={item.productId} className="pa4">
                    <Card>
                      <ShelfItem {...item} imageHeight={200} />
                    </Card>
                  </div>
                )
              })}
            </Slider>
          )}
      </div>
    )
  }
}

Shelf.schema = {
  title: 'Shelf',
  description: 'A product shelf featuring a collection',
  type: 'object',
  properties: {
    category: {
      title: 'Category',
      type: 'number'
    },
    collection: {
      title: 'Collection',
      type: 'number',
    },
    orderBy: {
      title: 'List Ordenation',
      type: 'string',
      enum: ['OrderByTopSaleDESC', 'OrderByPriceDESC', 'OrderByPriceASC'],
      enumNames: ['Sales', 'Price, descending', 'Price, ascending'],
      default: 'OrderByTopSaleDESC',
    },
    maxItems: {
      title: 'Max Items',
      type: 'number',
      default: 10,
    },
    scroll: {
      title: 'Scroll Type',
      type: 'string',
      enum: ['BY_PAGE', 'ONE_BY_ONE'],
      enumNames: ['By Page', 'One By One'],
      default: 'BY_PAGE',
    },
    arrows: {
      title: 'Arrows',
      type: 'boolean',
      default: true,
    },
    titleText: {
      title: 'Title Text',
      type: 'string',
      default: 'Default Title',
    },
  },
}

Shelf.defaultProps = {
  maxItems: 10,
  scroll: 'BY_PAGE',
  arrows: true
}

Shelf.propTypes = {
  /** The graphql data response. */
  data: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({
      productId: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.shape({
          imageUrl: PropTypes.string.isRequired
        })).isRequired,
        sellers: PropTypes.arrayOf(PropTypes.shape({
          commertialOffer: PropTypes.shape({
            Price: PropTypes.number.isRequired
          })
        })).isRequired
      })),
    })),
  }).isRequired,
  /** The Category Id. */
  category: PropTypes.number,
  /** The Collection Id. */
  collection: PropTypes.number,
  /** The Ordenation Type. */
  orderBy: PropTypes.string,
  /** Maximum number of items in the shelf. */
  maxItems: PropTypes.number.isRequired,
  /** The scroll options. */
  scroll: PropTypes.string.isRequired,
  /** The Collection Id. */
  arrows: PropTypes.bool.isRequired,
  /** The text value of the title. */
  titleText: PropTypes.string,
}

const options = {
  options: ({
    category,
    collection,
    orderBy,
    maxItems = Shelf.defaultProps.maxItems,
  }) => ({
    variables: {
      category,
      collection,
      orderBy,
      from: 0,
      to: maxItems - 1,
      specificationFilters: [],
    },
    ssr: false,
  }),
}

export default graphql(productsQuery, options)(Shelf)
