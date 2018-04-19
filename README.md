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
  listPrice: Number,
  sellingPrice: Number,
  imageUrl: String,
  imageTag: String,
  url: String, // product url link
  name: String,
  skuName: String,
  brandName: String,
  referenceCode: String,
}
```

## Schema Properties (Used By Editor)

``` javascript
/**
 * The category ID of the listed items in the shelf.
 */
- category
  - Type: Number
/**
 * The collection ID of the listed items in the shelf.
 */
- collection
  - Type: Number
/**
 * The ordenation type of the items in the shelf.
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
 * The scroll type of slide transiction.
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
 * The title of the shelf.
 */
- titleText
  - Type: String
  - Default: 'Default Title'
```

## CSS Classes

```css
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
