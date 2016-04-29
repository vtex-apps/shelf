import React from 'react';
import './ShelfProduct.less';
import { stores, history } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);
const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

class Product extends React.Component {
  componentWillMount() {
    this.setState({ imageSize: null });
  }

  componentDidMount() {
    this.setState({ imageSize: this.photoWrap.clientHeight });

    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate() {
    if (this.photoWrap.clientWidth < this.photoWrap.scrollWidth) {
      this.setState({ imageSize: this.photoWrap.clientWidth });
    }
  }

  componentWillUnmount() {
    this.clearResizeTimeout();
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.clearResizeTimeout();

    this.resizeTimeout = setTimeout(() => {
      this.setState({ imageSize: this.photoWrap.clientHeight });
    }, 200);
  }

  _handleDetails = (ev) => {
    ev.preventDefault();
    history.pushState(null, `/${this.props.slug}/p`);
  }

  clearResizeTimeout = () => {
    if (this.resizeTimeout) {
      clearInterval(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }

  render() {
    const { imageSize } = this.state;
    const defaultSku = this.props.skus[0];
    const name = this.props.name;
    const imageUrl = defaultSku.images.length > 0 ?
      defaultSku.images[0].src : 'http://placehold.it/200x235';
    const price = defaultSku.offers[0].price;

    return (
      <div className="ShelfProduct">
        <Link to={`/${this.props.slug}/p`}>
          <div
            className="ShelfProduct__photo-wrapper theme__background-color--white"
            ref={(photoWrap) => this.photoWrap = photoWrap}
          >
            {
              imageSize ?
                <Img
                  className="ShelfProduct__photo"
                  src={imageUrl}
                  width={imageSize}
                  height={imageSize}
                /> : null
            }
          </div>
        </Link>
        <div className="ShelfProduct__content">
          <Link
            to={`/${this.props.slug}/p`}
            className="ShelfProduct__title row"
            title={name}
          >
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
