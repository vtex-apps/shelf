📢 Use this project, [contribute](https://github.com/vtex-apps/shelf) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Shelf

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The Shelf block is responsible for displaying a list of products in the store home page.

![shelf](https://user-images.githubusercontent.com/52087100/70079904-60dc5280-15e4-11ea-8ef6-0aa69cadd61d.png)

## Configuration

Aiming to display a flexible product list, the Shelf block as we know is now configured using the [Product Summary List](https://vtex.io/docs/components/all/vtex.product-summary/), the [Product Summary Shelf](https://vtex.io/docs/components/all/vtex.product-summary/) and the [Slider Layout](https://vtex.io/docs/components/all/vtex.slider-layout/) blocks.

1. Add the `ProductSummary` and `Slider-Layout` apps to your theme's dependencies on the `manifest.json`, for example:

```json
  "dependencies": {
    "vtex.product-summary": "2.x",
    "vtex.slider-layout": "0.x"
  }
```

⚠️ The Product Summary app, added in the `manifest.json` file in the previous step, exports (among others) 2 blocks that will be useful to build the Shelf: The Product Summary Shelf and the Product Summary List blocks. The last one is not rendered and, in turn, exports one of the blocks we are going to declare in the next step: the `list-context.product-list`.

2. Add the `list-context.product-list`, `product-summary.shelf` and `slider-layout` blocks into your theme. These block come from the [**Product Summary**](https://github.com/vtex-apps/product-summary) and the [**Slider-Layout**](https://github.com/vtex-apps/slider-layout) apps.

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

| Prop name              | Type                                   | Description                                                                                                                                                                                                                               | Default value |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `category`             | `String`         |  Category ID of the Shelf listed items. For sub-categories, use `/` before the ID to indicate which category it belongs to. For example: `"1/2"`, considering `2` as a sub-category ID)                                                                                                                                                               |  `undefined`         |
| `specificationFilters` | `Array` | Specification Filters of the Shelf listed items.                                                                                                                                                                                                | `undefined`        |
| `collection`           | `String`                | Collection ID of the Shelf listed items.                                                                                                                                                                                                                  | `undefined`          |
| `orderBy`              | `Enum`                                 | Ordination criterion for the Shelf listed items. Possible values: `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC` | `OrderByTopSaleDESC`          |
| `hideUnavailableItems` | `Boolean`    | Whether unavailable items should be hidden (`true`) or not (`false`)                                                                                                                                                                                                      | `false`       |
| `maxItems` | `Number`       | Maximum items fetched in the context to be displayed on the Shelf.                                                                                                                                                                                                   | `10`       |

- **`specificationFilters` array**

| Prop name              | Type                   | Description                 | Default value |
| ---------------------- | ---------------------- | --------------------------- | ------------- |
| `Id`            | `String`      | Specification Filters ID     | `undefined`         |
| `value`           | `String`       | Specification Filters values  | `undefined`         |

## Related Products Shelf

`RelatedProducts` is a subtype of a Shelf block (`shelf.relatedProduct`) that queries and displays the related products on a Product Details Page. It can therefore only be declared in a product template (`store.product`), for example:

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

| Prop name        | Type                | Description                                                                                                                                            | Default value                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `recommendation` | `Enum`              | Type of recommendations that will be displayed in the Shelf. Possible values: `similars`, `suggestions`, `accessories` (these first three depend on the product's data given in the admin's catalog) and `view`, `buy`, `viewandBought` (These 3 are automatically generated according to the store’s activity) | `similars` |
| `hideOutOfStockItems` | `Boolean` | Whether out of stock items should be hidden (`true`) or not (`false`) | `false` |
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
| `minItemsPerPage` | `Number`  | Minimum amount of Shelf slides. This prop can be used to control how many itens will be displayed on the Shelf even in the smallest screen size. Its value can be a **float**,  which means that you can choose a multiple of 0.5 to indicate that you want to show a "peek" of the next slide on the Shelf. | `1`   |
| `itemsPerPage`    | `Number`  | Maximum amount of Shelf slides. This prop can be used to control how many itens will be displayed on the Shelf even in the biggest screen size. Its value can be a float, which means that you can choose a multiple of 0.5 to indicate that you want to show a "peek" of the next slide on the Shelf.   | `5`           |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

:warning: Notice: **this list does not apply to the** `list-context.product-list` **block**.

| CSS Handles               |
| ------------------------- |
| `container`               |
| `title`                   |
| `relatedProducts`         |
| `arrow`                   |
| `dot`                     |
| `dot--isActive`           |
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
<table>
  <tr>
    <td align="center"><a href="https://github.com/sahanljc"><img src="https://avatars2.githubusercontent.com/u/42151054?v=4" width="100px;" alt=""/><br /><sub><b>Sahan Jayawardana</b></sub></a><br /><a href="https://github.com/vtex-apps/shelf/commits?author=sahanljc" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lucaspacheco-acct"><img src="https://avatars0.githubusercontent.com/u/59736416?v=4" width="100px;" alt=""/><br /><sub><b>Lucas Pacheco</b></sub></a><br /><a href="https://github.com/vtex-apps/shelf/commits?author=lucaspacheco-acct" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
