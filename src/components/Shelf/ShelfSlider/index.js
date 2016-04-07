import { stores, actions, connectToStores } from 'sdk';
import React from 'react';
import Immutable from 'immutable';
import Slider from 'react-slick';
import 'utils/slick/slick.less';
import 'utils/slick/slick-theme.less';
import ShelfProduct from '../ShelfProduct';
import './style.less';

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

  componentWillReceiveProps = (nextProps) => {
    const query = getSearchParams(nextProps.settings);
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
    // se nao tem os produtos com as settings que eu tenho - tenho que ir buscar
    let settingsQuantity = this.props.settings.get('quantity');
    let productsQuantity = this.props.products ? this.props.products.length : 0;

    let maxQuantity = productsQuantity > settingsQuantity ? settingsQuantity : productsQuantity;
    let products = this.props.products.slice(0, maxQuantity);
    let title = this.props.settings.get('title') || '';

    let settings = {
      dots: false,
      arrows: true,
      autoplay: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    };

    return (
      <div className="ShelfSlider clearfix">
        <h2 className="ShelfSlider__title row-fluid">{ title }</h2>
        <div className="row-fluid">
          <Slider {...settings}>
            {
              products ?
                products.map((product) => {
                  return (
                    <div key={product.slug}>
                      <ShelfProduct {...product} />
                    </div>
                  );
                }) : <div>Carregando</div>
            }
          </Slider>
        </div>
      </div>
    );
  }
}

export default ShelfSlider;
