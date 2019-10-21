import PropTypes from 'prop-types'
import React, { useMemo, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-apollo'
import { Loading } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { usePixel } from 'vtex.pixel-manager/PixelContext'
import { useCssHandles } from 'vtex.css-handles'
import { path } from 'ramda'
import { useInView } from 'react-intersection-observer'

import OrdenationTypes, {
  getOrdenationNames,
  getOrdenationValues,
} from './utils/OrdenationTypes'
import ProductList from './components/ProductList'
import { productListSchemaPropTypes } from './utils/propTypes'
import productsQuery from './queries/productsQuery.gql'
import productsNoSimulationQuery from './queries/productsNoSimulationQuery.gql'
import { shelfContentPropTypes } from './utils/propTypes'

import { parseToProductImpression, normalizeBuyable } from './utils/normalize'

const CSS_HANDLES = ['container']

const useProductsQueries = (variables, lazyPrice) => {
  const withSimulationDoneRef = useRef(false)
  const noSimulationDoneRef = useRef(false)
  const productsRef = useRef(undefined)
  const [finalProducts, setFinalProducts] = useState(undefined)
  const {
    data: { products: simulatedProducts } = {},
    loading: simulationLoading,
    error,
  } = useQuery(productsQuery, {
    variables,
    onCompleted: simulatedData => {
      withSimulationDoneRef.current = true
      if (!noSimulationDoneRef.current) {
        productsRef.current = path(['products'], simulatedData)
        setFinalProducts(productsRef.current)
        return
      }

      if (productsRef.current) {
        const products = productsRef.current
        const newProducts = simulatedData.products
        if (newProducts && products.length !== newProducts.length) {
          productsRef.current = newProducts
          setFinalProducts(productsRef.current)
          return
        }
        const areEqual = products.every(
          (p, i) => p.productId === newProducts[i].productId
        )
        if (!areEqual) {
          productsRef.current = newProducts
          setFinalProducts(productsRef.current)
          return
        }
        for (let i = 0; i < products.length; i++) {
          products[i] = { ...products[i] }

          products[i].priceRange = newProducts[i].priceRange
          products[i].items.forEach((item, itemIndex) => {
            if (item.itemId !== newProducts[i].items[itemIndex].itemId) {
              item = newProducts[i].items[itemIndex]
            } else {
              item.sellers.forEach((seller, sellerIndex) => {
                seller.commertialOffer =
                  newProducts[i].items[itemIndex].sellers[
                    sellerIndex
                  ].commertialOffer
              })
            }
          })
        }
        productsRef.current = products
        setFinalProducts([...productsRef.current])
      }
    },
  })

  const { loading: noSimulationLoading } = useQuery(productsNoSimulationQuery, {
    variables,
    skip: !lazyPrice,
    onCompleted: notSimulatedData => {
      noSimulationDoneRef.current = true
      if (!withSimulationDoneRef.current) {
        productsRef.current = path(['productsNoSimulations'], notSimulatedData)
        setFinalProducts(productsRef.current)
        return
      }
    },
  })

  return {
    loading: lazyPrice ? noSimulationLoading : simulationLoading,
    error,
    products: lazyPrice ? finalProducts : simulatedProducts,
  }
}

const pathToSkippedSimulation = [
  '0',
  'items',
  '0',
  'sellers',
  '0',
  'commertialOffer',
  'skippedSimulation',
]

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
    const skippedSimulation = path(pathToSkippedSimulation, products)
    if (!products || viewed.current || !inView || skippedSimulation) {
      return
    }
    const normalizedProducts = products.map(parseToProductImpression)
    const impressions = normalizedProducts.map((product, index) => ({
      product,
      position: index + 1,
    }))
    push({
      event: 'productImpression',
      list: 'Shelf',
      impressions,
    })
    viewed.current = true
  }, [viewed, push, products, inView])
}

const parseFilters = ({ id, value }) => `specificationFilter_${id}:${value}`

/**
 * Shelf Component. Queries a list of products and shows them.
 */

const Shelf = ({
  productList = ProductList.defaultProps,
  paginationDotsVisibility = 'visible',
  category,
  collection,
  hideUnavailableItems,
  orderBy = OrdenationTypes.ORDER_BY_TOP_SALE_DESC.value,
  specificationFilters = [],
  maxItems = ProductList.defaultProps.maxItems,
  skusFilter,
  lazyPrice,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const variables = {
    ...(category != null ? {
      category: category.toString(),
    } : {}),
    ...(collection != null ? {
      collection: collection.toString(),
    } : {}),
    specificationFilters: specificationFilters.map(parseFilters),
    orderBy,
    from: 0,
    to: maxItems - 1,
    hideUnavailableItems,
    skusFilter,
  }
  const { loading, error, products } = useProductsQueries(variables, lazyPrice)
  const { isMobile } = useDevice()

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
    [filteredProducts, loading, isMobile, productList]
  )
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
  paginationDotsVisibility: PropTypes.oneOf([
    'visible',
    'hidden',
    'mobileOnly',
    'desktopOnly',
  ]),
  /** ProductList schema configuration */
  productList: PropTypes.shape(productListSchemaPropTypes),
}

Shelf.getSchema = props => {
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

export default Shelf
