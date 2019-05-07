import PropTypes from 'prop-types'
import { path } from 'ramda'
import React from 'react'
import { SliderNext } from 'vtex.slider'

import { getGapPaddingValues } from './paddingEnum'
import ShelfItem from './ShelfItem'

import styles from './shelf.css'

/**
 * ShelfContent Component. Executes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
const ShelfContent = ({ products, maxItems, summary, itemsPerPage }) => {
  const productList =
    !products || !products.length ? Array(maxItems).fill(null) : products

  const ssr = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return (
    <div className="flex justify-center">
      <SliderNext
        ssr={ssr}
        infinite
        showDots
        itemClass="pa2"
        sliderClass="mb7"
        slideVisibleSlides
        containerClass="w-90"
      >
        {productList.slice(0, maxItems).map((item, index) => (
          <ShelfItem
            key={path(['productId'], item) || index}
            item={item}
            summary={summary}
          />
        ))}
      </SliderNext>
    </div>
  )
}

ShelfContent.defaultProps = {
  itemsPerPage: 5,
}

ShelfContent.propTypes = {
  /** List of products */
  products: PropTypes.arrayOf(ShelfItem.propTypes.item),
  /** Max Items per page */
  itemsPerPage: PropTypes.number.isRequired,
  /** Max items in shelf */
  maxItems: PropTypes.number.isRequired,
  /** Show Arrows */
  arrows: PropTypes.bool.isRequired,
  /** Scroll type */
  scroll: PropTypes.string.isRequired,
  /** Container width */
  width: PropTypes.number,
  /** Props to ProductsSummary */
  summary: PropTypes.any,
  /** Is mobile */
  isMobile: PropTypes.bool,
  /** Gap between Shelf Items */
  gap: PropTypes.oneOf(getGapPaddingValues()),
}

export default ShelfContent
