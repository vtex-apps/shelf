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

ShelfItem.propTypes = {
  /** The name of the item */
  name: PropTypes.string.isRequired,
  /** The path of the image representing the item */
  imagePath: PropTypes.string.isRequired,
  /** The price of the item */
  price: PropTypes.number.isRequired,
  /** The width of the image */
  imageWidth: PropTypes.number
}

export default ShelfItem