import React from 'react'
import PropTypes from 'prop-types'
import { path, last } from 'ramda'
import { Query } from 'react-apollo'

import productRecommendations from './queries/productRecommendations.gql'

import ProductList from './ProductList'
import { productListSchemaPropTypes } from './propTypes'
import shelf from './shelf.css'


// Previous values were in a wrong format with the message string in the enum value.
const fixRecommendation = recommendation => {
  if (recommendation.includes('admin/editor.relatedProducts.')) {
    return last(recommendation.split('.'))
  }
  return recommendation
}

/**
 * Related Products Component. Queries and shows the related products
 */

const RelatedProducts = ({ productQuery, productList, recommendation: cmsRecommendation }) => {
  const productId = path(['product', 'productId'], productQuery)
  if (!productId) {
    return null
  }
  const recommendation = fixRecommendation(cmsRecommendation)
  const variables = { identifier: { field: 'id', value: productId }, type: recommendation }
  return (
    <Query 
      query={productRecommendations}
      variables={variables}
      partialRefetch
      ssr={false}
    > 
    {({data, loading}) => {
      const { productRecommendations } = data
      const productListProps = {
        products: productRecommendations || [],
        loading,
        ...productList,
      }
      return (
        <div className={shelf.relatedProducts}>
          <ProductList {...productListProps} />
        </div>
      )
    }}
    </Query>
  )
}

RelatedProducts.propTypes = {
  /** Main product to have related products queried */
  slug: PropTypes.string,
  /** Graphql productQuery response. */
  productQuery: PropTypes.shape({
    /** Product to have related products queried */
    product: PropTypes.shape({
      productId: PropTypes.string,
    }),
    loading: PropTypes.bool,
  }),
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
}

RelatedProducts.defaultProps = { 
  recommendation: 'similars',
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
    title: 'admin/editor.relatedProducts.title',
    description: 'admin/editor.relatedProducts.description',
    type: 'object',
    properties: {
      recommendation: {
        title: 'admin/editor.relatedProducts.recommendation',
        description: 'admin/editor.relatedProducts.recommendation.description',
        type: 'string',
        default: RelatedProducts.defaultProps.recommendation,
        enum: [
          'similars',
          'view',
          'buy',
          'accessories',
          'viewAndBought',
          'suggestions'
        ],
        enumNames: [
          'admin/editor.relatedProducts.similars',
          'admin/editor.relatedProducts.view',
          'admin/editor.relatedProducts.buy',
          'admin/editor.relatedProducts.accessories',
          'admin/editor.relatedProducts.viewAndBought',
          'admin/editor.relatedProducts.suggestions',
        ],
      },
      productList: productListSchema,
    },
  }
}

export default RelatedProducts