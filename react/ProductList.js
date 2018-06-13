import './global.css'

import Spinner from '@vtex/styleguide/lib/Spinner'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProductSummary from 'vtex.product-summary/ProductSummary'

import VTEXClasses from './CustomClasses'
import { productListSchemaPropTypes } from './propTypes'
import ScrollTypes, { getScrollNames, getScrollValues } from './ScrollTypes'
import ShelfContent from './ShelfContent'

const DEFAULT_MAX_ITEMS = 10
const DEFAULT_ITEMS_PER_PAGE = 5

/**
 * Product List Component. Shows a collection of products.
 */
export default class ProductList extends Component {
  render() {
    const {
      products,
      loading,
      maxItems,
      titleText,
      arrows,
      scroll,
      itemsPerPage,
      summary,
    } = this.props
    return (
      <div className={`${VTEXClasses.MAIN_CLASS} ml7 mr7 pv4 pb7`}>
        <div
          className={`${
            VTEXClasses.TITLE_CONTENT_CLASS
          } w-100 flex justify-center`}>
          <h1 className={VTEXClasses.TITLE_TEXT_CLASS}> {titleText}</h1>
        </div>
        {loading ? (
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
            itemsPerPage={itemsPerPage}
            summary={summary}
          />
        )}
      </div>
    )
  }
}

ProductList.getSchema = props => {
  return {
    title: 'editor.shelf.title',
    description: 'editor.shelf.description',
    type: 'object',
    properties: {
      maxItems: {
        title: 'editor.shelf.maxItems.title',
        type: 'number',
        default: ProductList.defaultProps.maxItems,
      },
      itemsPerPage: {
        title: 'editor.shelf.itemsPerPage.title',
        type: 'number',
        enum: [3, 4, 5],
        default: ProductList.defaultProps.itemsPerPage,
      },
      scroll: {
        title: 'editor.shelf.scrollType.title',
        type: 'string',
        enum: getScrollValues(),
        enumNames: getScrollNames(),
        default: ScrollTypes.BY_PAGE.value,
      },
      arrows: {
        title: 'editor.shelf.arrows.title',
        type: 'boolean',
        default: ProductList.defaultProps.arrows,
      },
      titleText: {
        title: 'editor.shelf.titleText.title',
        type: 'string',
        default: 'Default Title',
      },
      summary: {
        title: 'editor.shelf.summary.title',
        type: 'object',
        properties: ProductSummary.getSchema(props).properties,
      },
    },
  }
}

ProductList.defaultProps = {
  maxItems: DEFAULT_MAX_ITEMS,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  scroll: ScrollTypes.BY_PAGE.value,
  arrows: true,
  titleText: 'Default Title',
}

ProductList.propTypes = {
  /** Loading status */
  loading: PropTypes.bool,
  /** Graphql data response. */
  products: ShelfContent.propTypes.products,
  ...productListSchemaPropTypes,
}
