import PropTypes from 'prop-types'
import { path, range } from 'ramda'
import React, { Component } from 'react'
import { IconCaret } from 'vtex.store-icons'
import classNames from 'classnames'
import {
  Slider,
  Slide,
  Dots,
  SliderContainer,
  resolveSlidesNumber,
} from 'vtex.slider'

import { getGapPaddingValues } from './paddingEnum'
import ScrollTypes from './ScrollTypes'
import ShelfItem from './ShelfItem'

import shelf from './shelf.css'
import { forEach } from 'iterall'

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
    this.state = {
      currentSlide: 0,
      firstRender: true,
    }
  }

  // calcPerPage = () => {
  //   const { itemsPerPage } = this.props
  //   range(1, itemsPerPage + 1).forEach(index => {
  //     this.perPage[index] = index
  //   })
  // }

  handleChangeSlide = i => {
    this.setState({ currentSlide: i })
  }

  get sliderWidth() {
    const { width } = this.props

    const items = resolveSlidesNumber(this.perPage)
    const slider = items * DEFAULT_SHELF_ITEM_WIDTH

    if (items >= ITEMS_TO_FULL_WIDTH || width <= slider) return width

    return slider
  }

  componentDidMount() {
    this.setState({ firstRender: false })
  }

  arrowRender = ({ orientation, onClick }) => {
    const containerClasses = classNames(
      shelf.arrow,
      'pointer z-1 flex absolute',
      {
        [`${shelf.arrowLeft} left-0`]: orientation === 'left',
        [`${shelf.arrowRight} right-0`]: orientation === 'right',
      }
    )
    return (
      <div className={containerClasses} onClick={onClick}>
        <IconCaret orientation={orientation} thin size={25} />
      </div>
    )
  }

  ArrowContainerRender = ({ children }) => {
    const wrapperClasses = classNames(
      shelf.arrowsContainerWrapper,
      'w-100 h-100 absolute left-0 top-0 flex justify-center'
    )
    const containerClasses = classNames(
      shelf.arrowsContainer,
      'w-100 h-100 mw9 flex-ns justify-between items-center dn-s'
    )

    return (
      <div className={wrapperClasses}>
        <Container className={containerClasses}>{children}</Container>
      </div>
    )
  }

  render() {
    const {
      products,
      maxItems,
      scroll,
      gap,
      width,
      arrows,
      summary,
    } = this.props

    const { firstRender } = this.state

    const isScrollByPage = scroll === ScrollTypes.BY_PAGE.value

    const isFullWidth = width === this.sliderWidth

    const style = {
      width: '100%',
    }
    const productList =
      !products || !products.length ? Array(maxItems).fill(null) : products

    const { currentSlide } = this.state

    return (
      <div className="vtex-shelf__content flex justify-center">
        <SliderContainer
          style={!firstRender ? { width: this.sliderWidth } : {}}
          className="mw9"
        >
          <Slider
            perPage={this.perPage}
            onChangeSlide={this.handleChangeSlide}
            currentSlide={currentSlide}
            arrowRender={arrows && this.arrowRender}
            scrollByPage={isScrollByPage}
            duration={400}
            loop
          >
            {productList.slice(0, maxItems).map((item, index) => (
              <Slide
                sliderTransitionDuration={400}
                className={classNames('justify-center h-100', gap)}
                key={path(['productId'], item) || index}
                defaultWidth={DEFAULT_SHELF_ITEM_WIDTH}
              >
                <ShelfItem item={item} summary={summary} />
              </Slide>
            ))}
          </Slider>
          <Dots
            loop
            showDotsPerPage
            perPage={this.perPage}
            currentSlide={currentSlide}
            totalSlides={products.length}
            onChangeSlide={this.handleChangeSlide}
            classes={{
              root: 'pt4',
              notActiveDot: 'bg-muted-3',
              dot: classNames(shelf.dot, 'mh2 mv0 pointer br-100'),
              activeDot: 'bg-emphasis',
            }}
          />
        </SliderContainer>
      </div>
    )
  }
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
