import React, {Component, PropTypes} from 'react'
import Slider from 'vtex.react-slick'
import ShelfProduct from './ShelfProduct'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {merge} from 'ramda'

const defaultProductQty = 4

//eslint-disable-next-line
class ShelfSlider extends Component {
  render () {
    const {products} = this.props.data
    const {imgHeight, imgWidth} = this.props
    const {titleStyle, priceStyle, textStyle, buttonStyle, buttonText} = this.props
    const title = this.props.title || ''

    const defaultSlickSettings = {
      dots: false,
      arrows: true,
      autoplay: false,
      infinite: true,
      draggable: false,
      slidesToShow: this.props.desktopQty || 4,
      slidesToScroll: this.props.desktopQty || 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            infinite: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: false,
            draggable: true,
            slidesToShow: this.props.tabletQty || 2,
            slidesToScroll: this.props.tabletQty || 2,
          },
        },
      ],
    }
    const slickSettings = merge(defaultSlickSettings, this.props.slickSettings || {})

    return (
      <div>
        <h2 className={titleStyle || ''}>
          {title}
        </h2>
        <div>
          <Slider {...slickSettings}>
            {
              products
                ? products.map(product => {
                  return (
                    <div key={product.slug}>
                      <ShelfProduct
                        {...product}
                        buttonStyle={buttonStyle}
                        buttonText={buttonText}
                        imgBackgroundColor={this.props.imgBackgroundColor}
                        imgHeight={imgHeight || null}
                        imgWidth={imgWidth || null}
                        priceStyle={priceStyle}
                        textStyle={textStyle}
                      />
                    </div>
                  )
                })
                : <div>Carregando</div>
            }
          </Slider>
        </div>
      </div>
    )
  }
}

ShelfSlider.propTypes = {
  buttonStyle: PropTypes.string,
  buttonText: PropTypes.string,
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
    products(category: $category, brands: $brands, collection: $collection, pageSize: $pageSize) {
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
