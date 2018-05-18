# Shelf

## Description

React Component that shows a collection of products.

## Continuous Integrations

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/shelf.svg?branch=master)](https://travis-ci.org/vtex-apps/shelf)

## Usage

> Add the dependency in your `manifest.json`

```json
"dependencies": {
  "vtex.shelf": "0.x"
}
```

> On your react component that contains the Shelf
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

> To run your Shelf APP you should run on your workspace:

```sh
vtex link
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
```

## Tests

Run the tests with the command
```
cd react && yarn test
```
