import PropTypes from 'prop-types'
import { path, identity } from 'ramda'
import React, { Component, useMemo, useEffect } from 'react'
import { graphql } from 'react-apollo'
import { withRuntimeContext, Loading, useRuntime } from 'vtex.render-runtime'
import { usePixel } from 'vtex.pixel-manager/PixelContext'

import OrdenationTypes, {
  getOrdenationNames,
  getOrdenationValues,
} from './utils/OrdenationTypes'
import ProductList from './components/ProductList'
import { productListSchemaPropTypes } from './utils/propTypes'
import productsQuery from './queries/productsQuery.gql'
import ShelfContent from './components/ShelfContent'

import shelf from './components/shelf.css'
import { normalizeProduct, normalizeBuyable } from './utils/normalize'

const useProductImpression = (products) => {
  const { push } = usePixel()

  useEffect(() => {
    if (!products) {
      return
    }

    products.forEach((product, index) => {
      const normalizedProduct = normalizeProduct(product)

      push({
        event: 'productImpression',
        list: 'Shelf',
        position: index + 1,
        product: normalizedProduct,
      })
    })
  }, [push, products])
}

/**
 * Shelf Component. Queries a list of products and shows them.
 */
const Shelf = ({ data, productList = ProductList.defaultProps }) => {
  const { hints: { mobile }} = useRuntime()
  const { loading, error, products } = data || {}


  const filteredProducts =
    products && products.map(normalizeBuyable).filter(identity)

  const productListProps = useMemo(() => ({
    products: filteredProducts,
    loading: loading,
    isMobile: mobile,
    ...productList,
  }), [filteredProducts, loading, mobile, productList])

  useProductImpression(filteredProducts)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return null
  }

  return (
    <div className={`${shelf.container} pv4 pb9`}>
      <ProductList {...productListProps} />
    </div>
  )
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

const parseFilters = ({id, value}) => `specificationFilter_${id}:${value}`

const options = {
  options: ({
    category,
    collection,
    orderBy = OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
    specificationFilters = [],
    maxItems = ProductList.defaultProps.maxItems,
  }) => ({
    ssr: true,
    variables: {
      category,
      ...(collection != null ? {
        collection,
      } : {}),
      specificationFilters: specificationFilters.map(parseFilters),
      orderBy,
      from: 0,
      to: maxItems - 1,
    },
  }),
}

const EnhancedShelf = graphql(productsQuery, options)(Shelf)

EnhancedShelf.getSchema = props => {
  return {
    title: 'admin/editor.shelf.title',
    description: 'admin/editor.shelf.description',
    type: 'object',
    properties: {
      category: {
        title: 'admin/editor.shelf.category.title',
        description: 'admin/editor.shelf.category.description',
        type: 'string',
        isLayout: false,
      },
      specificationFilters: {
        title: 'admin/editor.shelf.specificationFilters.title',
        type: 'array',
        items: {
          title: 'admin/editor.shelf.specificationFilters.item.title',
          type: 'object',
          properties: {
            id: {
              type: 'string',
              title: 'admin/editor.shelf.specificationFilters.item.id.title',
            },
            value: {
              type: 'string',
              title: 'admin/editor.shelf.specificationFilters.item.value.title',
            },
          },
        },
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
