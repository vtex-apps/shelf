import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import ProductSummary from 'vtex.product-summary/ProductSummary'

import relatedProductsQuery from './queries/relatedProductsQuery.gql'
import ScrollTypes, { getScrollNames, getScrollValues } from './ScrollTypes'
import Shelf from './Shelf'
import ShelfContainer from './ShelfContainer'
import ShelfItem from './ShelfItem'

/**
 * Related Products Component. Queries and shows the related products
 */
class RelatedProducts extends Component {
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
    const products =
      !data || data['error']
        ? []
        : data.product &&
          data.product.recommendations &&
          data.product.recommendations.view
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
    return products && <Shelf {...shelfProps} />
  }
}

RelatedProducts.defaultProps = ShelfContainer.defaultProps

RelatedProducts.getSchema = props => {
  return {
    title: 'editor.shelf.title',
    description: 'editor.shelf.description',
    type: 'object',
    properties: {
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
        default: 'editor.relatedProducts.titleText.default',
      },
      summary: {
        title: 'editor.shelf.summary.title',
        type: 'object',
        properties: ProductSummary.getSchema(props).properties,
      },
    },
  }
}

RelatedProducts.propTypes = {
  /** Graphql data response. */
  data: PropTypes.shape({
    /** Product to have related products queried */
    product: PropTypes.shape({
      /** Recommendations property */
      recommendations: PropTypes.shape({
        /** View recommendations (who saw this product, also saw...) */
        view: PropTypes.arrayOf(ShelfItem.propTypes.item),
      }),
    }),
  }),
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
  /** Main product to have related products queried */
  slug: PropTypes.string,
}

const options = {
  options: ({ slug }) => ({
    variables: {
      slug,
    },
  }),
}

export default graphql(relatedProductsQuery, options)(RelatedProducts)
