import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'

import Slider from 'react-slick'
import ShelfItem from './ShelfItem'
import Arrow from './Arrow'
import Dots from './Dots'
import Spinner from '@vtex/styleguide/lib/Spinner'

import getRecomendations from './graphql/getRecomendations.graphql'
import spinnerStyle from '@vtex/styleguide/lib/Spinner/style.css'

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
      arrows, dots, iconsColor
    } = this.props

    return {
      slidesToShow: slidesToShow || 5,
      autoplay,
      autoplaySpeed: autoplaySpeed ? autoplaySpeed * 1000 : 3000,
      dots, 
      arrows: arrows == undefined ? true : arrows,
      pauseOnHover: true,
      nextArrow: <Arrow color={iconsColor || '#000'} />,
      prevArrow: <Arrow color={iconsColor || '#000'} />,
      infinite: false,
      appendDots: dots => <Dots color={iconsColor} dots={dots} />,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }]
    }
  }

  render() {
    const { data, maxItems, titleColor, titleText } = this.props
    const recomendations = data['error'] ? [] : data.getRecomendations
    const { sliderMounted } = this.state
    const slideSettings = this.configureSettings()

    return (
      <div className="ml7 mr7 pv4 vtex-shelf">
        <div className="w-100 flex justify-center">
          <h1 style={{color: titleColor}}> { titleText }</h1>
        </div>
        {
          data.loading &&
          <div className="w-100 flex justify-center">
            <div className="w3 ma0">
              <Spinner style={spinnerStyle}/>
            </div>
          </div>
        }
        <Slider {...slideSettings}>
          {sliderMounted && recomendations && recomendations.slice(0, maxItems).map((item) => {
            return (
              <div key={item.name} className="ph4">
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
    iconsColor: {
      title: 'Icons Color',
      type: 'string',
      default: '#000'
    },
    titleText: {
      title: 'Title Text',
      type: 'string',
      default: 'Default Title'
    },
    titleColor: {
      title: 'Title Color',
      type: 'string',
      default: '#222'
    }
  }
}

Shelf.defaultProps = {
  slidesToShow: 5,
  maxItems: 7
}

Shelf.propTypes = {
  /** The graphql data response. */
  data: PropTypes.object,
  /** How many slides to show in one frame. */
  slidesToShow: PropTypes.number.isRequired,
  /** Maximum number of items in the shelf. */
  maxItems: PropTypes.number.isRequired,
  /** Should change images automatically. */
  autoplay: PropTypes.bool,
  /** Delay between each auto scroll (in seconds). */
  autoplaySpeed: PropTypes.number,
  /** Should show the arrows or not. */
  arrows: PropTypes.bool,
  /** Should show the dots or not. */
  dots: PropTypes.bool,
  /** The value of the arrow color. Ex: '#FFF' or 'rgb(255,0,0)'. */
  iconsColor: PropTypes.string,
  /** The text value of the title. */
  titleText: PropTypes.string,
  /** The value of the title color. Ex: '#FFF' or 'rgb(255,0,0)'. */
  titleColor: PropTypes.string
}

export default graphql(getRecomendations)(Shelf)
