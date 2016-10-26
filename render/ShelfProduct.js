import React, {Component, PropTypes} from 'react'
import Img from 'vtex.render/Img'
import Link from 'vtex.render/Link'
import Price from './Price'
import classNames from 'classnames/bind'
import style from './tachyons.css'

const cx = classNames.bind(style)

class ShelfProduct extends Component {
  handleDetails = (ev) => {
    ev.preventDefault()
    history.pushState(null, `/${this.props.slug}/p`)
  }

  render () {
    const defaultSku = this.props.skus[0]
    const name = this.props.name
    const imageUrl = defaultSku.images.length > 0
      ? defaultSku.images[0].src : 'http://placehold.it/200x235'
    const price = defaultSku.offers[0].price

    return (
      <div>
        <Link to={`/${this.props.slug}/p`}>
          <div className={cx('tc')}>
            <Img
              backgroundColor={this.props.imgBackgroundColor}
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
