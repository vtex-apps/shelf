import React, { Component } from 'react'

export default class ShelfItem extends Component {
  render() {
    const { name, image, price, imgWidth } = this.props;
    return (
      <div className="ma4 shadow-2 br3 items-center flex flex-column">
        <h4 className="w-90 tc truncate" title={name}>
          {name}
        </h4>
        <img width={imgWidth} src={image} />
        <h5>R$ {price.toFixed(2)}</h5>
      </div>
    )
  }
}