import React, { Component } from 'react'

/**
 * Shelf Item Component. Shows a summary of a product.
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
 * @property {!string} name - The name of the item
 * @property {!string} imagePath - The path of the image representing the item
 * @property {!number} price - The price of the item
 * @property {?number} imageWidth - The width of the image
 */
ShelfItem.propTypes = {
  name: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageWidth: PropTypes.number
}

export default ShelfItem