import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import { withRuntimeContext, Loading } from 'vtex.render-runtime'

import OrdenationTypes, {
  getOrdenationNames,
  getOrdenationValues,
} from './utils/OrdenationTypes'
import ProductList from './components/ProductList'
import { productListSchemaPropTypes } from './utils/propTypes'
import productsQuery from './queries/productsQuery.gql'
import ShelfContent from './components/ShelfContent'

import shelf from './components/shelf.css'

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
      <div className={`${shelf.container} pv4 pb9`}>
        <ProductList {...productListProps} />
      </div>
    )
  }
}

Shelf.defaultProps = {
  productList: ProductList.defaultProps,
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
    ssr: false,
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

const EnhancedShelf = compose(
  graphql(productsQuery, options),
  branch(
    props => props.data && props.data.loading,
    renderComponent(Loading)
  )
)(withRuntimeContext(Shelf))

EnhancedShelf.getSchema = props => {
  return {
    title: 'admin/editor.shelf.title',
    description: 'admin/editor.shelf.description',
    type: 'object',
    properties: {
      category: {
        title: 'admin/editor.shelf.category.title',
        type: 'number',
        isLayout: false,
      },
      collection: {
        title: 'admin/editor.shelf.collection.title',
        type: 'number',
        isLayout: false,
      },
      orderBy: {
        title: 'admin/editor.shelf.orderBy.title',
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

export default EnhancedShelf
