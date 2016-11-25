import Price from './Price'
import Img from 'vtex.render/Img'
import Link from 'vtex.render/Link'
import React, {Component, PropTypes} from 'react'

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
    const listPrice = lowestOffer ? lowestOffer.listPrice : 0

    return (
      <div className="tc">
        <Link
          className={this.props.textStyle || 'link db dim mh1 mh2-ns f6 f5-ns'}
          title={name}
          to={`/${this.props.slug}/p`}
        >
          <Img
            height={this.props.imgHeight || 380}
            src={imageUrl}
            alt={name}
            width={this.props.imgWidth || 380}
            className="br2 ba b--black-05"
          />
          <div className={this.props.nameStyle || 'tl lh-title mt1 black-60'}>
            {name}
          </div>
          {
            listPrice !== price ? (
              <div>
                <div className={this.props.listPriceStyle || 'tl mt1 black-40'}>
                  <span>De: </span>
                  <span className="black-40 strike"><Price value={listPrice} /></span>
                </div>
                <div className={this.props.priceStyle || 'tl b mt1 primary'}>
                  <span>Por: </span>
                  <Price value={price} />
                </div>
              </div>
            ) : (
              <div className={this.props.priceStyle || 'tl b mt1 primary'}>
                <Price value={price} />
              </div>
            )
          }
        </Link>
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
  listPriceStyle: PropTypes.string,
  name: PropTypes.string,
  nameStyle: PropTypes.string,
  priceStyle: PropTypes.string,
  skus: PropTypes.array,
  slug: PropTypes.string,
  textStyle: PropTypes.string,
}

export default ShelfProduct
