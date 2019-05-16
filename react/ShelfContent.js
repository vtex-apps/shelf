import PropTypes from 'prop-types'
import { path, min } from 'ramda'
import React, { Component } from 'react'
import { IconCaret } from 'vtex.store-icons'
import classNames from 'classnames'
import { NoSSR } from 'vtex.render-runtime'
import {
  Slider,
  Slide,
  Dots,
  SliderContainer,
  resolveSlidesNumber,
} from 'vtex.slider'
import { Pixel } from 'vtex.pixel-manager/PixelContext'

import { getGapPaddingValues } from './paddingEnum'
import ScrollTypes from './ScrollTypes'
import ShelfItem from './ShelfItem'
import { shelfItemPropTypes } from './propTypes'

import shelf from './shelf.css'

const SLIDER_WIDTH_ONE_ELEMENT = 320
const SLIDER_WIDTH_TWO_ELEMENTS = 500
const SLIDER_WIDTH_THREE_ELEMENTS = 750
const SLIDER_WIDTH_FIVE_ELEMENTS = 1290
const SLIDER_WIDTH_FOUR_ELEMENTS = 1000
const DEFAULT_SHELF_ITEM_WIDTH = 260
const ITEMS_TO_FULL_WIDTH = 5

/**
 * ShelfContent Component. Executes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
class ShelfContent extends Component {
  constructor(props) {
    super(props)
    this.perPage = {
      [SLIDER_WIDTH_FIVE_ELEMENTS]: 5,
      [SLIDER_WIDTH_FOUR_ELEMENTS]: 4,
      [SLIDER_WIDTH_THREE_ELEMENTS]: 3,
      [SLIDER_WIDTH_TWO_ELEMENTS]: 2,
      [SLIDER_WIDTH_ONE_ELEMENT]: 1,
    }
    this.calcItemsPerPage()
    this.state = {
      currentSlide: 0,
      firstRender: true,
    }
  }

  calcItemsPerPage = () => {
    const { itemsPerPage } = this.props
    for (let key in this.perPage) {
      if (this.perPage[key] > itemsPerPage) delete this.perPage[key]
    }
  }

  handleChangeSlide = i => {
    this.setState({ currentSlide: i })
  }

  get sliderWidth() {
    const { width, products } = this.props

    const items = min(
      resolveSlidesNumber(this.perPage),
      products && products.length
    )
    const slider = items * DEFAULT_SHELF_ITEM_WIDTH

    if (items >= ITEMS_TO_FULL_WIDTH || width <= slider) return width

    return slider
  }

  componentDidMount() {
    this.setState({ firstRender: false })
    this.pushPixelProductsImpressions()
  }

  arrowRender = ({ orientation, onClick }) => {
    const { gap } = this.props
    const containerClasses = classNames(
      shelf.arrow,
      'pointer z-1 flex absolute',
      {
        [`${shelf.arrowLeft} left-0 ${gap}`]: orientation === 'left',
        [`${shelf.arrowRight} right-0 ${gap}`]: orientation === 'right',
      }
    )
    return (
      <div className={containerClasses} onClick={onClick}>
        <IconCaret orientation={orientation} thin size={20} />
      </div>
    )
  }

  pushPixelProductsImpressions = () => {
    const { products } = this.props
    if (products)
      products.forEach((product, index) => {
        this.props.push({
          event: 'productImpression',
          list: 'Home Page Shelf',
          position: index + 1,
          product,
        })
      })
  }

  render() {
    const { products, maxItems, scroll, gap, arrows, summary } = this.props

    const { firstRender } = this.state

    const isScrollByPage = scroll === ScrollTypes.BY_PAGE.value
    const style = !firstRender ? { width: this.sliderWidth } : {}

    const productList =
      !products || !products.length ? Array(maxItems).fill(null) : products

    const { currentSlide } = this.state

    return (
      <div className="flex justify-center">
        <SliderContainer style={style} className="mw9">
          <Slider
            perPage={this.perPage}
            onChangeSlide={this.handleChangeSlide}
            currentSlide={currentSlide}
            arrowRender={arrows && this.arrowRender}
            scrollByPage={isScrollByPage}
            duration={500}
            loop
            easing="ease"
          >
            {productList.slice(0, maxItems).map((item, index) => (
              <Slide
                sliderTransitionDuration={500}
                className={classNames('justify-center h-100', gap)}
                key={path(['productId'], item) || index}
                defaultWidth={DEFAULT_SHELF_ITEM_WIDTH}
              >
                <ShelfItem item={item} summary={summary} />
              </Slide>
            ))}
          </Slider>
          <NoSSR>
            <Dots
              loop
              showDotsPerPage={isScrollByPage}
              perPage={this.perPage}
              currentSlide={currentSlide}
              totalSlides={productList.slice(0, maxItems).length}
              onChangeSlide={this.handleChangeSlide}
              classes={{
                root: 'pt4',
                notActiveDot: 'bg-muted-3',
                dot: classNames(shelf.dot, 'mh2 mv0 pointer br-100'),
                activeDot: 'bg-emphasis',
              }}
            />
          </NoSSR>
        </SliderContainer>
      </div>
    )
  }
}

export const propTypes = {
  /** List of products */
  products: PropTypes.arrayOf(shelfItemPropTypes.item),
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

ShelfContent.defaultProps = {
  itemsPerPage: 5,
}

ShelfContent.propTypes = propTypes

export default Pixel(ShelfContent)
