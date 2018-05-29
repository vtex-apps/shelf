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
    const newProduct = { ...product }
    if (newProduct.items && newProduct.items.length) {
      newProduct.sku = { ...newProduct.items[0] }
      if (newProduct.sku.sellers && newProduct.sku.sellers.length) {
        newProduct.sku.seller = newProduct.sku.sellers[0]
      } else {
        newProduct.sku.seller = {
          commertialOffer: {
            Price: 0,
            ListPrice: 0,
          },
        }
      }
      if (newProduct.sku.images && newProduct.sku.images.length) {
        newProduct.sku.image = { ...newProduct.sku.images[0] }
        newProduct.sku.image.imageUrl = newProduct.sku.image.imageUrl
          .replace('http:', '')
          .replace('https:', '')
      }
      newProduct.sku.referenceId = (newProduct.sku.referenceId &&
        newProduct.sku.referenceId[0]) || {
        Value: '',
      }
      delete newProduct.sku.sellers
      delete newProduct.sku.images
      delete newProduct.items
    }
    return newProduct
  }

  render() {
    const { item, summary } = this.props
    return <ProductSummary product={this.normalizeProduct(item)} {...summary} />
  }
}
