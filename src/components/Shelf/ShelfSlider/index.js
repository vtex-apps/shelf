import { stores, connectToStores } from 'sdk';
import React from 'react';
import Immutable from 'immutable';
import ShelfProduct from '../ShelfProduct';
import './style.less';
import SVGIcon from 'utils/SVGIcon';
import arrowLeftIcon from 'assets/icons/arrow-left.svg';
import arrowRightIcon from 'assets/icons/arrow-right.svg';

@connectToStores()
class ShelfSlider extends React.Component {
  state = {
    currentProductVisible: 0
  }

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

  moveLeft() {
    this.setState({
      currentProductVisible: this.state.currentProductVisible - 1
    });
  }

  moveRight() {
    this.setState({
      currentProductVisible: this.state.currentProductVisible + 1
    });
  }

  getSearch(props) {
    return Immutable.Map({
      category: props.settings.get('category'),
      collection: props.settings.get('collection'),
      pageSize: props.settings.get('quantity')
    });
  }

  render() {
    let products = this.props.products;
    let title = this.props.settings.get('title');

    let settingsQuantity = this.props.settings.get('quantity');
    let productsQuantity = products ? products.length : 0;

    let maxQuantity = productsQuantity > settingsQuantity
          ? settingsQuantity
          : productsQuantity;

    const canMoveLeft = (this.state.currentProductVisible !== 0);
    const canMoveRight = (this.state.currentProductVisible !== maxQuantity - 1);

    return (
      <div className="ShelfSlider">
        <h2 className="ShelfSlider__title">{title}</h2>

        <div className="row-fluid clearfix">
          <button className="ShelfSlider__arrow col-xs-2">
            <SVGIcon className="ShelfSlider__arrow-icon" svg={arrowLeftIcon} width={26} height={88}
                     data-is-disabled={!canMoveLeft}
                     onTouchTap={canMoveLeft ? this.moveLeft.bind(this) : null}/>
          </button>

          <div className="ShelfSlider__product col-xs-8">
          {products ? products.map((product, index) =>
            <ShelfProduct {...product}
                    isVisible={(index === this.state.currentProductVisible)}
                    key={product.slug}/>
          ) : <div>Carregando</div>}
          </div>

          <button className="ShelfSlider__arrow col-xs-2">
            <SVGIcon className="ShelfSlider__arrow-icon" svg={arrowRightIcon} width={26} height={88}
                     data-is-disabled={!canMoveRight}
                     onTouchTap={canMoveRight ? this.moveRight.bind(this) : null}/>
          </button>
        </div>
      </div>
    );
  }
}

export default ShelfSlider;
