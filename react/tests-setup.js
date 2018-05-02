import ProductSummaryMock from './__mocks__/ProductSummary'

/* eslint-disable */
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
  }
}

global.__RUNTIME__ = {
  extensions: {
    'store/__product-summary': {
      component: 'product_summary',
    },
  },
}
global.__RENDER_7_COMPONENTS__ = {
  'product_summary': ProductSummaryMock,
}