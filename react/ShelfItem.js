import React, { Component } from 'react'

/**
 * Shelf Item. Shows a summary of a product.
 */
class ShelfItem extends Component {
  render() {
    const { name, imagePath, price, imageWidth } = this.props;
    return (
      <div className="ma4 shadow-2 br3 items-center flex flex-column grow pointer">
        <h4 className="w-90 tc truncate mid-gray" title={name}>
          {name}
        </h4>
        <img width={imageWidth} src={imagePath} />
        <h5 className="near-black">R$ {price.toFixed(2)}</h5>
      </div>
    )
  }
}

/**
 * @type {Object}
 * @property {!boolean} autoplay - Should change images automatically
 * @property {!number}  autoplaySpeed - How long it should wait to change the banner in secs
 * @property {?boolean} showDots - Should show the dots or not
 * @property {?boolean} showArrows - Should show the arrows or not
 * @property {?string}  arrowColor - The color of the arrows background
 * @property {Object}   banner[n] - Banners that will be displayed by the Carousel
 * @property {!string}   banner[n].image - The image url of the banner
 * @property {?string}   banner[n].page - The page that the banner will be liking to
 * @property {!string}   banner[n].description - The description of the image
 */
ShelfItem.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  price: PropTypes.number,
  imageWidth: PropTypes.number
}

export default ShelfItem