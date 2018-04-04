import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import Slider from 'react-slick'
import ShelfItem from './ShelfItem';

import getRecomendations from './graphql/getRecomendations.graphql'

const defaultSettings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  initialSlide: 0,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
  }]
};

class Shelf extends Component {

  static schema = {
    title: 'Shelf',
    description: 'A product shelf featuring a collection',
    type: 'object',
    properties: {
      // orderBy: {
      //   title: 'Order by',
      //   type: 'string',
      //   enum: ['OrderByTopSaleDESC', 'OrderByPriceDESC', 'OrderByPriceASC'],
      //   enumNames: ['Sales', 'Price, descending', 'Price, ascending'],
      // },
      slidesToShow: {
        title: 'Quantity',
        type: 'number',
        default: 5,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      imgWidth: {
        title: 'Image Size',
        type: 'number',
        default: 200,
        enum: [50, 100, 150, 200, 250, 300, 350]
      },
      slidesToScroll: {
        title: 'Scrool Size',
        type: 'number',
        default: 1
      },
      arrows: {
        title: 'Arrows',
        type: 'boolean',
        default: true
      },
      dots: {
        title: 'Dots',
        type: 'boolean',
        default: false
      },
    },
  }

  state = {
    sliderMounted: false
  }

  componentDidMount() {
    this.setState({
      sliderMounted: true
    })
  }

  render() {
    const { data, imgWidth } = this.props;
    const { sliderMounted } = this.state;
    const recomendations = data['error'] ? [] : data.getRecomendations;
    
    return (
      <div className="ml7 mr7">
        {data.loading && <div> Loading... </div>}
        <Slider {...defaultSettings} {...this.props}>
          {sliderMounted && recomendations && recomendations.map((product) => {
            return (
              <div key={product.name}>
                <ShelfItem {...product} imgWidth={imgWidth || 200} />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}

const options = {
  options: ({
    imgWidth,
    slidesToShow,
    slidesToScroll,
    arrows,
    dots
  }) => ({
    variables: {
      imgWidth,
      slidesToShow,
      slidesToScroll,
      arrows,
      dots
    },
    ssr: false
  }),
}

Shelf.propTypes = {
  imgWidth: PropTypes.number,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  arrows: PropTypes.bool,
  dots: PropTypes.bool
}

export default graphql(getRecomendations, options)(Shelf)
