import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import path from 'ramda/es/path'
import last from 'ramda/es/last'
import { Query } from 'react-apollo'
import { useDevice } from 'vtex.device-detector'
import { ProductListContext } from 'vtex.product-list-context'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import { useTreePath } from 'vtex.render-runtime'

import productRecommendationsQuery from './queries/productRecommendations.gql'
import ProductList from './components/ProductList'
import { productListSchemaPropTypes } from './utils/propTypes'
import { filterOutOfStock } from './utils/filterOutOfStock'

const CSS_HANDLES = ['relatedProducts']

const { ProductListProvider } = ProductListContext

// Previous values were in a wrong format with the message string in the enum value.
const fixRecommendation = recommendation => {
  if (recommendation.includes('editor.relatedProducts.')) {
    return last(recommendation.split('.'))
  }
  return recommendation
}

/**
 * Related Products Component. Queries and shows the related products
 */
const RelatedProducts = ({
  productQuery,
  productList,
  recommendation: cmsRecommendation,
  trackingId: rawTrackingId,
  hideOutOfStockItems,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const treePath = useTreePath()

  const productContext = useProduct()

  let trackingId = rawTrackingId

  if (!trackingId) {
    // Taking the block name to pass to listName if no trackingId is passed
    const treePathList =
      (typeof treePath === 'string' && treePath.split()) || []
    trackingId = treePathList[treePathList.length - 1] || 'List of products'
  }

  const productId =
    path(['product', 'productId'], productQuery) ||
    path(['product', 'productId'], productContext)

  const recommendation = productId ? fixRecommendation(cmsRecommendation) : null
  const variables = useMemo(() => {
    if (!productId) {
      return null
    }

    return {
      identifier: { field: 'id', value: productId },
      type: recommendation,
    }
  }, [productId, recommendation])

  if (!productId) {
    return null
  }

  return (
    <Query
      query={productRecommendationsQuery}
      variables={variables}
      partialRefetch
      ssr={false}
    >
      {({ data, loading }) => {
        if (!data) {
          return null
        }
        const { productRecommendations = [] } = data

        const productListProps = {
          products: hideOutOfStockItems
            ? filterOutOfStock(productRecommendations)
            : productRecommendations,
          loading,
          ...productList,
          isMobile,
          trackingId,
        }
        return (
          <div className={handles.relatedProducts}>
            <ProductListProvider listName={trackingId}>
              <ProductList {...productListProps} />
            </ProductListProvider>
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
  trackingId: PropTypes.string,
  hideOutOfStockItems: PropTypes.bool,
}

RelatedProducts.defaultProps = {
  recommendation: 'similars',
  productList: {
    ...ProductList.defaultProps,
    titleText: 'Related Products',
  },
  hideOutOfStockItems: false,
}

RelatedProducts.schema = {
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
        'suggestions',
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
    productList: ProductList.schema,
    hideOutOfStockItems: {
      title: 'admin/editor.shelf.hideOutOfStockItems',
      type: 'boolean',
      default: false,
    },
  },
}

export default RelatedProducts
