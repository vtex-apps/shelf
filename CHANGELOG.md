# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Support for partially showing the next item in the Shelf on mobile.

## [1.26.0] - 2019-08-13

### Changed
- Make shelf render strategy `lazy`, i.e. component is only fetched client-side.

## [1.25.1] - 2019-08-06
### Changed
- Use product parsing logic from product-summary.

## [1.25.0] - 2019-08-05

### Added

- New `paginationDotsVisibility` prop to control whether the pagination dots indication is displayed or not.

## [1.24.0] - 2019-08-05
### Added
- Add imageLabel to productsQuery and pass it to product-summary.

## [1.23.1] - 2019-08-05

### Changed
- Limit installments query, using MAX criteria.

## [1.23.0] - 2019-08-02

### Added

- New `minItemsPerPage` prop to control the minimum number of items displayed in the Shelf.

## [1.22.3] - 2019-07-31
### Fixed
- Issue with IntersectionObserver on Safari 12.0, making the whole page crash. A polyfill has been added for the time being, while the fix for the issue is not published on polyfill.io.

## [1.22.2] - 2019-07-31
### Removed
- cateogryTree resolver from product queries to improve performance, data was unnecessary at that moment.

## [1.22.1] - 2019-07-30
- Added `properties` field in `Products` query.

## [1.22.0] - 2019-07-25
### Added
- `hideUnavailableItems` prop, along with accompanying option on the Shelf schema.

## [1.21.2] - 2019-07-25
### Changed
- Removed the "(Default)" from the default ordering options

## [1.21.1] - 2019-07-23
### Changed
- Shelf sorting through the store-front now supports every type of sort available from the API
- The default `orderBy`is now by relevance 

## [1.21.0] - 2019-07-15
### Changed
- Send impressions as list and only send them when Shelf is viewed by user.

### Added
- Make ProductList component importable in other apps

## [1.20.4] - 2019-07-04
### Changed
- Re-enables SSR, which was disabled temporarily on 1.13.1.
- Revert title text schema hotfix made on 1.20.3.

### Fixed
- Prevents the size from shifting when the transition between SSR to CSR happens.

## [1.20.3] - 2019-07-03 [YANKED]
### Fixed
- Hotfix for issue with title schema, which was saving the ID instead of the value. Should be undone once the root issue is fixed.

## [1.20.2] - 2019-07-03
### Fixed 
- Issue which would break the query if collections was null.

## [1.20.1] - 2019-06-27

### Fixed
- Build assets with new builder hub.

## [1.20.0] - 2019-06-24
### Added
- `brandId` on `productsQuery`.

## [1.19.0] - 2019-06-18

### Added

- Shelf can now query for specificationFilters in its query.

## [1.18.1] - 2019-06-17

### Changed

- Change type of category prop on schema to "String", to allow the query and display of subcategories.

## [1.18.0] - 2019-06-14

### Added

- Add `productReference` field to query.

## [1.17.0] - 2019-05-27

### Changed

- Use pixel-manager@1.x.

## [1.16.3] - 2019-05-26

### Fixed

- Correctly parse old recommendation prop on RelatedProduct shelf.

## [1.16.2] - 2019-05-26

### Fixed

- Prevent RelatedProducts from crashing if there's no data

## [1.16.1] - 2019-05-25

### Fixed

- Improve performance by removing dependencies and using function components.
- productImpression event being called more than once for each product.

## [1.16.0] - 2019-05-25

### Added

- Add `contentSchemas.json` for definition of content properties
- i18n content edition support through CMS

## [1.15.3] - 2019-05-24

### Changed

- Make Related products shelf fetch its items.

## [1.15.2] - 2019-05-24

## [1.15.1] - 2019-05-24

### Fixed

- Fixed blinking/infinite loop when height was resized, due to images not loading and whatnot.

## [1.15.0] - 2019-05-17

### Added

- Send productImpression events to Pixel Manager.

## [1.14.1] - 2019-05-16

### Fixed

- Export `getSchema` on `Shelf`.

## [1.14.0] - 2019-05-15

### Added

- Send productClick events to Pixel Manager.

## [1.13.1] - 2019-05-13

### Added

- Adds loading preview to the shelf interfaces.

### Changed

- Disabled SSR on graphql query. Intended to be a temporary change.

## [1.13.0] - 2019-05-07

## [1.12.0] - 2019-04-24

### Changed

- Scope messages by domain

## [1.11.2] - 2019-04-15

### Fixed

- Show item even when is unavailable.

## [1.11.1] - 2019-04-02

### Fixed

- Fix sliderWidth when there was less items than the number of itens to show per slide.

## [1.11.0] - 2019-04-02

### Added

- Add slide per page option on slider.

## [1.10.4] - 2019-03-29

### Fixed

- Add gap types names in `en.json`.

## [1.10.3] - 2019-03-29

### Fixed

- Remove Product Summary schema.

## [1.10.2] - 2019-03-28

### Changed

- Storefront label names when option is only for web devices.

## [1.10.1] - 2019-03-27

## [1.10.0] - 2019-03-27

### Changed

- Replace `slick-slider` to `vtex-slider`.

## [1.9.1] - 2019-03-25

### Fixed

- Fix proptypes warnings.

## [1.9.0] - 2019-03-21

### Added

- Track click events

## [1.8.3] - 2019-03-21

### Fixed

- Search for first available item on sku list.

## [1.8.2] - 2019-03-21

### Changed

- Use most generic language files.

## [1.8.1] - 2019-03-19

### Added

- Added image resize for 500px.
- Snapshot tests.

## [1.8.0] - 2019-02-18

### Added

- Create `TabbedShelf` component, add to interfaces

## [1.7.0] - 2019-02-18

### Added

- Add configuration to show the shelf title.

### Changed

- Add `product-summary` as a block in `interfaces.json`.

## [1.6.0] - 2019-02-15

### Added

- Support to CSS Modules.

## [1.5.8] - 2019-02-14

### Changed

- `Shelf` use full width when `itemsPerPage` are five or more and padding between items is set using tachyons.

## [1.5.7] - 2019-02-14

### Fixed

- Fix summary.name prop undefined when setting name tag.

## [1.5.6] - 2019-02-13

### Changed

- Set `ProductName` tag as H2 element.

## [1.5.5] - 2019-02-11

### Fixed

- Align `ShelfItems` height.

## [1.5.4] - 2019-02-11

### Changed

- Change Responsiveness implementation and add fixed gap between item.

## [1.5.3] - 2019-02-05

### Changed

- Bumping version to use new messages 1.x builder

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

- **react** Create `react` folder.
- **pages** Create `pages` folder.
- **graphql** Create `productsQuery` to fetch products from `store-graphql`.
- **extension** Add feature of use external `Extension Points` .
- **continuous integration** Add integration with `Travis CI`.

### Changed

- **manifest** Add dependency to `vtex.store-graphql`.
- **manifest** Add `policies` and `registries`.
- **manifest** Remove unused dependencies.

### Removed

- **render** Remove `/render` folder.
