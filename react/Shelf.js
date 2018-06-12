import './global.css'

import Spinner from '@vtex/styleguide/lib/Spinner'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import VTEXClasses from './CustomClasses'
import ScrollTypes, { getScrollValues } from './ScrollTypes'
import ShelfContent from './ShelfContent'

const DEFAULT_MAX_ITEMS = 10
const DEFAULT_ITEMS_PER_PAGE = 5

/**
 * Shelf (UI) Component. Shows a collection of products.
 */
export default class Shelf extends Component {
  render() {
    const {
      products,
      loading,
      maxItems,
      titleText,
      arrows,
      scroll,
      itemsPerPage,
      summary,
    } = this.props
    return (
      <div className={`${VTEXClasses.MAIN_CLASS} ml7 mr7 pv4 pb7`}>
        <div
          className={`${
            VTEXClasses.TITLE_CONTENT_CLASS
          } w-100 flex justify-center`}>
          <h1 className={VTEXClasses.TITLE_TEXT_CLASS}> {titleText}</h1>
        </div>
        {loading ? (
          <div className="w-100 flex justify-center">
            <div className="w3 ma0">
              <Spinner />
            </div>
          </div>
        ) : (
          <ShelfContent
            products={products}
            maxItems={maxItems}
            arrows={arrows}
            scroll={scroll}
            itemsPerPage={itemsPerPage}
            summary={summary}
          />
        )}
      </div>
    )
  }
}

Shelf.defaultProps = {
  maxItems: DEFAULT_MAX_ITEMS,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  scroll: ScrollTypes.BY_PAGE.value,
  arrows: true,
  titleText: 'Default Title',
}

Shelf.propTypes = {
  /** Loading status */
  loading: PropTypes.bool,
  /** Graphql data response. */
  products: ShelfContent.propTypes.products,
  /** Maximum number of items in the shelf. */
  maxItems: PropTypes.number.isRequired,
  /** Maximum number of items in a page. */
  itemsPerPage: PropTypes.number.isRequired,
  /** Scroll options. */
  scroll: PropTypes.oneOf(getScrollValues()),
  /** If the arrows are showable or not. */
  arrows: PropTypes.bool.isRequired,
  /** Text value of the title. */
  titleText: PropTypes.string,
  /** Product Summary schema props */
  summary: PropTypes.any,
}
