import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { shelfSchemaPropTypes } from './propTypes'
import relatedProductsQuery from './queries/relatedProductsQuery.gql'
import Shelf from './Shelf'
import ShelfItem from './ShelfItem'

/**
 * Related Products Component. Queries and shows the related products
 */
class RelatedProducts extends Component {
  render() {
    const { data, shelf } = this.props
    const products =
      !data || data['error']
        ? []
        : data.product &&
          data.product.recommendations &&
          data.product.recommendations.view
    const shelfProps = {
      products,
      loading: data.loading,
      ...shelf,
    }
    return <Shelf {...shelfProps} />
  }
}

RelatedProducts.defaultProps = {
  shelf: {
    ...Shelf.defaultProps,
    titleText: 'Related Products',
  },
}

RelatedProducts.getSchema = props => {
  const shelfSchema = Shelf.getSchema(props)
  shelfSchema.properties.titleText.default =
    RelatedProducts.defaultProps.shelf.titleText

  return {
    title: 'editor.relatedProducts.title',
    description: 'editor.relatedProducts.description',
    type: 'object',
    properties: {
      shelf: shelfSchema,
    },
  }
}

RelatedProducts.propTypes = {
  /** Main product to have related products queried */
  slug: PropTypes.string,
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
  /** Shelf schema configuration */
  shelf: PropTypes.shape(shelfSchemaPropTypes),
}

const options = {
  options: ({ slug }) => ({
    variables: {
      slug,
    },
  }),
}

export default graphql(relatedProductsQuery, options)(RelatedProducts)
