import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Shelf Item Component. Shows a summary of a product.
 */
class ShelfItem extends Component {
  render() {
    // const { productName, items, imageWidth } = this.props
    // const imagePath = items[0].images[0].imageUrl
    // const price = items[0].sellers[0].commertialOffer.Price
    console.log(this.props)
    return (
      <div className="ph4 grow ">
        <div className="ma4 shadow-2 br3 items-center flex flex-column pointer">
          ShelfItem
          {/* <h4 className="w-90 tc truncate mid-gray" title={productName}>
            {productName}
          </h4>
          <img height={imageWidth} src={imagePath.replace('http:', '')} />
          <h5 className="near-black">R$ {price.toFixed(2)}</h5> */}
        </div>
      </div>
    )
  }
}

ShelfItem.schema = {
  title: 'ShelfItem',
  description: 'A shelf item',
  type: 'object',
  properties: {
    teste: {
      title: 'Teste',
      type: 'number',
      enum: [1, 2],
      enumNames: ['Veiculos', 'Computers'],
      default: 1,
    },
  },
}

ShelfItem.propTypes = {
  /** The name of the product. */
  productName: PropTypes.string.isRequired,
  /** The skus of the product. */
  items: PropTypes.array,
  /** The width of the image. */
  imageWidth: PropTypes.number,
}

export default ShelfItem
