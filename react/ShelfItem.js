import React, { Component } from 'react'
import ProductSummary from 'vtex.product-summary/ProductSummary'

import { shelfItemPropTypes } from './propTypes'

/**
 * ShelfItem Component. Normalizes the item received in the props
 * to adapt to the extension point prop.
 */
export default class ShelfItem extends Component {
  static propTypes = shelfItemPropTypes

  normalizeProduct(product) {
    if (!product) return null
    const normalizedProduct = { ...product }
    const [sku] = normalizedProduct.items
    if (sku) {
      const [seller = { commertialOffer: { Price: 0, ListPrice: 0 } }] = sku.sellers
      const [referenceId = { Value: '' }] = sku.referenceId
      const [image = { imageUrl: '' }] = sku.images
      const unmixedImage = { ...image, imageUrl: image.imageUrl.replace(/^https?:/, '') }
      normalizedProduct.sku = { ...sku, seller, referenceId, image: unmixedImage}
    }
    return normalizedProduct
  }

  render() {
    const { item, summary } = this.props
    return <ProductSummary product={this.normalizeProduct(item)} {...summary} />
  }
}
