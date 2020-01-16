import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { IOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

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
import ProductListEventCaller from './ProductListEventCaller'

const CSS_HANDLES = ['title']

const DEFAULT_MAX_ITEMS = 10
const DEFAULT_ITEMS_PER_PAGE = 5
const DEFAULT_MIN_ITEMS_PER_PAGE = 1

/**
 * Product List Component. Shows a collection of products.
 */
const ProductList = ({
  gap,
  arrows,
  scroll,
  summary,
  maxItems,
  products,
  isMobile,
  autoplay,
  showTitle,
  titleText,
  itemsPerPage,
  navigationStep,
  minItemsPerPage,
  paginationDotsVisibility,
}) => {
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
            gap={gap}
            width={width}
            arrows={arrows}
            scroll={scroll}
            summary={summary}
            products={products}
            maxItems={maxItems}
            isMobile={isMobile}
            autoplay={autoplay}
            itemsPerPage={itemsPerPage}
            navigationStep={navigationStep}
            minItemsPerPage={minItemsPerPage}
            paginationDotsVisibility={paginationDotsVisibility}
          />
        )}
      </ReactResizeDetector>
      <ProductListEventCaller />
    </Fragment>
  )
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

ProductList.schema = {
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

export default ProductList
