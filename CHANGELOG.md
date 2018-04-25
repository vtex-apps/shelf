# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
 - **defaultProps** Add default value to prop `title` in the Shelf

### Changed
 - **file** Change filename `Theme.css` to `Global.css`
 - **shelf** Adjust the `maximum number` of items inside the Shelf based on the screen resolution

### Removed
 - **pages** Remove `css` reference
 - **placeholder product** Now the `responsible` to set the default item value is the Extension

## [0.10.0] - 2018-24-04

### Added
 - **shelf** Add `itemsPerPage` to the properties of schema
 - **shelf** Add integration with `@vtex/slick-components`
 - **doc** Create CHANGELOG.md

### Changed
 - **shelf** Refactor Shelf structure

### Removed
 - **shelf** Remove components `Arrow` and `Dots`

## [0.9.0] - 2018-19-04

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
  