import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Dots, Arrow } from '@vtex/slick-components'
import { NoSSR } from 'render'

import ShelfItem from './ShelfItem'

import VTEXClasses from './CustomClasses'
import ScrollTypes from './ScrollTypes'

const DEFAULT_SHELF_ITEM_WIDTH = 281
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
    return this._slick && this._slick.innerSlider && this._slick.innerSlider.list.clientWidth
  }

  /**
   * Makes the slider width to adapt with the Shelf Header width.
   */
  updateSlickSliderWidth() {
    if (this._slick && this._slick.innerSlider) {
      const innerSliderElement = this._slick.innerSlider.list.parentNode
      const shelfHeaderWidth = innerSliderElement.parentNode.clientWidth
      innerSliderElement.setAttribute('style', `width:${shelfHeaderWidth}px;`)
    }
  }

  getShelfItemWidth() {
    let shelfItemWidth = DEFAULT_SHELF_ITEM_WIDTH
    if (this._slick) {
      const nodes = this._slick.innerSlider.list.childNodes[0].childNodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes[i].attributes.length; j++) {
          const attr = nodes[i].attributes[j]
          if (attr.nodeName === 'data-index' && attr.nodeValue === '0' && nodes[i].childNodes[0]) {
            shelfItemWidth = nodes[i].childNodes[0].clientWidth
          }
        }
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
    this.updateSlickSliderWidth()
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

  render() {
    const { products, maxItems, summary, itemsPerPage } = this.props
    const slideSettings = this.configureSlideSettings(products.length)
    const fallback = (
      <div className="flex justify-between ph7">
        {products.slice(0, itemsPerPage).map(item => {
          return (
            <div key={item.productId} className={`${VTEXClasses.SLIDE_CLASS} pa4`}>
              <ShelfItem extensionId="shelfitem" item={item} summary={summary} />
            </div>
          )
        })}
      </div>
    )

    return (
      <NoSSR onSSR={fallback}>
        <Slider {...slideSettings} ref={function(c) { this._slick = c }.bind(this)}>
          {
            products.slice(0, maxItems).map(item => {
              return (
                <div key={item.productId} className={`${VTEXClasses.SLIDE_CLASS} pa4`}>
                  <ShelfItem extensionId="shelfitem" item={item} summary={summary} />
                </div>
              )
            })
          }
        </Slider>
      </NoSSR>
    )
  }
}

ShelfContent.propTypes = {
  products: PropTypes.arrayOf(ShelfItem.propTypes.item),
  itemsPerPage: PropTypes.number.isRequired,
  maxItems: PropTypes.number.isRequired,
  arrows: PropTypes.bool.isRequired,
  scroll: PropTypes.string.isRequired,
  summary: PropTypes.any,
}

export default ShelfContent
