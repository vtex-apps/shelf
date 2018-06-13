import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import OrdenationTypes, { getOrdenationNames, getOrdenationValues } from './OrdenationTypes'
import ProductList from './ProductList'
import { productListSchemaPropTypes } from './propTypes'
import productsQuery from './queries/productsQuery.gql'
import ShelfContent from './ShelfContent'

/**
 * Shelf Component. Queries a list of products and shows them.
 */
class Shelf extends Component {
  render() {
    const { data, productList } = this.props
    const products = !data || data['error'] ? [] : data.products
    const productListProps = {
      products,
      loading: data.loading,
      ...productList,
    }
    return <ProductList {...productListProps} />
  }
}

Shelf.defaultProps = {
  productList: ProductList.defaultProps,
}

Shelf.getSchema = props => {
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
      productList: ProductList.getSchema(props),
    },
  }
}

Shelf.propTypes = {
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
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
}

const options = {
  options: ({
    category,
    collection,
    orderBy,
    maxItems = ProductList.defaultProps.maxItems,
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

export default graphql(productsQuery, options)(Shelf)
