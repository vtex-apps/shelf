import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { Component } from 'react'
import { IconCaret } from 'vtex.store-icons'
import classNames from 'classnames'
import { Slider, Slide, Dots, SliderContainer } from 'vtex.slider'

import { getGapPaddingValues } from './paddingEnum'
import ScrollTypes from './ScrollTypes'
import ShelfItem from './ShelfItem'

import shelf from './shelf.css'

const SLIDER_WIDTH_ONE_ELEMENT = 500
const SLIDER_WIDTH_TWO_ELEMENTS = 600
const SLIDER_WIDTH_THREE_ELEMENTS = 900
const SLIDER_WIDTH_MAX_ELEMENTS = 1300
const DEFAULT_SHELF_ITEM_WIDTH = 260

/**
 * ShelfContent Component. Executes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
class ShelfContent extends Component {
  state = {
    currentSlide: 0,
  }

  handleChangeSlide = i => {
    this.setState({ currentSlide: i })
  }

  arrowRender = ({ orientation, onClick }) => {
    const containerClasses = classNames(
      shelf.arrow,
      'pointer z-1 flex absolute',
      {
        [shelf.arrowLeft]: orientation === 'left',
        [shelf.arrowRight]: orientation === 'right',
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
      itemsPerPage,
      arrows,
      summary,
    } = this.props

    const isScrollByPage = scroll === ScrollTypes.BY_PAGE.value

    const isFullWidth = width === this.sliderWidth

    const style = {
      width: isFullWidth ? '100%' : DEFAULT_SHELF_ITEM_WIDTH,
    }
    const productList =
      !products || !products.length ? Array(maxItems).fill(null) : products

    const perPage = {
      [SLIDER_WIDTH_MAX_ELEMENTS]: itemsPerPage,
      [SLIDER_WIDTH_THREE_ELEMENTS]: 3,
      [SLIDER_WIDTH_TWO_ELEMENTS]: 2,
      [SLIDER_WIDTH_ONE_ELEMENT]: 1,
    }

    const { currentSlide } = this.state

    return (
      <div className="vtex-shelf__content flex justify-center ph5">
        <SliderContainer className="w-100 mw9 pv5">
          <Slider
            perPage={perPage}
            onChangeSlide={this.handleChangeSlide}
            currentSlide={currentSlide}
            arrowRender={arrows && this.arrowRender}
            scrollByPage={isScrollByPage}
            loop
          >
            {productList.slice(0, maxItems).map((item, index) => (
              <Slide
                className={classNames('justify-center', gap)}
                key={path(['productId'], item) || index}
                defaultWidth={DEFAULT_SHELF_ITEM_WIDTH}
              >
                <div
                  key={path(['productId'], item) || index}
                  style={style}
                  className="h-100"
                >
                  <ShelfItem item={item} summary={summary} />
                </div>
              </Slide>
            ))}
          </Slider>
          <Dots
            loop
            showDotsPerPage
            perPage={perPage}
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
