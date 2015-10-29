import { stores, actions, utils } from 'sdk';
import React from 'react';
import Immutable from 'immutable';
import ShelfProduct from './ShelfProduct';
import './Shelf.less';
import SVGIcon from 'utils/SVGIcon';
import arrowLeftIcon from 'assets/icons/arrow-left.svg';
import arrowRightIcon from 'assets/icons/arrow-right.svg';

@utils.connectToStores()
class ShelfSlider extends React.Component {
  state = {
    currentProductVisible: 0
  }

  static getStores() {
    return [stores.SearchStore];
  }

  static getPropsFromStores(props) {
    let query = Immutable.Map({
      category: props.settings.get('category'),
      pageSize: props.settings.get('quantity')
    });

    let searchStore = stores.SearchStore.getState();
    let productsIds = searchStore.getIn([props.id, 'results'])
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
      pageSize: props.settings.get('quantity')
    });
  }

  requestSearch = (props) => {
    if (!props.settings) {
      return;
    }

    if (!props.products) {
      let search = this.getSearch(props);
      let alreadyRequested = stores.SearchStore.getState().getIn([search, 'loading']);
      if (!alreadyRequested) {
        actions.SearchActions.requestSearch(search);
      }
    }
  }

  componentWillMount() {
    this.requestSearch(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.requestSearch(nextProps);
  }

  render() {
    let products = this.props.products;
    let title = this.props.settings.get('title');

    let maxQuantity = Math.min((products ? (products.length - 1) : 0), this.props.settings.get('quantity'));
    const canMoveLeft = (this.state.currentProductVisible !== 0);
    const canMoveRight = (this.state.currentProductVisible !== maxQuantity);

    return (
      <div className="v-shelf row-fluid">
        <h2 className="v-shelf__title">{title}</h2>

        <div className="row-fluid clearfix">
          <button className="v-arrow col-xs-2 v-clean-btn v-no-outlines">
            <SVGIcon className="v-arrow-icon" svg={arrowLeftIcon} width={26} height={88}
                     data-is-disabled={!canMoveLeft}
                     onTouchTap={canMoveLeft ? this.moveLeft.bind(this) : null}/>
          </button>

          <div className="v-shelf__products col-xs-8">
          {products ? products.map((product, index) =>
            <ShelfProduct {...product}
                    isVisible={(index === this.state.currentProductVisible)}
                    key={product.slug}/>
          ) : <div>Carregando</div>}
          </div>

          <button className="v-arrow col-xs-2 v-clean-btn v-no-outlines">
            <SVGIcon className="v-arrow-icon" svg={arrowRightIcon} width={26} height={88}
                     data-is-disabled={!canMoveRight}
                     onTouchTap={canMoveRight ? this.moveRight.bind(this) : null}/>
          </button>
        </div>
      </div>
    );
  }
}

export default ShelfSlider;
