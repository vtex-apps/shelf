import React, { Component } from 'react'
import { path, assocPath } from 'ramda'

import { ExtensionPoint } from 'vtex.render-runtime'

import { shelfItemPropTypes } from './propTypes'
import { changeImageUrlSize, toHttps } from './utils/urlHelpers'

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
      const resizedImage = changeImageUrlSize(toHttps(image.imageUrl), 500)
      const normalizedImage = { ...image, imageUrl: resizedImage }
      normalizedProduct.sku = { ...sku, seller, referenceId, image: normalizedImage }
    }
    return normalizedProduct
  }

  render() {
    const { item, summary } = this.props
    const newSummary = assocPath(['name', 'tag'], 'h2', summary)
    return <ExtensionPoint id="product-summary" product={this.normalizeProduct(item)} {...newSummary} />
  }
}
