import React from 'react';
import './ShelfSlider.less';
import { stores, actions, connectToStores } from 'sdk';
import Immutable from 'immutable';
import Slider from 'react-slick';
import ShelfProduct from '../ShelfProduct/ShelfProduct';
import 'utils/slick/slick.less';
import 'utils/slick/slick-theme.less';

const getSearchParams = (settings) => {
  return Immutable.Map({
    category: settings.get('category'),
    collection: settings.get('collection'),
    pageSize: settings.get('quantity')
  });
}

@connectToStores()
class ShelfSlider extends React.Component {
  static getStores() {
    return [stores.SearchStore];
  }

  static getPropsFromStores(props) {
    const currentURL = (window.location.pathname + window.location.search);
    const query = getSearchParams(props.settings);
    const searchStore = stores.SearchStore.getState();
    const results = searchStore.getIn([query, 'results']);
    let productsIds = searchStore.getIn([currentURL, props.id, 'results']);

    productsIds = results ? results : productsIds;

    const products = productsIds ? stores.ProductStore.getProducts(productsIds) : [];
    return {
      products: products
    };
  }

  shouldComponentUpdate() {
    const loading = stores.ContextStore.getState().get('loading');
    return !loading;
  }

  componentDidUpdate() {
    const query = getSearchParams(this.props.settings);
    const searchStore = stores.SearchStore.getState();
    const loading = searchStore.getIn([query, 'loading']);

    if (!loading) {
      const results = searchStore.getIn([query, 'results']);
      if (!results) {
        actions.SearchActions.requestSearch(query);
      }
    }
  }

  render() {
    const { products } = this.props;
    const desktopQty = this.props.settings.get('desktopQty');
    const tabletQty = this.props.settings.get('tabletQty');
    const title = this.props.settings.get('title') || '';
    const desktopSlidesQty = desktopQty ? desktopQty : 4;
    const tabletSlidesQty = tabletQty ? tabletQty : 2;

    const slickSettings = {
      dots: false,
      arrows: true,
      autoplay: false,
      infinite: true,
      draggable: false,
      slidesToShow: desktopSlidesQty,
      slidesToScroll: desktopSlidesQty,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            infinite: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            arrows: false,
            draggable: true,
            slidesToShow: tabletSlidesQty,
            slidesToScroll: tabletSlidesQty
          }
        }
      ]
    };

    return (
      <div className="ShelfSlider clearfix">
        <h2 className="ShelfSlider__title row-fluid">
          { title }
        </h2>
        <div className="row-fluid">
          <Slider {...slickSettings}>
            {
              products ?
                products.map(product => {
                  return (
                    <div key={product.slug}>
                      <ShelfProduct {...product} />
                    </div>
                  );
                }) :
                <div>Carregando</div>
            }
          </Slider>
        </div>
      </div>
    );
  }
}

export default ShelfSlider;
