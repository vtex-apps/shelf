import gql from 'graphql-tag'
import {canUseDOM} from 'exenv'
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
    this.state = {ready: false}
    this.createCarouselItem = this.createCarouselItem.bind(this)
  }

  componentDidMount() {
    if (canUseDOM) {
      if (document.readyState === 'loading') {
        document.addEventListener('readystatechange', () => this.setState({ready: true}))
      } else {
        this.setState({ready: true})
      }
    }
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
          textStyle={textStyle}
          buttonText={buttonText}
          priceStyle={priceStyle}
          buttonStyle={buttonStyle}
          imgWidth={imgWidth || null}
          imgHeight={imgHeight || null}
          imgBackgroundColor={imgBackgroundColor}
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
      infinite: true,
      autoplay: false,
      draggable: false,
      slidesToShow: this.props.desktopQty || 4,
      slidesToScroll: this.props.desktopQty || 4,
    }

    const settingsTouch = {
      ...settingsDesktop,
      draggable: true,
    }

    const shelfItems = products
      ? products.map(this.createCarouselItem)
      : <div>Carregando</div>

    return (
      <div>
        <h2 className={titleStyle || ''}>
          {title}
        </h2>
        {
          this.state.ready
            ? (
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
            )
            : <div>Carregando</div>
        }
      </div>
    )
  }
}

ShelfSlider.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  tabletQty: PropTypes.number,
  textStyle: PropTypes.string,
  buttonText: PropTypes.string,
  desktopQty: PropTypes.number,
  priceStyle: PropTypes.string,
  titleStyle: PropTypes.string,
  buttonStyle: PropTypes.string,
  slickSettings: PropTypes.object,
  imgBackgroundColor: PropTypes.string,
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

const Shelf = graphql(query, {
  options: ({category, brands, collection, productQty}) => ({variables: {category, brands, collection, pageSize: productQty || defaultProductQty}}),
})(ShelfSlider)

export default Shelf
