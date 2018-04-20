import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Slider from 'react-slick'
import Arrow from './Arrow'
import Dots from './Dots'
import ShelfItem from './ShelfItem'

import VTEXClasses from './CustomClasses'
import ScrollTypes from './ScrollTypes'

/**
 * ShelfContent Component. Realizes the interaction with react-slick
 * and render the properly content of the Shelf depending of edit mode state.
 */
class ShelfContent extends Component {
  BREAKPOINT_MEDIUM_VIEWPORT = 1024
  BREAKPOINT_MOBILE_VIEWPORT = 600

  MAX_ITEMS_LARGE_VIEWPORT = 5
  MAX_ITEMS_MEDIUM_VIEWPORT = 3
  MAX_ITEMS_MOBILE_VIEWPORT = 1

  DOTS_LARGE_VIEWPORT = true
  DOTS_MOBILE_VIEWPORT = false
  ARROWS_MOBILE_VIEWPORT = false
  SLIDER_CENTER_MODE_MOBILE = true

  FAKE_PRODUCT = {
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

  configureSlideSettings(itemsLength) {
    const { arrows, scroll } = this.props

    return {
      infinite: this.MAX_ITEMS_LARGE_VIEWPORT < itemsLength,
      slidesToShow: this.MAX_ITEMS_LARGE_VIEWPORT,
      slidesToScroll: scroll === ScrollTypes.BY_PAGE.value ? this.MAX_ITEMS_LARGE_VIEWPORT : 1,
      dots: this.DOTS_LARGE_VIEWPORT,
      arrows,
      nextArrow: <Arrow arrowClass={VTEXClasses.ARROW_RIGHT_CLASS} />,
      prevArrow: <Arrow arrowClass={VTEXClasses.ARROW_LEFT_CLASS} />,
      appendDots: dots => <Dots dots={dots} />,
      responsive: [
        {
          breakpoint: this.BREAKPOINT_MEDIUM_VIEWPORT,
          settings: {
            infinite: this.MAX_ITEMS_MEDIUM_VIEWPORT < itemsLength,
            slidesToShow: this.MAX_ITEMS_MEDIUM_VIEWPORT,
            slidesToScroll: scroll === ScrollTypes.BY_PAGE.value
              ? this.MAX_ITEMS_MEDIUM_VIEWPORT : 1,
          },
        },
        {
          breakpoint: this.BREAKPOINT_MOBILE_VIEWPORT,
          settings: {
            infinite: this.MAX_ITEMS_MOBILE_VIEWPORT < itemsLength,
            centerMode: this.SLIDER_CENTER_MODE_MOBILE,
            slidesToShow: this.MAX_ITEMS_MOBILE_VIEWPORT,
            slidesToScroll: this.MAX_ITEMS_MOBILE_VIEWPORT,
            arrows: this.ARROWS_MOBILE_VIEWPORT,
            dots: this.DOTS_MOBILE_VIEWPORT,
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
          <div className="w-20 pa4" key={products[0].productId}>
            <ShelfItem extentionId="shelfitem" item={products[0]} />
          </div>
        )
      }
      return (
        <div className="w-20 pa4" key="1">
          <ShelfItem extentionId="shelfitem" item={this.FAKE_PRODUCT} />
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
  maxItems: PropTypes.number.isRequired,
  arrows: PropTypes.bool.isRequired,
  scroll: PropTypes.string.isRequired,
}

export default ShelfContent
