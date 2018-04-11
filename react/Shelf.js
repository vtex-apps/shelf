import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import Slider from 'react-slick'
import ShelfItem from './ShelfItem'
import Arrow from './Arrow'
import Dots from './Dots'
import Spinner from '@vtex/styleguide/lib/Spinner'
import spinnerStyle from '@vtex/styleguide/lib/Spinner/style.css'

import productsQuery from './graphql/productsQuery.graphql'

/**
 * Shelf Component. Shows a collection of products.
 */
class Shelf extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sliderMounted: false
    }
  }
  
  componentDidMount() {
    this.setState({
      sliderMounted: true
    })
  }

  // componentWillReceiveProps(props) {
  //   if ((props.category != this.props.category) || (props.orderBy != this.props.orderBy)) {
  //     this.props.data.refetch({ skip: false })
  //   }
  // }

  configureSettings() {
    let { 
      slidesToShow, autoplay, autoplaySpeed, 
      arrows, dots, iconsColor
    } = this.props

    return {
      slidesToShow: 5,
      slidesToScroll: 5,
      dots: true, 
      arrows: arrows == undefined ? true : arrows,
      nextArrow: <Arrow color='#000' />,
      prevArrow: <Arrow color='#000' />,
      infinite: false,
      appendDots: dots => <Dots color='#000' dots={dots} />,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    }
  }

  render() {
    const { data, maxItems, titleColor, titleText } = this.props
    const products = !data || data['error'] ? [] : data.products
    const { sliderMounted } = this.state
    const slideSettings = this.configureSettings()

    return (
      <div className="ml7 mr7 pv4 vtex-shelf">
        <div className="w-100 flex justify-center">
          <h1 style={{color: titleColor}}> { titleText }</h1>
        </div>
        {
          data && data.loading &&
          <div className="w-100 flex justify-center">
            <div className="w3 ma0">
              <Spinner style={spinnerStyle}/>
            </div>
          </div>
        }
        {
          data && !data.loading &&
          <Slider {...slideSettings}>
            {sliderMounted && products && products.slice(0, maxItems).map((item) => {
              return (
                <div key={item.productId} className="ph4 grow">
                  <ShelfItem {...item} imageWidth={200} />
                </div>
              )
            })}
          </Slider>
        }
      </div>
    )
  }
}

Shelf.schema = {
  title: 'Shelf',
  description: 'A product shelf featuring a collection',
  type: 'object',
  properties: {
    category: {
      title: 'List By Category',
      type: 'number',
      enum: [1, 2],
      enumNames: ['Veiculos', 'Computers'],
      default: 1
    },
    orderBy: {
      title: 'List Ordenation',
      type: 'string',
      enum: ['OrderByTopSaleDESC', 'OrderByPriceDESC', 'OrderByPriceASC'],
      enumNames: ['Sales', 'Price, descending', 'Price, ascending'],
      default: 'OrderByTopSaleDESC'
    },
    maxItems: {
      title: 'Max Items',
      type: 'number',
      default: 7
    },
    arrows: {
      title: 'Arrows',
      type: 'boolean',
      default: true
    },
    titleText: {
      title: 'Title Text',
      type: 'string',
      default: 'Default Title'
    }
  }
}

Shelf.defaultProps = {
  maxItems: 10
}

Shelf.propTypes = {
  /** The graphql data response. */
  data: PropTypes.object,
  /** The Category Id. */
  category: PropTypes.number,
  /** The Ordenation Type. */
  orderBy: PropTypes.string,
  /** Maximum number of items in the shelf. */
  maxItems: PropTypes.number.isRequired,
  /** Should show the arrows or not. */
  arrows: PropTypes.bool,
  /** The text value of the title. */
  titleText: PropTypes.string
}

const options = {
  options: ({
    category = 1,
    orderBy = 'OrderByTopSaleDESC',
    maxItems = 10
  }) => ({
    variables: {
      category,
      specificationFilters: [],
      orderBy,
      from: 0,
      to: maxItems - 1
    },
    ssr: false,
  })
}

export default graphql(productsQuery, options)(Shelf)
