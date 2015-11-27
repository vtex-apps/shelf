import { editable } from 'vtex-editor';
import React from 'react';
import Immutable from 'immutable';
import './Shelf.less';
import ShelfPlaceholder from './ShelfPlaceholder';
import ShelfSlider from './ShelfSlider';

@editable({
  name: 'Shelf@vtex.shelf',
  title: 'Shelf'
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
      );
    }
    return <ShelfSlider {...this.props}/>;
  }
}

export default Shelf;
