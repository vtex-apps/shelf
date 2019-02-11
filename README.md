# Shelf

## Description

VTEX App that shows a shelf of products. This is a VTEX app that is used by Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [0.x]    | **Maintenance LTS** |  2018-04-19     | 2018-11-08            | March 2019  | 1.x
| [1.x]    | **Current Release** |  2018-11-08     |                       |             | 2.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
- [Blocks API](#blocks-api)
  - [Configuration](#configuration)
- [Styles API](#styles-api)
- [Tests](#tests)
- [Troubleshooting](#troubleshooting)


## Usage
This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app you need to import it in your dependencies on the `manifest.json`.

```json
  dependencies: {
    "vtex.shelf": "1.x"
  }
```

Then, add `shelf` block into our app theme, like we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json). 

## Blocks API

This app has an interface that describes what are the rules that the blocks must implement when you want to use the shelf block. 

```json
  "shelf": {
    "component": "Shelf"
  },
  "related-products": {
    "component": "RelatedProducts"
  }
```
### Configuration 
Through the Storefront, you can change the shelf's behavior and interface. However, you also can make in your theme app, as Dreamstore does.

| Prop name          | Type       | Description                                                                                 |
| ------------------ | ---------- | ------------------------------------------------------------------ |
| `category`                  | `Number`   | Category ID of the listed items in the shelf              |
| `collection`                | `Number`   | Shows the remove button in each item                      |
| `orderBy`                   | `String`   | Ordenation type of the items in the shelf. `See OrderEnum`|
| `maxItems`                  | `Number`   | Maximum number of items in the shelf.                     |
| `scroll`                    | `String`   | Scroll type of slide transiction. `See ScrollEnum`        |
| `arrows`                    | `Boolean`  | If the arrows are showable or not.                        |
| `titleText`                 | `String`   | Title of the shelf.                                       |
| `summary`                   | `Object`   | Product Summary schema properties.                        |

`OrderEnum`:

| Value | Type      | Description |
| ----- | --------- | ----------- |
| `OrderByTopSaleDESC`   | `String`  | Order by the top items sales            |
| `OrderByPriceDESC`     | `String`  | Order by the items price *(descendent)* |
| `OrderByPriceASC`      | `String`  | Order by the items price *(ascendant)*  |

`ScrollEnum`:

| Value | Type      | Description |
| ----- | --------- | ----------- |
| `BY_PAGE`      | `String`  | Scroll item, page by page |
| `ONE_BY_ONE`   | `String`  | Scroll item, one by one   |

Also, you can configure the product summary that is defined on shelf. See [here](https://github.com/vtex-apps/product-summary/blob/master/README.md#configuration) the Product Summary API.

## Styles API
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/shelf/issues). Also feel free to [open issues](https://github.com/vtex-apps/shelf/issues/new) or contribute with pull requests.

## Tests
:construction: :construction: :construction:

### Running Tests
To run the test suit, type the following in the terminal, inside the folder `react`

```sh
$ npm t     # this
$ yarn test # or this one
```

To update the tests snapshots use

```sh
$ npm t -- -u  # like this
$ yarn test -u # or this
```