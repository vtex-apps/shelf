import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Slider from 'react-slick'
import { Dots, Arrow } from '@vtex/slick-components'
import ShelfItem from './ShelfItem'

import VTEXClasses from './CustomClasses'
import ScrollTypes from './ScrollTypes'

const BREAKPOINT_MOBILE_VIEWPORT = 600

const DOTS_LARGE_VIEWPORT = true
const DOTS_MOBILE_VIEWPORT = false
const ARROWS_MOBILE_VIEWPORT = false
const SLIDER_CENTER_MODE_MOBILE = true

const SLIDER_MARGIN = 66
const DEFAULT_SHELF_ITEM_WIDTH = 395

/**
 * ShelfContent Component. Executes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
class ShelfContent extends Component {
  constructor(props) {
    super(props)
    window.addEventListener('resize', () => {
      if (this._isMounted) {
        this.forceUpdate()
      }
    })
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
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
    const itemsPerPage = this.getCorrectItemsPerPage() || 1
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
          breakpoint: BREAKPOINT_MOBILE_VIEWPORT,
          settings: {
            centerMode: SLIDER_CENTER_MODE_MOBILE,
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
          <ShelfItem extentionId="shelfitem" />
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
