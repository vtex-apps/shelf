import gql from 'graphql-tag'
import styles from './tachyons.css'
import {graphql} from 'react-apollo'
import Slider from 'vtex.react-slick'
import classnames from 'classnames/bind'
import ShelfProduct from './ShelfProduct'
import React, {Component, PropTypes} from 'react'

const defaultProductQty = 4
const cx = classnames.bind(styles)

class ShelfSlider extends Component {
  constructor (props) {
    super(props)
    this.createCarouselItem = this.createCarouselItem.bind(this)
  }

  createCarouselItem (product) {
    const {
      imgWidth,
      imgHeight,
      textStyle,
      priceStyle,
      buttonText,
      buttonStyle,
      imgBackgroundColor,
    } = this.props

    return (
      <div key={product.slug}>
        <ShelfProduct
          {...product}
          buttonStyle={buttonStyle}
          buttonText={buttonText}
          imgBackgroundColor={imgBackgroundColor}
          imgHeight={imgHeight || null}
          imgWidth={imgWidth || null}
          priceStyle={priceStyle}
          textStyle={textStyle}
        />
      </div>
    )
  }

  render () {
    const {title: titleProp, data: {products}, titleStyle} = this.props
    const title = titleProp || ''
    const settingsDesktop = {
      dots: false,
      arrows: true,
      infinite: false,
      autoplay: false,
      draggable: false,
      slidesToShow: this.props.desktopQty || 4,
      slidesToScroll: this.props.desktopQty || 1,
    }

    const settingsTouch = {
      ...settingsDesktop,
      draggable: true,
    }

    const shelfItems = (products || []).map(this.createCarouselItem)

    return (
      <div>
        <h2 className={titleStyle || ''}>
          {title}
        </h2>
        <div>
          <div className={cx('dn', 'db-l')}>
            <Slider {...settingsDesktop}>
              {shelfItems}
            </Slider>
          </div>
          <div className={cx('db', 'dn-l')}>
            <Slider {...settingsTouch}>
              {shelfItems}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

ShelfSlider.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.string),
  buttonStyle: PropTypes.string,
  buttonText: PropTypes.string,
  category: PropTypes.string,
  collection: PropTypes.string,
  data: PropTypes.object,
  desktopQty: PropTypes.number,
  imgBackgroundColor: PropTypes.string,
  imgHeight: PropTypes.number,
  imgWidth: PropTypes.number,
  priceStyle: PropTypes.string,
  slickSettings: PropTypes.object,
  tabletQty: PropTypes.number,
  textStyle: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.string,
}

const query = gql`
  query ProductsQuery($category: String, $brands: String, $collection: String, $pageSize: Int){
    products(category: $category, brands: $brands, collection: $collection, pageSize: $pageSize, availableOnly: true) {
      name,
      slug,
      skus {
        images {
          src
        },
        offers {
          price,
          listPrice
        }
      }
    }
  }
`

const options = ({category, brands, collection, productQty}) => ({
  variables: {
    category,
    brands,
    collection,
    pageSize: productQty || defaultProductQty,
  },
})

const Shelf = graphql(query, {options})(ShelfSlider)

export default Shelf
