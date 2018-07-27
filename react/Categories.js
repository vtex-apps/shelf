import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Slider, CategoryCard } from 'vtex.store-components'

import './global.css'

class Categories extends Component {
  static propTypes = {
    /** Name of the Department */
    departmentName: PropTypes.string.isRequired,
  }

  static defaultProps = {
    departmentName: 'Department Name',
    categories: [
      {
        categoryName: 'Smartphones',
      },
      {
        categoryName: 'Computadores',
      },
      {
        categoryName: 'Videogames',
      },
      {
        categoryName: 'TVs',
      },
      {
        categoryName: 'Outros',
      }
    ]
  }

  getSliderSettings = () => {
    return {
      slidesToShow: 4
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