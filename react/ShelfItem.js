import React, { Component } from 'react'
import ProductSummary from 'vtex.product-summary/index'
import { path, assocPath } from 'ramda'

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
      const [seller = { commertialOffer: { Price: 0, ListPrice: 0 } }] = path(['sellers'], sku) || []
      const [referenceId = { Value: '' }] = path(['referenceId'], sku) || []
      const [image = { imageUrl: '' }] = path(['images'], sku) || []
      const unmixedImage = { ...image, imageUrl: image.imageUrl.replace(/^https?:/, '') }
      normalizedProduct.sku = { ...sku, seller, referenceId, image: unmixedImage }
    }
    return normalizedProduct
  }

  render() {
    const { item, summary } = this.props
    const newSummary = assocPath(['name', 'tag'], 'h2', summary)
    return <ProductSummary product={this.normalizeProduct(item)} {...newSummary} />
  }
}
