# Shelf

A Shelf Component. Shows a collection of products.

## Usage

Add "vtex.shelf" as your app dependency.

## Schema Properties

``` javascript
/**
 * Maximum number of items in the shelf.
 */
- maxItems
  - Type: Number
  - Default: 7
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