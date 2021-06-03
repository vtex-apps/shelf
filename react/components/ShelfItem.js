import React, { useMemo, useCallback } from 'react'
// eslint-disable-next-line no-restricted-imports
import { assocPath } from 'ramda'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { ExtensionPoint } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

/**
 * ShelfItem Component. Normalizes the item received in the props
 * to adapt to the extension point prop.
 */
const ShelfItem = ({ item, summary, position, listName }) => {
  const { push } = usePixel()
  const newSummary = useMemo(() => assocPath(['name', 'tag'], 'h2', summary), [
    summary,
  ])
  const product = useMemo(
    () => ProductSummary.mapCatalogProductToProductSummary(item),
    [item]
  )

  const pushPixelProductClick = useCallback(() => {
    push({
      event: 'productClick',
      product,
      list: listName,
      position,
    })
  }, [product, position, listName, push])

  return (
    <ExtensionPoint
      id="product-summary"
      product={product}
      listName={listName}
      actionOnClick={pushPixelProductClick}
      position={position}
      {...newSummary}
    />
  )
}

export default ShelfItem
