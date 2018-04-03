import React, { Component } from 'react'
import Slider from 'react-slick'
import products from './productsMock.js'
import ShelfItem from './ShelfItem';

const defaultSettings = {
  dots: true,
  arrows: true,
  infinite: false,
  speed: 500,
  initialSlide: 0,
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

export default class Shelf extends Component {

  static defaultProps = {
    itemProperties: {
      imgWidth: 200
    },
    slideProperties: {
      slidesToShow: 5,
      slidesToScroll: 1
    }
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
    const { sliderMounted } = this.state;
    const { itemProperties, slideProperties } = this.props;

    return (
      <div className="ml7 mr7">
        <Slider {...defaultSettings} {...slideProperties}>
          {sliderMounted && products.map((product) => {
            return (
              <div key={product.name}>
                <ShelfItem {...product} {...itemProperties} />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}
