import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Slider from 'react-slick'
import { Dots, Arrow } from '@vtex/slick-components'
import ShelfItem from './ShelfItem'

import VTEXClasses from './CustomClasses'
import ScrollTypes from './ScrollTypes'

const BREAKPOINT_MEDIUM_VIEWPORT = 1024
const BREAKPOINT_MOBILE_VIEWPORT = 600

const MAX_ITEMS_MEDIUM_VIEWPORT = 3
const MAX_ITEMS_MOBILE_VIEWPORT = 1

const DOTS_LARGE_VIEWPORT = true
const DOTS_MOBILE_VIEWPORT = false
const ARROWS_MOBILE_VIEWPORT = false
const SLIDER_CENTER_MODE_MOBILE = true

const PLACEHOLDER_PRODUCT = {
  productId: '1',
  productName: 'Product Sample',
  link: '#',
  brand: 'Brand Sample',
  items: [{
    name: 'Sku Sample',
    images: [{
      imageUrl: '',
      imageTag: '',
    }],
    sellers: [{
      commertialOffer: {
        Price: 200,
        ListPrice: 200,
      },
    }],
  }],
}

/**
 * ShelfContent Component. Realizes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
class ShelfContent extends Component {
  configureSlideSettings(itemsLength) {
    const { arrows, scroll, itemsPerPage } = this.props

    return {
      infinite: itemsPerPage < itemsLength,
      slidesToShow: itemsPerPage,
      slidesToScroll: scroll === ScrollTypes.BY_PAGE.value ? itemsPerPage : 1,
      dots: DOTS_LARGE_VIEWPORT,
      arrows,
      nextArrow: <Arrow cssClass={VTEXClasses.ARROW_RIGHT_CLASS} />,
      prevArrow: <Arrow cssClass={VTEXClasses.ARROW_LEFT_CLASS} />,
      appendDots: dots => <Dots dots={dots} cssClass={VTEXClasses.DOTS_CLASS} />,
      responsive: [
        {
          breakpoint: BREAKPOINT_MEDIUM_VIEWPORT,
          settings: {
            infinite: MAX_ITEMS_MEDIUM_VIEWPORT < itemsLength,
            slidesToShow: MAX_ITEMS_MEDIUM_VIEWPORT,
            slidesToScroll: scroll === ScrollTypes.BY_PAGE.value
              ? MAX_ITEMS_MEDIUM_VIEWPORT : 1,
          },
        },
        {
          breakpoint: BREAKPOINT_MOBILE_VIEWPORT,
          settings: {
            infinite: MAX_ITEMS_MOBILE_VIEWPORT < itemsLength,
            centerMode: SLIDER_CENTER_MODE_MOBILE,
            slidesToShow: MAX_ITEMS_MOBILE_VIEWPORT,
            slidesToScroll: MAX_ITEMS_MOBILE_VIEWPORT,
            arrows: ARROWS_MOBILE_VIEWPORT,
            dots: DOTS_MOBILE_VIEWPORT,
          },
        },
      ],
    }
  }

  isEditMode() {
    return !!document.querySelector('.edit-mode')
  }

  render() {
    const { products, maxItems } = this.props
    const slideSettings = this.configureSlideSettings(products.length)
    if (this.isEditMode()) {
      if (products && products.length) {
        return (
          <div className={`${VTEXClasses.ITEM_EDIT_MODE} pa4`} key={products[0].productId}>
            <ShelfItem extentionId="shelfitem" item={products[0]} />
          </div>
        )
      }
      return (
        <div className={`${VTEXClasses.ITEM_EDIT_MODE} pa4`} key="1">
          <ShelfItem extentionId="shelfitem" item={PLACEHOLDER_PRODUCT} />
        </div>
      )
    }
    return (
      <Slider {...slideSettings}>
        {
          products.slice(0, maxItems).map(item => {
            return (
              <div key={item.productId} className={`${VTEXClasses.SLIDE_CLASS} pa4`}>
                <ShelfItem extentionId="shelfitem" item={item} />
              </div>
            )
          })
        }
      </Slider>
    )
  }
}

ShelfContent.propTypes = {
  products: PropTypes.arrayOf(ShelfItem.propTypes.item),
  itemsPerPage: PropTypes.number.isRequired,
  maxItems: PropTypes.number.isRequired,
  arrows: PropTypes.bool.isRequired,
  scroll: PropTypes.string.isRequired,
}

export default ShelfContent
