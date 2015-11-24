import { storefront } from 'sdk';
import React from 'react';
import Immutable from 'immutable';
import './Shelf.less';
import ShelfPlaceholder from './ShelfPlaceholder';
import ShelfSlider from './ShelfSlider';

@storefront({
  name: 'Shelf@vtex.shelf',
  title: 'Shelf',
  editable: true
})
class Shelf extends React.Component {
  static defaultProps = {
    settings: Immutable.fromJS({
      title: 'Destaques',
      category: 'fera-fashion',
      quantity: 3
    })
  }

  render() {
    if (!this.props.settings) {
      return (
        <ShelfPlaceholder title="Destaques"/>
      )
    }
    return <ShelfSlider {...this.props}/>;
  }
}

export default Shelf;
