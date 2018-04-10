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
    maxItems: {
      title: 'Max Items',
      type: 'number',
      default: 5
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
  maxItems: 7
}

Shelf.propTypes = {
  /** The graphql data response. */
  data: PropTypes.object,
  /** Maximum number of items in the shelf. */
  maxItems: PropTypes.number.isRequired,
  /** Should show the arrows or not. */
  arrows: PropTypes.bool,
  /** The text value of the title. */
  titleText: PropTypes.string
}

export default graphql(getRecomendations)(Shelf)
