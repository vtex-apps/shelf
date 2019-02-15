import './global.css'

import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { Component } from 'react'

import ProductList from './ProductList'
import { productListSchemaPropTypes } from './propTypes'
import ShelfItem from './ShelfItem'
import shelf from './shelf.css'

/**
 * Related Products Component. Queries and shows the related products
 */
export default class RelatedProducts extends Component {
  static propTypes = {
    /** Main product to have related products queried */
    slug: PropTypes.string,
    /** Graphql productQuery response. */
    productQuery: PropTypes.shape({
      /** Product to have related products queried */
      product: PropTypes.shape({
        /** Recommendations property */
        recommendations: PropTypes.shape({
          /** View recommendations (who saw this product, also saw...) */
          view: PropTypes.arrayOf(ShelfItem.propTypes.item),
          /** Buy recommendations (who bought this product, also bought...) */
          buy: PropTypes.arrayOf(ShelfItem.propTypes.item),
          /** Similar products */
          similars: PropTypes.arrayOf(ShelfItem.propTypes.item),
        }),
      }),
    }),
    /** ProductList schema configuration */
    productList: PropTypes.shape(productListSchemaPropTypes),
  }

  static defaultProps = {
    recommendation: 'editor.relatedProducts.similars',
    productList: {
      ...ProductList.defaultProps,
      titleText: 'Related Products',
    },
  }

  static getSchema = props => {
    const productListSchema = ProductList.getSchema(props)
    productListSchema.properties.titleText.default =
      RelatedProducts.defaultProps.productList.titleText

    return {
      title: 'editor.relatedProducts.title',
      description: 'editor.relatedProducts.description',
      type: 'object',
      properties: {
        recommendation: {
          title: 'editor.relatedProducts.recommendation',
          description: 'editor.relatedProducts.recommendation.description',
          type: 'string',
          default: RelatedProducts.defaultProps.recommendation,
          enum: [
            'editor.relatedProducts.similars',
            'editor.relatedProducts.view',
            'editor.relatedProducts.buy',
          ],
        },
        productList: productListSchema,
      },
    }
  }

  render() {
    const { productQuery, productList } = this.props
    const recommendation = this.props.recommendation.split('.').pop()
    const products = path(
      ['product', 'recommendations', recommendation],
      productQuery
    )
    const productListProps = {
      products,
      loading: productQuery.loading,
      ...productList,
    }

    return (
      <div className={shelf.relatedProducts}>
        <ProductList {...productListProps} />
      </div>
    )
  }
}
