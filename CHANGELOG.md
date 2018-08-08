# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
  
