# Shelf

A Shelf Component. Shows a collection of products.

## Continuous Integrations 

### Travis CI 
[![Build Status](https://travis-ci.org/vtex-apps/shelf.svg?branch=master)](https://travis-ci.org/vtex-apps/shelf)

## Usage

Add "vtex.shelf" as your app dependency.

## ExtensionPoint

Shelf Component was built to support extensions with the following props:
```javascript
product: {
  productId: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  sku: PropTypes.shape({
    name: PropTypes.string.isRequired,
    referenceId: PropTypes.shape({
      Value: PropTypes.string.isRequired,
    }),
    image: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      imageTag: PropTypes.string.isRequired,
    }).isRequired,
    seller: PropTypes.shape({
      commertialOffer: PropTypes.shape({
        Price: PropTypes.number.isRequired,
        ListPrice: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }),
}
```

## Schema Properties (Used By Editor)

``` javascript
/**
 * Category ID of the listed items in the shelf.
 */
- category
  - Type: Number
/**
 * Collection ID of the listed items in the shelf.
 */
- collection
  - Type: Number
/**
 * Ordenation type of the items in the shelf.
 */
- orderBy
  - Type: String
  - Default: 'OrderByTopSaleDESC'
  - Enum: ['OrderByTopSaleDESC', 'OrderByPriceDESC', 'OrderByPriceASC']
/**
 * Maximum number of items in the shelf.
 */
- maxItems
  - Type: Number
  - Default: 7
/**
 * Maximum number of items on the page.
 */
- itemsPerPage
  - Type: Number
  - Default: 5
/**
 * Scroll type of slide transiction.
 */
- scroll
  - Type: String
  - Default: 'BY_PAGE'
  - Enum: ['BY_PAGE', 'ONE_BY_ONE']
/**
 * If the arrows are showable or not.
 */
- arrows
  - Type: Boolean
  - Default: true
/**
 * Title of the shelf.
 */
- titleText
  - Type: String
  - Default: 'Default Title'
```

## CSS Classes

```css
/* ==== '/react/CustomClasses.js' ==== */
vtex-shelf
vtex-shelf__title-text
vtex-shelf__title-content
vtex-shelf__slide
vtex-shelf__arrow-right
vtex-shelf__arrow-left
vtex-shelf__dots
```

## Tests

Run the tests with the command
```
cd react && npm t
```
