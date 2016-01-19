import { stores, connectToStores } from 'sdk';
import React from 'react';
import Immutable from 'immutable';
import Slider from 'react-slick';
import 'utils/slick/slick.less';
import 'utils/slick/slick-theme.less';
import ShelfProduct from '../ShelfProduct';
import './style.less';

@connectToStores()
class ShelfSlider extends React.Component {
  static getStores() {
    return [stores.SearchStore];
  }

  static getPropsFromStores(props) {
    const currentURL = (window.location.pathname + window.location.search);
    let query = Immutable.Map({
      category: props.settings.get('category'),
      collection: props.settings.get('collection'),
      pageSize: props.settings.get('quantity')
    });

    let searchStore = stores.SearchStore.getState();
    let productsIds = searchStore.getIn([currentURL, props.id, 'results']);
    productsIds = productsIds ? productsIds : searchStore.getIn([query, 'results']);
    let products = productsIds ? stores.ProductStore.getProducts(productsIds) : null;

    return {
      products: products
    };
  }

  getSearch(props) {
    return Immutable.Map({
      category: props.settings.get('category'),
      collection: props.settings.get('collection'),
      pageSize: props.settings.get('quantity')
    });
  }

  render() {
    let settingsQuantity = this.props.settings.get('quantity');
    let productsQuantity = this.props.products ? this.props.products.length : 0;
    let maxQuantity = productsQuantity > settingsQuantity ?
      settingsQuantity : productsQuantity;
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
