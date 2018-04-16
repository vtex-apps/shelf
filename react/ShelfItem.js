import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Shelf Item Component. Shows a summary of a product.
 */
class ShelfItem extends Component {
  render() {
    const { name, imageUrl, listPrice } = this.props

    return (
      <div className="ph4 grow ">
        <div className="ma4 shadow-2 br3 items-center flex flex-column pointer">
          <h4 className="w-90 tc truncate mid-gray" title={name}>
            {name}
          </h4>
          <img height={200} src={imageUrl.replace('http:', '')} />
          <h5 className="near-black">R$ {listPrice.toFixed(2)}</h5>
        </div>
      </div>
    )
  }
}

ShelfItem.propTypes = {
  /** The price list of the product. */
  listPrice: PropTypes.number,
  /** The image path of the product. */
  imageUrl: PropTypes.string,
  /** The name of the product. */
  name: PropTypes.string.isRequired,
}

export default ShelfItem
