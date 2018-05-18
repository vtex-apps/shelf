# Shelf

## Description

VTEX App that shows a collection of products.

## Continuous Integrations

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/shelf.svg?branch=master)](https://travis-ci.org/vtex-apps/shelf)

## Usage

> 1- Add the dependency in your `manifest.json`

```json
"dependencies": {
  "vtex.shelf": "0.x"
}
```

> 2- Add the route in your pages.json

```json
{
  "extensions": {
    "<page_path>/myshelf": {
      "component": "vtex.shelf/Shelf"
    },
  }
}
```

> 3- On your react component that contains the Shelf
```javascript 
import { ExtensionPoint } from 'render'
...
render() {
  return (
    <ExtensionPoint id="myshelf" />
  )
}
...
```

> 4- To run your Shelf App you should run on your workspace the command:

```sh
$ vtex link
```


## Schema Properties (Used By Editor)

``` javascript
- category // Category ID of the listed items in the shelf
  - Type: Number
- collection // Collection ID of the listed items in the shelf.
  - Type: Number
- orderBy // Ordenation type of the items in the shelf.
  - Type: String
  - Default: 'OrderByTopSaleDESC'
  - Enum: ['OrderByTopSaleDESC', 'OrderByPriceDESC', 'OrderByPriceASC']
- maxItems // Maximum number of items in the shelf.
  - Type: Number
  - Default: 10
- itemsPerPage // Maximum number of items on the page.
  - Type: Number
  - Default: 5
- scroll // Scroll type of slide transiction.
  - Type: String
  - Default: 'BY_PAGE'
  - Enum: ['BY_PAGE', 'ONE_BY_ONE']
- arrows // If the arrows are showable or not.
  - Type: Boolean
  - Default: true
- titleText // Title of the shelf.
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
vtex-product-summary
vtex-product-summary__image-container
vtex-product-summary__image
vtex-product-summary__name-container
vtex-product-summary__buy-button-container
vtex-product-summary__buy-button
vtex-price
vtex-price-container
vtex-product-name
vtex-product-name__brand
vtex-product-name__sku
vtex-discount-badge
```

## Tests

Run the tests with the command
```
cd react && yarn test
```
