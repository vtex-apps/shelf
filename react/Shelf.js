import PropTypes from 'prop-types'
import React, { useMemo, useEffect, useRef } from 'react'
import { graphql } from 'react-apollo'
import { Loading } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { useCssHandles } from 'vtex.css-handles'
import { useInView } from 'react-intersection-observer'

import OrdenationTypes, {
  getOrdenationNames,
  getOrdenationValues,
} from './utils/OrdenationTypes'
import ProductList from './components/ProductList'
import { productListSchemaPropTypes } from './utils/propTypes'
import productsQuery from './queries/productsQuery.gql'
import { shelfContentPropTypes } from './utils/propTypes'

import { parseToProductImpression, normalizeBuyable } from './utils/normalize'

const CSS_HANDLES = ['container']

const useProductImpression = (products, inView) => {
  const viewed = useRef(false)
  const { push } = usePixel()

  // This hook checks if the products changes, we need to send a new event
  useEffect(() => {
    if (products) {
      viewed.current = false
    }
  }, [products])

  useEffect(() => {
    if (!products || viewed.current || !inView) {
      return
    }
    const normalizedProducts = products.map(parseToProductImpression)
    const impressions = normalizedProducts.map((product, index) => ({ product, position: index + 1 }))
    push({
      event: 'productImpression',
      list: 'Shelf',
      impressions,
    })
    viewed.current = true
  }, [viewed, push, products, inView])
}

/**
 * Shelf Component. Queries a list of products and shows them.
 */
const Shelf = ({ data, productList = ProductList.defaultProps, paginationDotsVisibility = 'visible' }) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile }  = useDevice()
  const { loading, error, products } = data || {}

  const filteredProducts = useMemo(() => {
    return products && products.map(normalizeBuyable).filter(Boolean)
  }, [products])

  const productListProps = useMemo(() => ({
    products: filteredProducts,
    loading: loading,
    isMobile,
    paginationDotsVisibility,
    ...productList,
  }), [filteredProducts, loading, isMobile, productList])
  const [ref, inView] = useInView({
    // Triggers the event when the element is 75% visible
    threshold: 0.75,
  })
  useProductImpression(filteredProducts, inView)

  if (loading) {
    return <Loading />
  }

  if (error) {
    return null
  }

  return (
    <div ref={ref} className={`${handles.container} pv4 pb9`}>
      <ProductList {...productListProps} />
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
  paginationDotsVisibility: PropTypes.oneOf(['visible', 'hidden', 'mobileOnly', 'desktopOnly']),
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
}

const parseFilters = ({id, value}) => `specificationFilter_${id}:${value}`

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
      category,
      ...(collection != null ? {
        collection,
      } : {}),
      specificationFilters: specificationFilters.map(parseFilters),
      orderBy,
      from: 0,
      to: maxItems - 1,
      hideUnavailableItems,
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
        type: 'number',
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
        description:
          'admin/editor.shelf.skusFilter.description',
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
