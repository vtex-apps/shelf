import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import Slider from 'react-slick'
import ShelfItem from './ShelfItem';

import getRecomendations from './graphql/getRecomendations.graphql'

const defaultSettings = {
  infinite: false,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      arrows: false
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
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
      slidesToShow: {
        title: 'Items Per Line',
        type: 'number',
        default: 5,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      },
      maxItems: {
        title: 'Max Items',
        type: 'number',
        default: 7
      },
      imageWidth: {
        title: 'Image Size',
        type: 'number',
        default: 200,
        enum: [50, 100, 150, 200, 250, 300, 350]
      },
      autoplay: {
        title: 'Auto Play',
        type: 'boolean',
        default: false
      },
      autoplaySpeed: {
        title: 'Auto Play Speed (ms)',
        type: 'number',
        default: 3000,
        enum: [500, 1000, 1500, 2000, 3500, 3000]
      },
      dots: {
        title: 'Dots',
        type: 'boolean',
        default: false
      },
      arrows: {
        title: 'Arrows',
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
    const { data, imageWidth, maxItems } = this.props;
    const { sliderMounted } = this.state;
    const recomendations = data['error'] ? [] : data.getRecomendations;
    return (
      <div className="ml7 mr7 pv4">
        {data.loading && <div> Loading... </div>}
        <Slider {...defaultSettings} {...this.props}>
          {sliderMounted && recomendations && recomendations.slice(0, maxItems).map((item) => {
            return (
              <div key={item.name}>
                <ShelfItem {...item} imageWidth={imageWidth} />
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
    slidesToShow,
    maxItems,
    imageWidth,
    autoplay,
    autoplaySpeed,
    arrows,
    dots
  }) => ({
    variables: {
      slidesToShow,
      maxItems,
      imageWidth,
      autoplay,
      autoplaySpeed,
      arrows,
      dots
    },
    ssr: false
  }),
}

Shelf.propTypes = {
  data: PropTypes.object,
  slidesToShow: PropTypes.number,
  maxItems: PropTypes.number,
  imageWidth: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  arrows: PropTypes.bool,
  dots: PropTypes.bool
}

export default graphql(getRecomendations, options)(Shelf)
