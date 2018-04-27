import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Slider from 'react-slick'
import { Dots, Arrow } from '@vtex/slick-components'
import ShelfItem from './ShelfItem'

import VTEXClasses from './CustomClasses'
import ScrollTypes from './ScrollTypes'

const SLIDER_MARGIN = 66
const DEFAULT_SHELF_ITEM_WIDTH = 395
const DOTS_LARGE_VIEWPORT = true
const MINIMUM_NUMBER_OF_ITEMS_PER_PAGE = 1

const BREAKPOINT_MOBILE_VIEWPORT = 600
const SLIDER_CENTER_MODE_MOBILE = true
const ARROWS_MOBILE_VIEWPORT = false
const DOTS_MOBILE_VIEWPORT = false
const SLIDES_TO_SCROLL_MOBILE_VIEWPORT = 1
const SLIDES_TO_SHOW_MOBILE_VIEWPORT = 1

const BREAKPOINT_EXTRA_SMALL_MOBILE_VIEWPORT = 350
const DOTS_EXTRA_SMALL_MOBILE_VIEWPORT = true
const SLIDER_CENTER_MODE_EXTRA_SMALL_MOBILE = false
/**
 * ShelfContent Component. Executes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
class ShelfContent extends Component {
  resizeListener = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }

  getSlideListWidth() {
    const bodyElement = document.querySelector('body')
    if (bodyElement && bodyElement.clientWidth) {
      return bodyElement.clientWidth - SLIDER_MARGIN
    }
    return null
  }

  getShelfItemWidth() {
    const selector = `.${VTEXClasses.MAIN_CLASS} .slick-slide[data-index="0"]`
    const slickSlildeElement = document.querySelector(selector)
    let shelfItemWidth = DEFAULT_SHELF_ITEM_WIDTH
    if (slickSlildeElement) {
      const slideChilds = slickSlildeElement.childNodes
      if (slideChilds && slideChilds.length) {
        shelfItemWidth = slideChilds[0].clientWidth
      }
    }
    return shelfItemWidth
  }

  getCorrectItemsPerPage = () => {
    const slideListWidth = this.getSlideListWidth()
    if (slideListWidth) {
      const shelfItemWidth = this.getShelfItemWidth()
      const maxItemsPerPage = Math.floor(slideListWidth / shelfItemWidth)
      if (this.props.itemsPerPage >= maxItemsPerPage) {
        return maxItemsPerPage || 1
      }
    }
    return this.props.itemsPerPage
  }

  configureSlideSettings(itemsLength) {
    const { arrows, scroll } = this.props
    const itemsPerPage = this.getCorrectItemsPerPage() || MINIMUM_NUMBER_OF_ITEMS_PER_PAGE
    return {
      infinite: itemsPerPage < itemsLength,
      slidesToShow: itemsPerPage,
      slidesToScroll: scroll === ScrollTypes.BY_PAGE.value ? itemsPerPage : MINIMUM_NUMBER_OF_ITEMS_PER_PAGE,
      dots: DOTS_LARGE_VIEWPORT,
      arrows,
      nextArrow: <Arrow cssClass={VTEXClasses.ARROW_RIGHT_CLASS} />,
      prevArrow: <Arrow cssClass={VTEXClasses.ARROW_LEFT_CLASS} />,
      appendDots: dots => <Dots dots={dots} cssClass={VTEXClasses.DOTS_CLASS} />,
      responsive: [
        {
          breakpoint: BREAKPOINT_MOBILE_VIEWPORT,
          settings: {
            slidesToShow: SLIDES_TO_SHOW_MOBILE_VIEWPORT,
            slidesToScroll: SLIDES_TO_SCROLL_MOBILE_VIEWPORT,
            arrows: ARROWS_MOBILE_VIEWPORT,
            dots: DOTS_MOBILE_VIEWPORT,
            centerMode: SLIDER_CENTER_MODE_MOBILE,
          },
        },
        {
          breakpoint: BREAKPOINT_EXTRA_SMALL_MOBILE_VIEWPORT,
          settings: {
            slidesToShow: SLIDES_TO_SHOW_MOBILE_VIEWPORT,
            slidesToScroll: SLIDES_TO_SCROLL_MOBILE_VIEWPORT,
            arrows: ARROWS_MOBILE_VIEWPORT,
            dots: DOTS_EXTRA_SMALL_MOBILE_VIEWPORT,
            centerMode: SLIDER_CENTER_MODE_EXTRA_SMALL_MOBILE,
          },
        },
      ],
    }
  }

  isEditMode() {
    return !!document.querySelector('.vtex-button .items-center .pl4 svg')
  }

  render() {
    const { products, maxItems } = this.props
    const slideSettings = this.configureSlideSettings(products.length)
    const itemsPerPage = this.getCorrectItemsPerPage() || MINIMUM_NUMBER_OF_ITEMS_PER_PAGE
    let productList = []
    if (this.isEditMode()) {
      if (!products || !products.length) {
        productList = Array(itemsPerPage).fill()
      } else {
        productList = products.slice(0, itemsPerPage)
      }
    }
    return this.isEditMode() ? (
      <div className="flex">
        {
          productList.map((item, i) => {
            return (
              <div key={`slide${i}`} className={`${VTEXClasses.ITEM_EDIT_MODE} pa4`}>
                <ShelfItem extensionId="shelfitem" item={item} />
              </div>
            )
          })
        }
      </div>
    ) : (
      <Slider {...slideSettings}>
        {
          products.slice(0, maxItems).map(item => {
            return (
              <div key={item.productId} className={`${VTEXClasses.SLIDE_CLASS} pa4`}>
                <ShelfItem extensionId="shelfitem" item={item} />
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
