import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import Spinner from '@vtex/styleguide/lib/Spinner'
import ShelfSlider from './ShelfSlider'
import ScrollTypes from './ScrollTypes'
import VTEXClasses from './CustomClasses'

import productsQuery from './graphql/productsQuery.gql'

const DEFAULT_MAX_ITEMS = 10

/**
 * Shelf Component. Shows a collection of products.
 */
class Shelf extends Component {
  render() {
    const { data, maxItems, titleText } = this.props
    const products = !data || data['error'] ? [] : data.products
    return (
      <div className={`ml7 mr7 pv4 ${VTEXClasses.MAIN_CLASS}`}>
        <div className={`${VTEXClasses.TITLE_CONTENT_CLASS} w-100 flex justify-center`}>
          <h1 className={VTEXClasses.TITLE_TEXT_CLASS}> {titleText}</h1>
        </div>
        {
          data.loading && (
            <div className="w-100 flex justify-center">
              <div className="w3 ma0">
                <Spinner />
              </div>
            </div>
          )
        }
        {
          !data.loading && products && (
            <ShelfSlider products={products} maxItems={maxItems}
              arrows={this.props.arrows} scroll={this.props.scroll} />
          )
        }
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
      type: 'number',
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
      default: Shelf.propTypes.maxItems,
    },
    scroll: {
      title: 'Scroll Type',
      type: 'string',
      enum: [ScrollTypes.BY_PAGE.value, ScrollTypes.ONE_BY_ONE.value],
      enumNames: [ScrollTypes.BY_PAGE.name, ScrollTypes.ONE_BY_ONE.name],
      default: ScrollTypes.BY_PAGE.value,
    },
    arrows: {
      title: 'Arrows',
      type: 'boolean',
      default: Shelf.defaultProps.arrows,
    },
    titleText: {
      title: 'Title Text',
      type: 'string',
      default: 'Default Title',
    },
  },
}

Shelf.defaultProps = {
  maxItems: DEFAULT_MAX_ITEMS,
  scroll: ScrollTypes.BY_PAGE,
  arrows: true,
}

Shelf.propTypes = {
  /** The graphql data response. */
  data: PropTypes.shape({
    products: ShelfSlider.propTypes.products,
  }),
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
      specificationFilters: [],
      orderBy,
      from: 0,
      to: maxItems - 1,
    },
    ssr: false,
  }),
}

export default graphql(productsQuery, options)(Shelf)
