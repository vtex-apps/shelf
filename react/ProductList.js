import './global.css'

import PropTypes from 'prop-types'
import { identity, path } from 'ramda'
import React, { Component, Fragment } from 'react'
import ProductSummary from 'vtex.product-summary/index'
import { FormattedMessage } from 'react-intl'
import ReactResizeDetector from 'react-resize-detector'
import { productListSchemaPropTypes } from './propTypes'
import ScrollTypes, { getScrollNames, getScrollValues } from './ScrollTypes'
import GapPaddingTypes, { getGapPaddingNames, getGapPaddingValues } from './paddingEnum'
import ShelfContent from './ShelfContent'
import ShelfItem from './ShelfItem'

import shelf from './shelf.css'

const DEFAULT_MAX_ITEMS = 10
const DEFAULT_ITEMS_PER_PAGE = 5

function normalizeBuyable(product) {
  const items = path(['items'], product)
  const buyableItems =
    path(['length'], items) &&
    items
      .map(item => ({
        ...item,
        sellers: getBuyableSellers(item.sellers),
      }))
      .filter(item => path(['sellers', 'length'], item))

  return buyableItems
    ? {
      ...product,
      items: buyableItems,
    }
    : null
}

function getBuyableSellers(sellers) {
  return (
    path(['length'], sellers) &&
    sellers.filter(
      seller =>
        path(['sellerId'], seller)
    )
  )
}

/**
 * Product List Component. Shows a collection of products.
 */
class ProductList extends Component {
  render() {
    const {
      products,
      maxItems,
      titleText,
      arrows,
      scroll,
      itemsPerPage,
      summary,
      isMobile,
      gap,
    } = this.props

    const filteredProducts =
      products && products.map(normalizeBuyable).filter(identity)

    return products && !products.length ? null : (
      <Fragment>
        <div className={`${shelf.title} t-heading-2 fw3 w-100 flex justify-center pt7 pb6 c-muted-1`}>
          {titleText || <FormattedMessage id="shelf.title" />}
        </div>
        <ReactResizeDetector handleWidth handleHeight>
          {
            width => (
              <ShelfContent
                products={filteredProducts}
                maxItems={maxItems}
                arrows={arrows}
                scroll={scroll}
                itemsPerPage={itemsPerPage}
                summary={summary}
                isMobile={isMobile}
                width={width}
                gap={gap}
              />
            )
          }
        </ReactResizeDetector>
      </Fragment>
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
        isLayout: true,
      },
      gap: {
        title: 'editor.shelf.gap.title',
        type: 'string',
        enum: getGapPaddingValues(),
        enumNames: getGapPaddingNames(),
        default: GapPaddingTypes.SMALL.value,
        isLayout: true,
      },
      itemsPerPage: {
        title: 'editor.shelf.itemsPerPage.title',
        type: 'number',
        enum: [3, 4, 5],
        default: ProductList.defaultProps.itemsPerPage,
        isLayout: true,
      },
      scroll: {
        title: 'editor.shelf.scrollType.title',
        type: 'string',
        enum: getScrollValues(),
        enumNames: getScrollNames(),
        default: ScrollTypes.BY_PAGE.value,
        isLayout: true,
      },
      arrows: {
        title: 'editor.shelf.arrows.title',
        type: 'boolean',
        default: ProductList.defaultProps.arrows,
        isLayout: true,
      },
      titleText: {
        title: 'editor.shelf.titleText.title',
        type: 'string',
        default: ProductList.defaultProps.titleText,
        isLayout: false,
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
  gap: GapPaddingTypes.SMALL.value,
  arrows: true,
  titleText: null,
  isMobile: false,
}

ProductList.propTypes = {
  /** Loading status */
  loading: PropTypes.bool,
  /** Graphql data response. */
  products: PropTypes.arrayOf(ShelfItem.propTypes.item),
  /** Verifies if is a mobile device. */
  isMobile: PropTypes.bool,
  ...productListSchemaPropTypes,
}

export default ProductList
