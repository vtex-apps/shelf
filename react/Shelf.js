import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { graphql } from 'react-apollo'
import { Loading } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { useCssHandles } from 'vtex.css-handles'
import { ProductListContext } from 'vtex.product-list-context'

import OrdenationTypes, {
  getOrdenationNames,
  getOrdenationValues,
} from './utils/OrdenationTypes'
import ProductList from './components/ProductList'
import {
  productListSchemaPropTypes,
  shelfContentPropTypes,
} from './utils/propTypes'
import productsQuery from './queries/productsQuery.gql'
import { normalizeBuyable } from './utils/normalize'

const CSS_HANDLES = ['container']

const { ProductListProvider } = ProductListContext

/**
 * Shelf Component. Queries a list of products and shows them.
 */
const Shelf = ({
  data,
  productList = ProductList.defaultProps,
  paginationDotsVisibility = 'visible',
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const { loading, error, products } = data || {}

  const filteredProducts = useMemo(() => {
    return products && products.map(normalizeBuyable).filter(Boolean)
  }, [products])

  const productListProps = useMemo(
    () => ({
      products: filteredProducts,
      loading: loading,
      isMobile,
      paginationDotsVisibility,
      ...productList,
    }),
    [filteredProducts, loading, isMobile, paginationDotsVisibility, productList]
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    return null
  }

  return (
    <div className={`${handles.container} pv4 pb9`}>
      <ProductListProvider>
        <ProductList {...productListProps} />
      </ProductListProvider>
    </div>
  )
}

Shelf.propTypes = {
  /** Graphql data response. */
  data: PropTypes.shape({
    products: shelfContentPropTypes.products,
  }),
  /** Category Id. */
  category: PropTypes.string,
  /** Collection Id. */
  collection: PropTypes.string,
  /** Ordenation Type. */
  orderBy: PropTypes.oneOf(getOrdenationValues()),
  /** Hide unavailable items */
  hideUnavailableItems: PropTypes.bool,
  /** Should display navigation dots below the Shelf */
  paginationDotsVisibility: PropTypes.oneOf([
    'visible',
    'hidden',
    'mobileOnly',
    'desktopOnly',
  ]),
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
}

const parseFilters = ({ id, value }) => `specificationFilter_${id}:${value}`

const toBoolean = x => (typeof x === 'boolean' ? x : x === 'true')

const options = {
  options: ({
    category,
    collection,
    hideUnavailableItems,
    orderBy = OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
    specificationFilters = [],
    maxItems = ProductList.defaultProps.maxItems,
    skusFilter,
  }) => ({
    ssr: true,
    variables: {
      ...(category && { category: category.toString() }),
      ...(collection && { collection: collection.toString() }),
      specificationFilters: specificationFilters.map(parseFilters),
      orderBy,
      from: 0,
      to: maxItems - 1,
      hideUnavailableItems: toBoolean(hideUnavailableItems),
      skusFilter,
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
        type: 'string',
        isLayout: false,
      },
      orderBy: {
        title: 'admin/editor.shelf.orderBy.title',
        type: 'string',
        enum: getOrdenationValues(),
        enumNames: getOrdenationNames(),
        default: OrdenationTypes.ORDER_BY_RELEVANCE.value,
        isLayout: false,
      },
      productList: ProductList.getSchema(props),
      hideUnavailableItems: {
        title: 'admin/editor.shelf.hideUnavailableItems',
        type: 'boolean',
        default: false,
        isLayout: false,
      },
      skusFilter: {
        title: 'admin/editor.shelf.skusFilter',
        description: 'admin/editor.shelf.skusFilter.description',
        type: 'string',
        default: 'ALL_AVAILABLE',
        enum: ['ALL_AVAILABLE', 'ALL', 'FIRST_AVAILABLE'],
        enumNames: [
          'admin/editor.shelf.skusFilter.all-available',
          'admin/editor.shelf.skusFilter.none',
          'admin/editor.shelf.skusFilter.first-available',
        ],
      },
    },
  }
}

export default EnhancedShelf
