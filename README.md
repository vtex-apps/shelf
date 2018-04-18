# Shelf

A Shelf Component. Shows a collection of products.

## Usage

Add "vtex.shelf" as your app dependency.

## Schema Properties

``` javascript
/**
 * The category Id of the listed items in the shelf.
 */
- category
  - Type: Number
  - Default: 1
  /**
 * The ordenation type os the items in the shelf.
 */
- orderBy
  - Type: String
  - Default: 'OrderByTopSaleDESC'
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
