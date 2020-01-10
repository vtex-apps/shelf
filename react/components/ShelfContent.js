import { path } from 'ramda'
import React, { Component } from 'react'
import { IconCaret } from 'vtex.store-icons'
import classNames from 'classnames'
import { NoSSR } from 'vtex.render-runtime'
import { Slider, Slide, Dots, SliderContainer } from 'vtex.slider'
import { withCssHandles } from 'vtex.css-handles'
import { resolvePaginationDotsVisibility } from '../utils/resolvePaginationDots'
import ScrollTypes from '../utils/ScrollTypes'
import ShelfItem from './ShelfItem'
import { shelfContentPropTypes } from '../utils/propTypes'
import shelf from './shelf.css'

const CSS_HANDLES = ['arrow', 'arrowLeft', 'arrowRight', 'shelfContentContainer', 'sliderContainer', 'slide', 'sliderRoot']
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
    const { gap, cssHandles } = this.props
    const containerClasses = classNames(
      shelf.arrow,
      'pointer z-1 flex absolute',
      {
        [`${cssHandles.arrowLeft} left-0 ${gap}`]: orientation === 'left',
        [`${cssHandles.arrowRight} right-0 ${gap}`]: orientation === 'right',
      }
    )
    return (
      <div className={containerClasses} onClick={onClick}>
        <IconCaret orientation={orientation} thin size={20} />
      </div>
    )
  }

  roundHalf = num => Math.round(num * 2) / 2

  render() {
    const {
      products,
      maxItems,
      scroll,
      gap,
      arrows,
      summary,
      itemsPerPage,
      minItemsPerPage,
      paginationDotsVisibility,
      isMobile,
      cssHandles
    } = this.props

    const { currentSlide } = this.state
    const showPaginationDots = resolvePaginationDotsVisibility(
      paginationDotsVisibility,
      isMobile
    )

    const isScrollByPage = scroll === ScrollTypes.BY_PAGE.value

    const productList =
      !products || !products.length ? Array(maxItems).fill(null) : products

    const roundedMinItems = this.roundHalf(minItemsPerPage)
    const customPerPage = !isMobile && itemsPerPage

    return (
      <div className={`${cssHandles.shelfContentContainer} flex justify-center`}>
        <SliderContainer className={`${cssHandles.sliderContainer} w-100 mw9`}>
          <Slider
            minPerPage={roundedMinItems}
            perPage={customPerPage || this.perPage}
            onChangeSlide={this.handleChangeSlide}
            currentSlide={Math.ceil(currentSlide)}
            arrowRender={arrows && this.arrowRender}
            scrollByPage={isScrollByPage}
            duration={500}
            loop
            classes={{
              root: cssHandles.sliderRoot
            }}
            easing="ease"
          >
            {productList.slice(0, maxItems).map((item, index) => (
              <Slide
                sliderTransitionDuration={500}
                className={classNames('justify-center h-100', gap, cssHandles.slide)}
                key={path(['productId'], item) || index}
                defaultWidth={DEFAULT_SHELF_ITEM_WIDTH}
              >
                <ShelfItem item={item} summary={summary} />
              </Slide>
            ))}
          </Slider>
          {showPaginationDots && (
            <NoSSR>
              <Dots
                loop
                showDotsPerPage={isScrollByPage}
                minPerPage={roundedMinItems}
                perPage={this.perPage}
                currentSlide={Math.ceil(currentSlide)}
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
  products: shelfContentPropTypes.products,
  /** Max Items per page */
  itemsPerPage: shelfContentPropTypes.itemsPerPage,
  /** Minimum Items per page */
  minItemsPerPage: shelfContentPropTypes.minItemsPerPage,
  /** Max items in shelf */
  maxItems: shelfContentPropTypes.maxItems,
  /** Show Arrows */
  arrows: shelfContentPropTypes.arrows,
  /** Scroll type */
  scroll: shelfContentPropTypes.scroll,
  /** Should display navigation dots below the Shelf */
  paginationDotsVisibility: shelfContentPropTypes.paginationDotsVisibility,
  /** Container width */
  width: shelfContentPropTypes.width,
  /** Props to ProductsSummary */
  summary: shelfContentPropTypes.summary,
  /** Is mobile */
  isMobile: shelfContentPropTypes.isMobile,
  /** Gap between Shelf Items */
  gap: shelfContentPropTypes.gap,
}

export default withCssHandles(CSS_HANDLES)(ShelfContent)
