import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import OrdenationTypes, { getOrdenationNames, getOrdenationValues } from './OrdenationTypes'
import { shelfSchemaPropTypes } from './propTypes'
import productsQuery from './queries/productsQuery.gql'
import Shelf from './Shelf'
import ShelfContent from './ShelfContent'

/**
 * Shelf (container) Component. Queries a list of products and shows them.
 */
class ShelfContainer extends Component {
  render() {
    const { data, shelf } = this.props
    const products = !data || data['error'] ? [] : data.products
    const shelfProps = {
      products,
      loading: data.loading,
      ...shelf,
    }
    return <Shelf {...shelfProps} />
  }
}

ShelfContainer.defaultProps = {
  shelf: Shelf.defaultProps,
}

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
      shelf: Shelf.getSchema(props),
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
  /** Shelf schema configuration */
  shelf: PropTypes.shape(shelfSchemaPropTypes),
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
