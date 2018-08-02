import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Slider } from 'vtex.store-components'
import CategoryCard from './components/CategoryCard'

import './global.css'

const DEFAULT_SLIDES_TO_SHOW = 4

const BREAKPOINT_NOT_LARGE_VIEWPORT = 1080
const SLIDES_TO_SHOW_NOT_LARGE_VIEWPORT = 2

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        categoryName: PropTypes.string.isRequired,
        categoryImageUrl: PropTypes.string,
      })
    ).isRequired,
  }

  static defaultProps = {
    categories: []
  }

  getSliderSettings = () => {
    return {
      slidesToShow: DEFAULT_SLIDES_TO_SHOW,
      responsive: [
        {
          breakpoint: BREAKPOINT_NOT_LARGE_VIEWPORT,
          settings: {
            slidesToShow: SLIDES_TO_SHOW_NOT_LARGE_VIEWPORT
          }
        }
      ],
    }
  }

  render() {
    const { categories } = this.props
    
    return (
      <div className="vtex-shelf vtex-categories flex items-center justify-center">
        <div className="vtex-categories__container dn db-ns">
          <Slider 
            sliderSettings={this.getSliderSettings()}>
            {
              categories.map(category => (
                <div className="" key={category.categoryName}>
                  <CategoryCard {...category} />
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    )
  }
}

export default Categories