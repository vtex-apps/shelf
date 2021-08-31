export function filterOutOfStock(products) {
  if (!products?.length) return []
  return products.filter(
    product => product.items[0]?.sellers[0]?.commertialOffer?.AvailableQuantity
  )
}
