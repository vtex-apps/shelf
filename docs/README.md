📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Shelf

The Shelf is a theme block responsible for showing a **collection of products** in the home page. 

![shelf](https://user-images.githubusercontent.com/52087100/70079904-60dc5280-15e4-11ea-8ef6-0aa69cadd61d.png)

## Configuration

1. Import the Shelf app to your theme's dependencies on the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.shelf": "1.x"
  }
```

2. Add the `shelf` block into your theme. The Shelf block queries a list of products and it can be added into any template of your theme. For it to properly function, the [**Product Summary**](https://github.com/vtex-apps/product-summary) also needs to be added to the Shelf. Check an implementation example below:


```json
{
  "shelf": {
    "blocks": ["product-summary.shelf"],
    "props": {
      "category": 1,
      "orderBy": "OrderByTopSaleDESC",
      "paginationDotsVisibility": "desktopOnly",
      "productList": {
        "maxItems": 8,
        "itemsPerPage": 4,
        "minItemsPerPage": 1,
        "scroll": "BY_PAGE",
        "arrows": true,
        "titleText": "Top sellers"
      }
    }
  },
  
  "product-summary": {
  "props": {
    "isOneClickBuy": false,
    "showBadge": true,
    "badgeText": "OFF",
    "displayBuyButton": "displayButtonHover",
    "showCollections": false,
    "showListPrice": true,
    "showLabels": false,
    "showInstallments": true,
    "showSavings": true
  }
}

}
```

:warning: `RelatedProducts` is a subtype of a Shelf block (`shelf.relatedProduct`) that queries and displays the related products on a Product Details Page. It can therefore only be declared in a product template (`store.product`), for example:

```json
{
  "store.product": {
    "children": [
      "breadcrumb",
      "flex-layout.row#main",
      "shelf.relatedProducts"
    ]
  },
```

### Shelf 

| Prop name                  | Type                             | Description                                                                                                                                                                                                                                            | Default value     |
| -------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `category`                 | `String`                         | Category ID of the listed items in the shelf. For sub-categories, use "/" before the ID.                                                                                                                                                              | -                 |
| `specificationFilters`     | `Array(SpecificationFilterItem)` | Specification Filters of the listed items in the shelf. )                                                                                                                                                                                              | []                |
| `collection`               | `String`                         | Input a collection ID to display products from a collection.                                                                                                                                                                                                                   | -                 |
| `orderBy`                  | `Enum`                           | Ordenation type of the items in the shelf. Possible values: `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC` or `''` (default value by relevance) | `''`              |
| `hideUnavailableItems`     | `Boolean`                        | Hides items that are unavailable.                                                                                                                                                                                                                      | `false`           |
| `skusFilter`               | `SkusFilterEnum`                 | Control SKUs returned for each product in the query. The less SKUs needed to be returned, the more performant your shelf query will be.                                                                                                    | `"ALL_AVAILABLE"` |
| `paginationDotsVisibility` | `Enum`                           | Controls if pagination dots below the Shelf should be rendered or not. Possible values: `visible` (always show), `hidden` (never show), `desktopOnly`, `mobileOnly`                                                                                    | `visible`         |
| `productList`              | `ProductListSchema`              | Product list schema. For its configuration, you can check the `ProductListSchema`  nbdfjf below.                                                                                                                                                                                                           | -                 |

- For `SkusFilterEnum`:

| Name | Value | Description |
| ---- | ----- | ----------- |
| First Available | `FIRST_AVAILABLE` | Most performant, ideal if you do not have a SKU selector in your shelf. Will return only the first available SKU for that product in your shelf query. |
| All Available | `ALL_AVAILABLE` | A bit better performace, will only return SKUs that are available, ideal if you have a SKU selector but still want a better performance. |
| All | `ALL` | Returns all SKUs related to that product, least performant option. |

- For `SpecificationFilterItem`:

| Prop name | Type     | Description                                      | Default value |
| --------- | -------- | ------------------------------------------------ | ------------- |
| `id`      | `String` | ID of Specification Filter to be searched for    | ""            |
| `value`   | `String` | Value of Specification Filter to be searched for | ""            |


It is possible to add a related products shelf in a Product Details Page. Once its content depends on product data, the `RelatedProducts`block can only be declared in a product template (`store.product`). 

### `RelatedProducts`:

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

