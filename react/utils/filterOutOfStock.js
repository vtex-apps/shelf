export function filterOutOfStock(products = []) {
  return products.filter(
    product => product.items[0]?.sellers[0]?.commertialOffer?.AvailableQuantity
  )
}
