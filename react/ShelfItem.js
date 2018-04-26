import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ExtensionPoint } from 'render'

/**
 * ShelfItem Component. Normalizes the item received in the props
 * to adapt to the extension point prop.
 */
class ShelfItem extends Component {
  render() {
    const { item, extensionId } = this.props
    return (
      <ExtensionPoint id={extensionId} product={item}>
      </ExtensionPoint>
    )
  }
}

ShelfItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      referenceId: PropTypes.arrayOf(PropTypes.shape({
        Value: PropTypes.string.isRequired,
      })),
      images: PropTypes.arrayOf(PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        imageTag: PropTypes.string.isRequired,
      })).isRequired,
      sellers: PropTypes.arrayOf(PropTypes.shape({
        commertialOffer: PropTypes.shape({
          Price: PropTypes.number.isRequired,
          ListPrice: PropTypes.number.isRequired,
        }).isRequired,
      })).isRequired,
    })).isRequired,
  }),
  extensionId: PropTypes.string.isRequired,
}

export default ShelfItem
