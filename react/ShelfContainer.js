import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import ProductSummary from 'vtex.product-summary/ProductSummary'

import OrdenationTypes, { getOrdenationNames, getOrdenationValues } from './OrdenationTypes'
import productsQuery from './queries/productsQuery.gql'
import ScrollTypes, { getScrollNames, getScrollValues } from './ScrollTypes'
import Shelf from './Shelf'
import ShelfContent from './ShelfContent'

/**
 * Shelf (container) Component. Queries a list of products and shows them.
 */
class ShelfContainer extends Component {
  render() {
    const {
      data,
      maxItems,
      titleText,
      arrows,
      scroll,
      itemsPerPage,
      summary,
    } = this.props
    const products = !data || data['error'] ? [] : data.products
    const shelfProps = {
      products,
      loading: data.loading,
      maxItems,
      titleText,
      arrows,
      scroll,
      itemsPerPage,
      summary,
    }
    return <Shelf {...shelfProps} />
  }
}

ShelfContainer.defaultProps = Shelf.defaultProps

ShelfContainer.getSchema = props => {
  return {
    title: 'editor.shelf.title',
    description: 'editor.shelf.description',
    type: 'object',
    properties: {
      category: {
        title: 'editor.shelf.category.title',
        type: 'number',
      },
      collection: {
        title: 'editor.shelf.collection.title',
        type: 'number',
      },
      orderBy: {
        title: 'editor.shelf.orderBy.title',
        type: 'string',
        enum: getOrdenationValues(),
        enumNames: getOrdenationNames(),
        default: OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
      },
      maxItems: {
        title: 'editor.shelf.maxItems.title',
        type: 'number',
        default: Shelf.defaultProps.maxItems,
      },
      itemsPerPage: {
        title: 'editor.shelf.itemsPerPage.title',
        type: 'number',
        enum: [3, 4, 5],
        default: Shelf.defaultProps.itemsPerPage,
      },
      scroll: {
        title: 'editor.shelf.scrollType.title',
        type: 'string',
        enum: getScrollValues(),
        enumNames: getScrollNames(),
        default: ScrollTypes.BY_PAGE.value,
      },
      arrows: {
        title: 'editor.shelf.arrows.title',
        type: 'boolean',
        default: Shelf.defaultProps.arrows,
      },
      titleText: {
        title: 'editor.shelf.titleText.title',
        type: 'string',
        default: 'Default Title',
      },
      summary: {
        title: 'editor.shelf.summary.title',
        type: 'object',
        properties: ProductSummary.getSchema(props).properties,
      },
    },
  }
}

ShelfContainer.propTypes = {
  /** Graphql data response. */
  data: PropTypes.shape({
    products: ShelfContent.propTypes.products,
  }),
  /** Category Id. */
  category: PropTypes.number,
  /** Collection Id. */
  collection: PropTypes.number,
  /** Ordenation Type. */
  orderBy: PropTypes.oneOf(getOrdenationValues()),
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
  /** Show the related products */
  relatedProducts: PropTypes.bool,
  /** Main product to have related products queried */
  slug: PropTypes.string,
}

const options = {
  options: ({
    category,
    collection,
    orderBy,
    maxItems = Shelf.defaultProps.maxItems,
  }) => ({
    variables: {
      category,
      collection,
      specificationFilters: [],
      orderBy,
      from: 0,
      to: maxItems - 1,
    },
  }),
}

export default graphql(productsQuery, options)(ShelfContainer)
