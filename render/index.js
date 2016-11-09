import gql from 'graphql-tag'
import styles from './tachyons.css'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'
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
    const {title: titleProp, data: {products: productsFromQuery}, titleStyle, products: productsFromProps} = this.props
    const products = productsFromProps || productsFromQuery || []
    const productQty = products.length || 0
    const slidesToShow = this.props.qty || (productQty >= 4 ? 4 : productQty)
    const slidesToScroll = this.props.qty || 1
    const title = titleProp || ''
    const settingsDesktop = {
      dots: false,
      arrows: true,
      infinite: true,
      autoplay: false,
      draggable: false,
      slidesToShow: slidesToShow,
      slidesToScroll: slidesToScroll,
      ...this.props.slickSettings,
    }

    const settingsTouch = {
      ...settingsDesktop,
      draggable: true,
      ...this.props.slickSettings,
    }

    const shelfItems = products.map(this.createCarouselItem)

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
  imgBackgroundColor: PropTypes.string,
  imgHeight: PropTypes.number,
  imgWidth: PropTypes.number,
  priceStyle: PropTypes.string,
  qty: PropTypes.number,
  slickSettings: PropTypes.object,
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

const options = ({category, brands, collection, productQty, products}) => ({
  variables: {
    category,
    brands,
    collection,
    pageSize: productQty || defaultProductQty,
  },
  skip: products ? true : false,
})

const Shelf = graphql(query, {options})(ShelfSlider)

export default connect()(Shelf)
