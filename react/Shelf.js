import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import Slider from 'react-slick'
import ShelfItem from './ShelfItem';
import Spinner from '@vtex/styleguide/lib/Spinner';

import getRecomendations from './graphql/getRecomendations.graphql'

const spinnerStyle = require('./node_modules/@vtex/styleguide/lib/Spinner/style.css')

const Arrow = (props) => {
  const { className, style, onClick, colorHex, arrowSize } = props
  return (
    <div
      className={className}
      style={{ ...style, color: `#${colorHex}`, fontSize: `${arrowSize}px`  }}
      onClick={onClick}
    />
  )
}

/**
 * Shelf Component. Shows a collection of products.
 */
class Shelf extends Component {

  state = {
    sliderMounted: false
  }
  
  componentDidMount() {
    this.setState({
      sliderMounted: true
    })
  }

  configureSettings() {
    let { 
      slidesToShow, autoplay, autoplaySpeed, 
      arrows, dots, arrowColorHex, arrowSize 
    } = this.props

    slidesToShow = slidesToShow || 5
    arrowColorHex = arrowColorHex || '000'
    arrowSize = arrowSize || 20
    arrows = arrows == undefined ? true : arrows

    return {
      slidesToShow: slidesToShow,
      autoplay: autoplay,
      autoplaySpeed: autoplaySpeed ? autoplaySpeed * 1000 : 3000,
      dots, 
      arrows,
      pauseOnHover: true,
      nextArrow: <Arrow colorHex={arrowColorHex} arrowSize={arrowSize}/>,
      prevArrow: <Arrow colorHex={arrowColorHex} arrowSize={arrowSize}/>,
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
    }
  }

  render() {
    const { data, maxItems } = this.props
    const recomendations = data['error'] ? [] : data.getRecomendations
    const { sliderMounted } = this.state
    const slideSettings = this.configureSettings()

    return (
      <div className="ml7 mr7 pv4">
        {
          data.loading && 
          <div style={{width: "30px", height: "30px"}}>
            <Spinner style={spinnerStyle}/>
          </div>
        }
        <Slider {...slideSettings}>
          {sliderMounted && recomendations && recomendations.slice(0, maxItems).map((item) => {
            return (
              <div key={item.name}>
                <ShelfItem {...item} imageWidth={200} />
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }
}

Shelf.schema = {
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
    autoplay: {
      title: 'Auto Play',
      type: 'boolean',
      default: false
    },
    autoplaySpeed: {
      title: 'Auto Play Speed (s)',
      type: 'number',
      default: 3,
      enum: [0.5, 1, 1.5, 2, 3.5, 3]
    },
    dots: {
      title: 'Dots',
      type: 'boolean',
      default: false
    },
    arrows: {
      title: 'Arrows',
      type: 'boolean',
      default: true
    },
    arrowColorHex: {
      title: 'Arrow Color (Hex)',
      type: 'string',
      default: '000'
    },
    arrowSize: {
      title: 'Arrow Size (px)',
      type: 'number',
      default: 15
    }
  }
}

/**
 * @type {Object}
 * @property {Object} data - The graphql data response
 * @property {number} slidesToShow - How many slides to show in one frame
 * @property {number} maxItems - Maximum number of items in the shelf
 * @property {bool}  autoplay - Should change images automatically
 * @property {number}  autoplaySpeed - Delay between each auto scroll (in seconds)
 * @property {boolean} arrows - Should show the arrows or not
 * @property {boolean} dots - Should show the dots or not
 * @property {string} arrowColorHex - The Hex value of the arrow color
 * @property {number} arrowSize - The size of the arrow (in px)
 */
Shelf.propTypes = {
  data: PropTypes.object,
  slidesToShow: PropTypes.number,
  maxItems: PropTypes.number,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  arrows: PropTypes.bool,
  dots: PropTypes.bool,
  arrowColorHex: PropTypes.string,
  arrowSize: PropTypes.number
}

export default graphql(getRecomendations)(Shelf)
