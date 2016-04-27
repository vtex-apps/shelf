import React from 'react';
import './ShelfProduct.less';
import { stores, history } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);
const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

class Product extends React.Component {
  _handleDetails = (ev) => {
    ev.preventDefault();
    history.pushState(null, `/${this.props.slug}/p`);
  }

  render() {
    let defaultSku = this.props.skus[0];
    let name = this.props.name;
    let imageUrl = defaultSku.images.length > 0 ?
      defaultSku.images[0].src : '//placehold.it/200x235';
    let price = defaultSku.offers[0].price;

    return (
      <div className="ShelfProduct">
        <Link to={`/${this.props.slug}/p`}>
          <div className="ShelfProduct__photo-wrapper theme__background-color--white">
            <Img className="ShelfProduct__photo" src={imageUrl} />
          </div>
        </Link>
        <div className="ShelfProduct__content">
          <Link to={`/${this.props.slug}/p`} className="ShelfProduct__title row">
            { name }
          </Link>
          <span className="ShelfProduct__price">
            <Price value={price}/>
          </span>
          <button
            className="ShelfProduct__btn"
            onClick={this._handleDetails}
          >
            Ver detalhes
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
