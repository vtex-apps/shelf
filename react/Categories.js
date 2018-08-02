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
    categories: [
      {
        categoryName: 'Sample 1',
        categoryImageUrl: 'https://li0.rightinthebox.com/images/384x384/201506/ycdgdd1433506208409.jpg'
      },
      {
        categoryName: 'Sample 2',
        categoryImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY-zF_22MQJt7VAFSH-5g35BiBo8i5ak4uqoCfQAC2PAQvcJU9mg'
      },
      {
        categoryName: 'Sample 3',
        categoryImageUrl: 'http://d26lpennugtm8s.cloudfront.net/stores/650/612/products/bone-volkswagen-gti-11-8d3565cb88be35b7b315238341270417-640-0.jpg'
      },
      {
        categoryName: 'Sample 4',
        categoryImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj__Hxl13SZkMM3P0UMLDdi1iddQ_K32LZlO7mG5UYsXfHma_x'
      },
      {
        categoryName: 'Sample 5',
        categoryImageUrl: 'http://4.bp.blogspot.com/-ItLr46C9rPk/UPk_LUgCvmI/AAAAAAAABmE/crjw9MtL7Ok/s1600/xbox1.jpg'
      }
    ]
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