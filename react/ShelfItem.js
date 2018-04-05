import React, { Component } from 'react'

class ShelfItem extends Component {
  render() {
    const { name, imagePath, price, imageWidth } = this.props;
    return (
      <div className="ma4 shadow-2 br3 items-center flex flex-column grow pointer">
        <h4 className="w-90 tc truncate mid-gray" title={name}>
          {name}
        </h4>
        <img width={imageWidth} src={imagePath} />
        <h5 className="near-black">R$ {price.toFixed(2)}</h5>
      </div>
    )
  }
}

ShelfItem.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  price: PropTypes.number,
  imageWidth: PropTypes.number
}

export default ShelfItem