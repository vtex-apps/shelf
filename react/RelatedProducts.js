import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import ProductList from './ProductList'
import { productListSchemaPropTypes } from './propTypes'
import relatedProductsQuery from './queries/relatedProductsQuery.gql'
import ShelfItem from './ShelfItem'

/**
 * Related Products Component. Queries and shows the related products
 */
class RelatedProducts extends Component {
  render() {
    const { data, productList, slug } = this.props
    const products =
      (data &&
        !data['error'] &&
        data.product &&
        data.product.recommendations &&
        data.product.recommendations.view) ||
      []
    const productListProps = {
      products,
      loading: data.loading,
      ...productList,
    }
    return <ProductList {...productListProps} />
  }
}

RelatedProducts.defaultProps = {
  productList: {
    ...ProductList.defaultProps,
    titleText: 'Related Products',
  },
}

RelatedProducts.getSchema = props => {
  const productListSchema = ProductList.getSchema(props)
  productListSchema.properties.titleText.default =
    RelatedProducts.defaultProps.productList.titleText

  return {
    title: 'editor.relatedProducts.title',
    description: 'editor.relatedProducts.description',
    type: 'object',
    properties: {
      productList: productListSchema,
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
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
}

const options = {
  options: ({ slug }) => ({
    variables: {
      slug,
      distinctRecomendations: true
    },
  }),
}

export default graphql(relatedProductsQuery, options)(RelatedProducts)
