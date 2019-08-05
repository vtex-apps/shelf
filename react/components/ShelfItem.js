import React, { useMemo, useCallback } from 'react'
import { assocPath } from 'ramda'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'

import { ExtensionPoint } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

/**
 * ShelfItem Component. Normalizes the item received in the props
 * to adapt to the extension point prop.
 */
const ShelfItem = ({ item, summary }) => {
  const { push } = usePixel()
  const newSummary = useMemo(
    () => assocPath(['name', 'tag'], 'h2', summary),
    [summary]
  )
  const product = useMemo(() => ProductSummary.mapCatalogProductToProductSummary(item), [item])

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
