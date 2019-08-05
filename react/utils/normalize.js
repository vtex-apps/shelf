import { pathOr } from 'ramda'
import { changeImageUrlSize, toHttps } from './urlHelpers'

const defaultImage = { imageUrl: '', imageLabel: '' }
const defaultReference = { Value: '' }
const defaultSeller = { commertialOffer: { Price: 0, ListPrice: 0 } }

export function normalizeProduct(product) {
  if (!product) return null
  const normalizedProduct = { ...product }
  const items = normalizedProduct.items || []
  const sku = items.find(findAvailableProduct) || items[0]
  if (sku) {
    const [seller] = pathOr([defaultSeller], ['sellers'], sku)
    const [referenceId] = pathOr([defaultReference], ['referenceId'], sku)
    const [image] = pathOr([defaultImage], ['images'], sku)
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

function findAvailableProduct(item) {
  return item.sellers.find(
    ({ commertialOffer = {} }) => commertialOffer.AvailableQuantity > 0
  )
}

export function normalizeBuyable(product) {
  if (!product || !product.items || product.items.length === 0) {
    return product
  }

  const buyableItems = product.items.map(item => ({
      ...item,
      sellers: getBuyableSellers(item.sellers),
    }))
    .filter(item => item && item.sellers && item.sellers.length > 0)

  return buyableItems
    ? { ...product, items: buyableItems }
    : null
}

function getBuyableSellers(sellers) {
  return sellers && sellers.length > 0
    ? sellers.filter(seller => seller.sellerId)
    : sellers
}
