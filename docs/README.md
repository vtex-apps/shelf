📢 Use this project, [contribute](https://github.com/vtex-apps/shelf) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Shelf

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Shelf is a theme block responsible for showing a **collection of products** in the home page.

![shelf](https://user-images.githubusercontent.com/52087100/70079904-60dc5280-15e4-11ea-8ef6-0aa69cadd61d.png)

## Configuration

Our new approach to the Shelf is through a *list of products* using the `list-context.product-list` block, a `product-summary.shelf` and a `slider-layout`.

1. Add the `ProductSummary` app to your theme's dependencies on the `manifest.json`, for example:

```json
  "dependencies": {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `list-context.product-list`, `product-summary.shelf` and `slider-layout` blocks into your theme. These block comes from [**Product Summary**](https://github.com/vtex-apps/product-summary) and [**Slider-Layout**](https://github.com/vtex-apps/slider-layout). Check an implementation example below:

```json
{
  "product-summary.shelf#demo1": {
    "children": [
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-summary-price",
      "product-summary-buy-button"
    ]
  },
  "list-context.product-list#demo1": {
    "blocks": ["product-summary.shelf#demo1"],
    "children": ["slider-layout#demo-products"]
  }
}
```

The `list-context.product-list` is the block responsible for performing the GraphQL query that fetches the list of products and its props can be found below.

:warning: `RelatedProducts` is a subtype of a Shelf block (`shelf.relatedProduct`) that queries and displays the related products on a Product Details Page. It can therefore only be declared in a product template (`store.product`), for example:

```json
{
  "store.product": {
    "children": [
      "breadcrumb",
      "flex-layout.row#main",
      "shelf.relatedProducts"
    ]
  }
}
```

| Prop name              | Type                                   | Description                                                                                                                                                                                                                               | Default value |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `category`             | `String`                               | Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3")                                                                                                                                                               | -             |
| `specificationFilters` | `Array({ id: String, value: String })` | Specification Filters of the listed items.                                                                                                                                                                                                | []            |
| `collection`           | `String`                               | Filter by collection.                                                                                                                                                                                                                     | -             |
| `orderBy`              | `Enum`                                 | Ordination type of the items. Possible values: `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC` | `OrderByTopSaleDESC`          |
| `hideUnavailableItems` | `Boolean`                              | Hides items that are unavailable.                                                                                                                                                                                                         | `false`       |
| `maxItems` | `Number`                              | Maximum items to be fetched.                                                                                                                                                                                                         | `10`       |

### `RelatedProducts`

| Prop name        | Type                | Description                                                                                                                                            | Default value                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `recommendation` | `Enum`              | Type of recommendations that will be displayed in the Shelf. Possible values: `similars`, `suggestion`, `accessories` (these first three depend on the product's data given in the admin's catalog) and `view`, `buy`, `viewandBought` (These 3 are automatically generated according to the store’s activity) | `similars` |
| `productList`    | `ProductListSchema` | Product list schema. `See ProductListSchema`                                                                                                           | -                                 |

`ProductListSchema`:

| Prop name         | Type      | Description                                                                                                                                                                                                                                                                          | Default value |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `maxItems`        | `Number`  | Maximum number of items in the Shelf.                                                                                                                                                                                                                                                | 10            |
| `scroll`          | `Enum`    | Slide transition scroll type. Possible values: `BY_PAGE`, `ONE_BY_ONE`                                                                                                                                                                                                           | `BY_PAGE`     |
| `arrows`          | `Boolean` | If the arrows are displayable or not.                                                                                                                                                                                                                                                   | `true`        |
| `showTitle`       | `Boolean` | If a title should be displayed in the Shelf or not.                                                                                                                                                                                                                                                             | `true`        |
| `titleText`       | `String`  | Shelf title                                                                                                                                                                                                                                                                  | `null`        |
| `summary`         | `Object`  | Product Summary schema properties.                                                                                                                                                                                                                                                   | -             |
| `gap`             | `Enum`    | Gap between items. Possible values: `ph0`, `ph3`,`ph5`, `ph7`.                                                                                                                                                                                                                       | `ph3`         |
| `minItemsPerPage` | `Number`  | Minimum amount of slides to be on the screen, can be used to control how many itens will be displayed in the smallest screen size. This value can be a **Float**, which should be a multiple of 0.5 and would indicate that you want to show a "peek" of the next item in the Shelf. | `1`           |
| `itemsPerPage`    | `Number`  | Maximum amount of slides to be on the screen. Can be used to control how many items will be displayed in the biggest screen size. This value can be a **Float**, which should be a multiple of 0.5 and would indicate that you want to show a "peek" of the next item in the Shelf.  | `5`           |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

Notice that this list **does not** apply to the `list-context.product-list` block.

| CSS Handles               |
| ------------------------- |
| `container`               |
| `title`                   |
| `relatedProducts`         |
| `arrow`                   |
| `dot`                     |
| `slide`                   |
| `blockContainer`          |
| `blockText`               |
| `buttonContainer`         |
| `arrowLeft`               |
| `arrowRight`              |
| `shelfContentContainer`   |
| `sliderContainer`         |
| `headline`                |
| `itemContainer`           |
| `itemContainerSelected`   |
| `itemContainerUnselected` |
| `tabsContainer`           |
| `tabsNamesContainer`      |
| `shelfContainer`          |
| `tabButton`               |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
