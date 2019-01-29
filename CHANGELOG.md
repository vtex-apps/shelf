# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.5.2] - 2019-01-29
### Fixed
- Remove `inheritComponent` from blocks.

## [1.5.1] - 2019-01-23

## [1.5.0] - 2019-01-23

## [1.4.0] - 2019-01-18
### Changed
- Update React builder to 3.x.

## [1.3.3] - 2019-01-14
### Fixed
- Change Slider CSS tokens. 

## [1.3.2] - 2019-01-14
### Fixed
- Related products alignment.

## [1.3.1] - 2019-01-11
### Fixed
- Add max-width on shelf Container.

## [1.3.0] - 2019-01-09
### Changed
- Add padding on shelf through `Container` component.
- Bye `pages.json`! Welcome `store-builder`.

## [1.2.0] - 2018-12-20
### Added
- Support to messages builder.

### Fixed
- Update `README.md`.

## [1.1.4] - 2018-12-12
### Fixed
- Shelf keep loading when a query error happened.

## [1.1.3] - 2018-12-04
### Changed
- Improve font weights and paddings

## [1.1.2] - 2018-12-02
### Changed
- Update major version of `storecomponents` and `product-summary`

## [1.1.1] - 2018-11-28

## [1.0.2] - 2018-11-28
### Changed
- CSS refactoring.
### Fixed
- Right arrow placement.

## [1.1.0] - 2018-11-28
### Added
- Now, shelf title has intl.

## [1.0.1] - 2018-11-13
### Fixed
- Fix slider dots to same size on different components.

## [1.0.0] - 2018-11-08
### Fixed
- Refact to use design tokens.

## [0.19.6] - 2018-11-05
### Fixed
- Limits quantity of items in mobile devices while onSSR.

## [0.19.5] - 2018-11-05
### Fixed
- Fix product spacing in smaller screens.

## [0.19.4] - 2018-10-19
### Fixed
- Show unavailable products on shelf.

## [0.19.3] - 2018-10-15
### Fixed
- Fix product spacing

## [0.19.2] - 2018-09-13
### Added
- Page padding to match footer and other page components.

## [0.19.1] - 2018-09-13
### Changed
- Update the `vtex.product-summary` version.

## [0.19.0] - 2018-08-31
### Changed
- Update the `vtex.store-components` version.

## [0.18.2] - 2018-08-29
### Fixed
- Inifinite content loader when products array is loaded but empty.

## [0.18.1] - 2018-08-28
### Fixed
- Show only buyable products.

## [0.18.0] - 2018-08-27
### Added
- Different types of recommendation in `RelatedProducts` schema.

### Changed
- Removed `relatedProductQuery` to use the context.

## [0.17.7] - 2018-08-16
### Added
- `Shelf` content loader.

### Fixed
- destructuring of undefined in `ShelfItem`.

## [0.17.6] - 2018-08-08
### Changed
- Refactor ShelfItem.
- Pass ssrFallback to `Slider` component.

## [0.17.5] - 2018-07-23

## [0.17.4] - 2018-07-23

## [0.17.3] - 2018-07-23
### Removed
- title of Related Products List when there's no products.

### Added
- Stale cache for product preview

## [0.17.2] - 2018-7-9
### Fixed
- Prevent rerender on first edit because of lacking default prop.

## [0.17.1] - 2018-7-9
### Fixed
- `ShelfContent` ref warning.

## [0.17.0] - 2018-6-18
### Added
- `isLayout` to schema properties.

## [0.16.0] - 2018-6-18
### Changed
- Product query to include the `productClusters`.

## [0.15.0] - 2018-6-14
### Added
- Add the _RelatedProducts_ Component and a _ProductList_ to divide the responsibilities.

## [0.14.0] - 2018-6-11
### Added
- Add internationalization into shelf schema

## [0.13.5] - 2018-05-29
### Fixed
- Fix products query to get the SKU Installments.

## [0.13.4] - 2018-05-24
### Fixed
- Fix arrow right position

## [0.13.3] - 2018-05-21
### Changed
- Update `vtex.storecomponents` version to 1.x

## [0.13.2] - 2018-05-18
### Fixed
- **className** Fix slider classNames
- Fix Product Summary width on mobile mode

## [0.13.1] - 2018-05-11
### Fixed
- **shelfitem** Add propType itemId
- Fix bug of slidesToScroll not assigned in the default settings

## [0.13.0] - 2018-05-11
### Added
- **slick slider** Integrate with vtex.storecomponents/Slider
- **ssr** Implement SSR

## [0.12.1] - 2018-05-10
### Fixed
- **css** Fix z-index of left arrow

## [0.12.0] - 2018-05-09
### Changed
- **Queries** Update product query to get skuId. 

## [0.11.1] - 2018-04-27
### Fixed
  - **bug** Fix bug of reference id

## [0.11.0] - 2018-04-27
### Changed
 - **defaultProps** Add default value to prop `title` in the Shelf
 - **file** Change filename `theme.css` to `global.css`
 - **shelf** Adjust the `maximum number` of items inside the Shelf based on the screen resolution
 - **extension** Change schema of `product` passed to the ExtensionPoint
### Removed
 - **pages** Remove `css` reference
 - **placeholder product** Now the `responsible` to set the default item value is the Extension

## [0.10.0] - 2018-04-24
### Added
 - **shelf** Add `itemsPerPage` to the properties of schema
 - **shelf** Add integration with `@vtex/slick-components`
 - **doc** Create CHANGELOG.md
### Changed
 - **shelf** Refactor Shelf structure
### Removed
 - **shelf** Remove components `Arrow` and `Dots`

## [0.9.0] - 2018-04-19
### Added
* **react** Create `react` folder.
* **pages** Create `pages` folder.
* **graphql** Create `productsQuery` to fetch products from `store-graphql`.
* **extension** Add feature of use external `Extension Points` .
* **continuous integration** Add integration with `Travis CI`.
### Changed
* **manifest** Add dependency to `vtex.store-graphql`.
* **manifest** Add `policies` and `registries`.
* **manifest** Remove unused dependencies.
### Removed
* **render** Remove `/render` folder.
  
