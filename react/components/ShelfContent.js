import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { Component } from 'react'
import { IconCaret } from 'vtex.store-icons'
import classNames from 'classnames'
import { NoSSR } from 'vtex.render-runtime'
import { Slider, Slide, Dots, SliderContainer } from 'vtex.slider'

import { getGapPaddingValues } from '../utils/paddingEnum'
import ScrollTypes from '../utils/ScrollTypes'
import ShelfItem from './ShelfItem'
import { shelfItemPropTypes } from '../utils/propTypes'

import shelf from './shelf.css'

const SLIDER_WIDTH_ONE_ELEMENT = 320
const SLIDER_WIDTH_TWO_ELEMENTS = 500
const SLIDER_WIDTH_THREE_ELEMENTS = 750
const SLIDER_WIDTH_FOUR_ELEMENTS = 1000
const SLIDER_WIDTH_FIVE_ELEMENTS = 1290
const DEFAULT_SHELF_ITEM_WIDTH = 260

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

  componentDidMount() {
    this.setState({
      firstRender: false,
    })
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

  resolvePaginationDots = (visibility, isMobile) =>
    !!(
      visibility === 'visible' ||
      (visibility === 'mobileOnly' && isMobile) ||
      (visibility === 'desktopOnly' && !isMobile)
    )

  render() {
    const {
      products,
      maxItems,
      scroll,
      gap,
      arrows,
      summary,
      minItemsPerPage,
      paginationDotsVisibility,
      isMobile,
    } = this.props
    const { currentSlide } = this.state
    const showPaginationDots = this.resolvePaginationDots(
      paginationDotsVisibility,
      isMobile
    )

    const isScrollByPage = scroll === ScrollTypes.BY_PAGE.value

    const productList =
      !products || !products.length ? Array(maxItems).fill(null) : products

    return (
      <div className="flex justify-center">
        <SliderContainer className="w-100 mw9">
          <Slider
            minPerPage={minItemsPerPage}
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
                <ShelfItem item={item} summary={summary} position={index + 1} />
              </Slide>
            ))}
          </Slider>
          {showPaginationDots && (
            <NoSSR>
              <Dots
                loop
                showDotsPerPage={isScrollByPage}
                minPerPage={minItemsPerPage}
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
          )}
        </SliderContainer>
      </div>
    )
  }
}

ShelfContent.defaultProps = {
  itemsPerPage: 5,
  minItemsPerPage: 1,
  paginationDotsVisibility: 'visible',
}

ShelfContent.propTypes = {
  /** List of products */
  products: PropTypes.arrayOf(shelfItemPropTypes.item),
  /** Max Items per page */
  itemsPerPage: PropTypes.number.isRequired,
  /** Minimum Items per page */
  minItemsPerPage: PropTypes.number.isRequired,
  /** Max items in shelf */
  maxItems: PropTypes.number.isRequired,
  /** Show Arrows */
  arrows: PropTypes.bool.isRequired,
  /** Scroll type */
  scroll: PropTypes.string.isRequired,
  /** Should display navigation dots below the Shelf */
  paginationDotsVisibility: PropTypes.oneOf([
    'visible',
    'hidden',
    'desktopOnly',
    'mobileOnly',
  ]),
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
