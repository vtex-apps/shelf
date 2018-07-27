import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Slider, CategoryCard } from 'vtex.store-components'

import './global.css'

const DEFAULT_QUANTITY_ITENS = 4

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
      slidesToShow: DEFAULT_QUANTITY_ITENS
    }
  }

  render() {
    const { categories } = this.props
    
    return (
      <div className="vtex-shelf vtex-categories flex items-center justify-center">
        <div className="vtex-categories__container">
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