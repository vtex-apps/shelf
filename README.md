VTEX Shelf
=====

## Description

The VTEX shelf app is a store component that shows a collection of products, and this app is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Current Release** |  2018-11-08     |                       |             | 2.x
| [0.x]    | **Maintenance LTS** |  2018-04-19     | 2018-11-08            | March 2019  | 1.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)


## Usage
This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

We add the shelf as a block in our [Store](https://github.com/vtex-apps/store/blob/master/store/interfaces.json).

To use this app you need to import it in your dependencies on the `manifest.json`.

```json
  dependencies: {
    "vtex.shelf": "1.x"
  }
```

Then, add `shelf` block into your app theme as we do in our [Store theme app](https://github.com/vtex-apps/store-theme/blob/master/store/blocks.json). 

Shelf Component queries a list of products and shows them. `RelatedProducts` is subtype of shelf component who queries and shows the related products.

Now, you can change the behavior of the shelf block that is in the store home. See an example of how to configure: 
```json
"shelf": {
  "props": {
    "orderBy": "OrderByTopSaleDESC",
    "productList": {
      "maxItems": 10,
      "itemsPerPage": 4,
      "scroll": "BY_PAGE",
      "arrows": true,
      "titleText": "New collection",
      "summary": {
        "isOneClickBuy": false,
        "showBadge": true,
        "badgeText": "OFF",
        "buyButtonText": "Comprar",
        "displayBuyButton": "displayButtonHover",
        "showCollections": false,
        "showListPrice": true,
        "showLabels": false,
        "showInstallments": true,
        "showSavings": true,
        "name": {
          "showBrandName": false,
          "showSku": false,
          "showProductReference": false
        }
      }
    }
  }
}
```

## Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within `shelf` and `related-products` and describes if they are required or optional.

```json
  "shelf": {
    "component": "Shelf"
  },
  "related-products": {
    "component": "RelatedProducts"
  }
```
### Configuration 
Through the Storefront, you can change the shelf's behavior and interface. However, you also can make in your theme app, as Store theme does.

For `Shelf`:

| Prop name          | Type       | Description  | Default value |
| ------------------ | ---------- | ------------------------------------------------------------------ | ---------------- |
| `category`                  | `Number`   | Category ID of the listed items in the shelf              |         -
| `collection`                | `Number`   | Shows the remove button in each item                      |         -
| `orderBy`                   | `Enum`   | Ordenation type of the items in the shelf. Possible values: `OrderByTopSaleDESC`, `OrderByPriceDESC`, `OrderByPriceASC` |`OrderByTopSaleDESC`
| `productList`               | `ProductListSchema` | Product list schema.  `See ProductListSchema`    |         -

For `RelatedProducts`:

| Prop name          | Type       | Description   | Default value |
| ------------------ | ---------- | ------------------------------------------------------------------------ | ---------------- |
| `recommendation`            | `Enum`   | Type of recommendations that is shown. Possible values: `editor.relatedProducts.similars`, `editor.relatedProducts.view`, `editor.relatedProducts.buy` | `editor.relatedProducts.similars`
| `productList`               | `ProductListSchema` | Product list schema.  `See ProductListSchema`          | -

`ProductListSchema`:

| Prop name          | Type       | Description   | Default value |
| ------------------ | ---------- | ------------------------------------------------------------------------ | ---------------- |
| `maxItems`                  | `Number`   | Maximum number of items in the shelf.                     | 10
| `scroll`                    | `Enum`   | Scroll type of slide transiction.  Possible values: `BY_PAGE`, `ONE_BY_ONE` | `BY_PAGE`
| `arrows`                    | `Boolean`  | If the arrows are showable or not.                        | `true`
| `titleText`                 | `String`   | Title of the shelf.                                       | `null`
| `summary`                   | `Object`   | Product Summary schema properties.                        | -
| `gap`                       | `Enum`   | Gap between items. Possible values: `ph0`, `ph3`,`ph5`, `ph7`| `ph3`


Also, you can configure the product summary that is defined on shelf. See [here](https://github.com/vtex-apps/product-summary/blob/master/README.md#configuration) the Product Summary API.

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.shelf.css` inside the `styles/css` folder. Add your custom styles:
```css
.container {
  margin-top: 10px;
}
```
#### CSS namespaces
Below, we describe the namespaces that are defined in the `Shelf` and `RelatedProducts`.

Class name        | Description                    | Component Source        
----------------- | ------------------------------ | ------------------------
`container`       | The main container of `Shelf` | [index](/react/Shelf.js)
`title`           | Shelf title label | [index](/react/ProductList.js)
`relatedProducts` | The main container of `RelatedProducts` | [index](/react/index.js)
`slide`           | Slider in Shelf | [Popup](/react/ShelfContent.js)

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/shelf/issues). Also feel free to [open issues](https://github.com/vtex-apps/shelf/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to `react/` folder and run `yarn test` 
