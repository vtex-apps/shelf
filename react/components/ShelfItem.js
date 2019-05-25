import React, { Component, useEffect, useMemo, useCallback } from 'react'
import { path, assocPath } from 'ramda'

import { ExtensionPoint } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

import { shelfItemPropTypes } from '../utils/propTypes'
import normalizeProduct from '../utils/normalizeProduct'

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
