import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import Spinner from '@vtex/styleguide/lib/Spinner'
import ShelfContent from './ShelfContent'
import ScrollTypes, { getScrollNames, getScrollValues } from './ScrollTypes'
import OrdenationTypes, { getOrdenationNames, getOrdenationValues } from './OrdenationTypes'
import VTEXClasses from './CustomClasses'

import productsQuery from './graphql/productsQuery.gql'

const DEFAULT_MAX_ITEMS = 10
const DEFAULT_ITEMS_PER_PAGE = 5

/**
 * Shelf Component. Shows a collection of products.
 */
class Shelf extends Component {
  render() {
    const { data, maxItems, titleText, arrows, scroll, itemsPerPage } = this.props
    const products = !data || data['error'] ? [] : data.products
    return (
      <div className={`${VTEXClasses.MAIN_CLASS} ml7 mr7 pv4`}>
        <div className={`${VTEXClasses.TITLE_CONTENT_CLASS} w-100 flex justify-center`}>
          <h1 className={VTEXClasses.TITLE_TEXT_CLASS}> {titleText}</h1>
        </div>
        {
          data.loading ? (
            <div className="w-100 flex justify-center">
              <div className="w3 ma0">
                <Spinner />
              </div>
            </div>
          ) : (
            <ShelfContent
              products={products}
              maxItems={maxItems}
              arrows={arrows}
              scroll={scroll}
              itemsPerPage={itemsPerPage} />
          )
        }
      </div>
    )
  }
}

Shelf.defaultProps = {
  maxItems: DEFAULT_MAX_ITEMS,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  scroll: ScrollTypes.BY_PAGE.value,
  arrows: true,
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
      enum: getOrdenationValues(),
      enumNames: getOrdenationNames(),
      default: OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
    },
    maxItems: {
      title: 'Max Items',
      type: 'number',
      default: Shelf.defaultProps.maxItems,
    },
    itemsPerPage: {
      title: 'Items Per Page',
      type: 'number',
      enum: [3, 4, 5],
      default: Shelf.defaultProps.itemsPerPage,
    },
    scroll: {
      title: 'Scroll Type',
      type: 'string',
      enum: getScrollValues(),
      enumNames: getScrollNames(),
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

Shelf.propTypes = {
  /** Graphql data response. */
  data: PropTypes.shape({
    products: ShelfContent.propTypes.products,
  }),
  /** Category Id. */
  category: PropTypes.number,
  /** Collection Id. */
  collection: PropTypes.number,
  /** Ordenation Type. */
  orderBy: PropTypes.oneOf(getOrdenationValues()),
  /** Maximum number of items in the shelf. */
  maxItems: PropTypes.number.isRequired,
  /** Maximum number of items in a page. */
  itemsPerPage: PropTypes.number.isRequired,
  /** Scroll options. */
  scroll: PropTypes.oneOf(getScrollValues()),
  /** If the arrows are showable or not. */
  arrows: PropTypes.bool.isRequired,
  /** Text value of the title. */
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
