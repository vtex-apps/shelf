import React, { Component } from 'react'

/**
 * Shelf Item Component. Shows a summary of a product.
 */
class ShelfItem extends Component {

  getImagePath(imageTag, imageWidth) {
    return imageTag.replace('~/', '')
      .replace(/#width#/g, imageWidth)
      .replace(/#height#/g, imageWidth)
  }

  render() {
    const { productId, productName, items, imageWidth } = this.props
    const imagePath = items[0].images[0].imageUrl
    const imageTag = this.getImagePath(items[0].images[0].imageTag, imageWidth)
    const price = items[0].sellers[0].commertialOffer.Price
    return (
      <div className="ma4 shadow-2 br3 items-center flex flex-column grow pointer">
        <h4 className="w-90 tc truncate mid-gray" title={productName}>
          {productName}
        </h4>
        <div dangerouslySetInnerHTML={{__html: imageTag}}></div>
        <h5 className="near-black">R$ {price.toFixed(2)}</h5>
      </div>
    )
  }
}

ShelfItem.propTypes = {
  /** The id of the product. */
  productId: PropTypes.string.isRequired,
  /** The name of the product. */
  productName: PropTypes.string.isRequired,
  /** The skus of the product. */
  items: PropTypes.array,
  /** The width of the image. */
  imageWidth: PropTypes.number
}

export default ShelfItem