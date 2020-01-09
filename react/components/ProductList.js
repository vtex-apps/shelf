import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'
import { useProductImpression } from 'vtex.product-list-context'

import {
  productListSchemaPropTypes,
  shelfItemPropTypes,
} from '../utils/propTypes'
import ScrollTypes, {
  getScrollNames,
  getScrollValues,
} from '../utils/ScrollTypes'
import GapPaddingTypes, {
  getGapPaddingNames,
  getGapPaddingValues,
} from '../utils/paddingEnum'
import ShelfContent from './ShelfContent'

const CSS_HANDLES = ['title']

const DEFAULT_MAX_ITEMS = 10
const DEFAULT_ITEMS_PER_PAGE = 5
const DEFAULT_MIN_ITEMS_PER_PAGE = 1

/**
 * Product List Component. Shows a collection of products.
 */
const ProductList = ({
  products,
  maxItems,
  titleText,
  arrows,
  scroll,
  minItemsPerPage,
  itemsPerPage,
  summary,
  isMobile,
  gap,
  showTitle,
  paginationDotsVisibility,
}) => {
  useProductImpression()
  const handles = useCssHandles(CSS_HANDLES)
  return products && !products.length ? null : (
    <Fragment>
      {showTitle && (
        <div
          className={`${handles.title} t-heading-2 fw3 w-100 flex justify-center pt7 pb6 c-muted-1`}
        >
          <IOMessage id={titleText} />
        </div>
      )}
      <ReactResizeDetector handleWidth>
        {width => (
          <ShelfContent
            products={products}
            maxItems={maxItems}
            arrows={arrows}
            scroll={scroll}
            paginationDotsVisibility={paginationDotsVisibility}
            minItemsPerPage={minItemsPerPage}
            itemsPerPage={itemsPerPage}
            summary={summary}
            isMobile={isMobile}
            width={width}
            gap={gap}
          />
        )}
      </ReactResizeDetector>
    </Fragment>
  )
}

ProductList.getSchema = () => {
  return {
    title: 'admin/editor.shelf.title',
    description: 'admin/editor.shelf.description',
    type: 'object',
    properties: {
      maxItems: {
        title: 'admin/editor.shelf.maxItems.title',
        type: 'number',
        default: ProductList.defaultProps.maxItems,
        isLayout: true,
      },
      gap: {
        title: 'admin/editor.shelf.gap.title',
        type: 'string',
        enum: getGapPaddingValues(),
        enumNames: getGapPaddingNames(),
        default: GapPaddingTypes.SMALL.value,
        isLayout: true,
      },
      itemsPerPage: {
        title: 'admin/editor.shelf.itemsPerPage.title',
        type: 'number',
        enum: [3, 4, 5],
        default: ProductList.defaultProps.itemsPerPage,
        isLayout: true,
      },
      scroll: {
        title: 'admin/editor.shelf.scrollType.title',
        type: 'string',
        enum: getScrollValues(),
        enumNames: getScrollNames(),
        default: ScrollTypes.BY_PAGE.value,
        isLayout: true,
      },
      arrows: {
        title: 'admin/editor.shelf.arrows.title',
        type: 'boolean',
        default: ProductList.defaultProps.arrows,
        isLayout: true,
      },
      showTitle: {
        title: 'admin/editor.shelf.titleText.showTitle',
        type: 'boolean',
        default: ProductList.defaultProps.showTitle,
        isLayout: true,
      },
    },
  }
}

ProductList.defaultProps = {
  maxItems: DEFAULT_MAX_ITEMS,
  minItemsPerPage: DEFAULT_MIN_ITEMS_PER_PAGE,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  scroll: ScrollTypes.BY_PAGE.value,
  gap: GapPaddingTypes.SMALL.value,
  arrows: true,
  showTitle: true,
  titleText: null,
  isMobile: false,
}

ProductList.propTypes = {
  /** Loading status */
  loading: PropTypes.bool,
  /** Graphql data response. */
  products: PropTypes.arrayOf(shelfItemPropTypes.item),
  /** Verifies if is a mobile device. */
  isMobile: PropTypes.bool,
  /** Should display navigation dots below the Shelf */
  paginationDotsVisibility: PropTypes.oneOf([
    'visible',
    'hidden',
    'desktopOnly',
    'mobileOnly',
  ]),
  ...productListSchemaPropTypes,
}

export default ProductList
