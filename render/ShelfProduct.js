import Price from './Price'
import Img from 'vtex.render/Img'
import style from './tachyons.css'
import Link from 'vtex.render/Link'
import classNames from 'classnames/bind'
import React, {Component, PropTypes} from 'react'

const cx = classNames.bind(style)

class ShelfProduct extends Component {
  handleDetails = (ev) => {
    ev.preventDefault()
    history.pushState(null, `/${this.props.slug}/p`)
  }

  render () {
    let defaultSkuIndex = 0
    let lowestOffer
    const skus = this.props.skus || []
    skus.map((sku, skuIndex) => {
      let isLowest
      const offers = sku.offers || []
      offers.map(offer => {
        if (offer.price === 0) return
        else if (!lowestOffer || (lowestOffer && offer.price < lowestOffer.price)) {
          lowestOffer = offer
          defaultSkuIndex = skuIndex
          isLowest = true
        }
      })
      if (isLowest) defaultSkuIndex = skuIndex
    })
    const sku = skus[defaultSkuIndex]
    const name = this.props.name
    const imageUrl = sku.images.length > 0
      ? sku.images[0].src : 'http://placehold.it/200x235'
    const price = lowestOffer ? lowestOffer.price : 0

    return (
      <div>
        <Link to={`/${this.props.slug}/p`}>
          <div className={cx('tc')}>
            <Img
              height={this.props.imgHeight}
              src={imageUrl}
              width={this.props.imgWidth}
            />
          </div>
        </Link>
        <div>
          <Link
            className={this.props.textStyle || cx('no-underline', 'db', 'tc', 'black')}
            title={name}
            to={`/${this.props.slug}/p`}
          >
            {name}
          </Link>
          <span className={this.props.priceStyle || cx('no-underline', 'db', 'tc', 'black')}>
            <Price value={price} />
          </span>
          <Link
            className={cx('db', 'tc')}
            title={name}
            to={`/${this.props.slug}/p`}
          >
            <button className={this.props.buttonStyle || cx('f6', 'link', 'dim', 'br2', 'ba', 'ph3', 'pv2', 'mb2', 'dib', 'near-black')}>
              {this.props.buttonText || 'Ver Detalhes'}
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

ShelfProduct.propTypes = {
  buttonStyle: PropTypes.string,
  buttonText: PropTypes.string,
  imgBackgroundColor: PropTypes.string,
  imgHeight: PropTypes.number,
  imgWidth: PropTypes.number,
  name: PropTypes.string,
  priceStyle: PropTypes.string,
  skus: PropTypes.array,
  slug: PropTypes.string,
  textStyle: PropTypes.string,
}

export default ShelfProduct
