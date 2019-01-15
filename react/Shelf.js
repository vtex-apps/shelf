
import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withRuntimeContext } from 'vtex.render-runtime'

import Container from 'vtex.store-components/Container'

import OrdenationTypes, { getOrdenationNames, getOrdenationValues } from './OrdenationTypes'
import ProductList from './ProductList'
import { productListSchemaPropTypes } from './propTypes'
import productsQuery from './queries/productsQuery.gql'
import ShelfContent from './ShelfContent'

import shelf from './shelf.css'
import './global.css'

/**
 * Shelf Component. Queries a list of products and shows them.
 */
class Shelf extends Component {

  shouldComponentUpdate(nextProps) {
    return !Boolean(this.props.data.error && nextProps.data.error)
  }

  render() {
    const { data, productList, runtime } = this.props
    const products = path(['products'], data)
    const productListProps = {
      products,
      loading: data.loading,
      isMobile: runtime.hints.mobile,
      ...productList,
    }

    if (data.error || data.loading) {
      return null
    }
    return (
      <div className={`${shelf.container} vtex-shelf pv4 pb9`}>
        <ProductList {...productListProps} />
      </div>
    )
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
        isLayout: false,
      },
      collection: {
        title: 'editor.shelf.collection.title',
        type: 'number',
        isLayout: false,
      },
      orderBy: {
        title: 'editor.shelf.orderBy.title',
        type: 'string',
        enum: getOrdenationValues(),
        enumNames: getOrdenationNames(),
        default: OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
        isLayout: false,
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
    orderBy = OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
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

export default graphql(productsQuery, options)(withRuntimeContext(Shelf))
