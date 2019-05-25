import React, { Component, useEffect, useMemo, useCallback } from 'react'
import { path, assocPath } from 'ramda'

import { ExtensionPoint } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

import { shelfItemPropTypes } from '../utils/propTypes'
import { changeImageUrlSize, toHttps } from '../utils/urlHelpers'

const findAvailableProduct = item =>
  item.sellers.find(
    ({ commertialOffer = {} }) => commertialOffer.AvailableQuantity > 0
  )

const normalizeProduct = (product) => {
  if (!product) return null
  const normalizedProduct = { ...product }
  const items = normalizedProduct.items || []
  const sku = items.find(findAvailableProduct) || items[0]
  if (sku) {
    const [seller = { commertialOffer: { Price: 0, ListPrice: 0 } }] =
      path(['sellers'], sku) || []
    const [referenceId = { Value: '' }] = path(['referenceId'], sku) || []
    const [image = { imageUrl: '' }] = path(['images'], sku) || []
    const resizedImage = changeImageUrlSize(toHttps(image.imageUrl), 500)
    const normalizedImage = { ...image, imageUrl: resizedImage }
    normalizedProduct.sku = {
      ...sku,
      seller,
      referenceId,
      image: normalizedImage,
    }
  }
  return normalizedProduct
}

/**
 * ShelfItem Component. Normalizes the item received in the props
 * to adapt to the extension point prop.
 */
const ShelfItem = ({ item, position, summary }) => {
  const { push } = usePixel()
  const newSummary = useMemo(
    () => assocPath(['name', 'tag'], 'h2', summary),
    [summary]
  )
  const product = useMemo(() => normalizeProduct(item), [item])

  const pushPixelProductClick = useCallback(() => {
    push({
      event: 'productClick',
      product: product,
    })
  }, [product, push])

  useEffect(() => {
    push({
      event: 'productImpression',
      list: 'Shelf',
      position,
      product,
    })
  }, [position, product, push])

  return (
    <ExtensionPoint
      id="product-summary"
      product={product}
      actionOnClick={pushPixelProductClick}
      {...newSummary}
    />
  )
}

export default ShelfItem
