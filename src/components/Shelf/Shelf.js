import { editable } from 'vtex-editor';
import React from 'react';
import Immutable from 'immutable';
import ShelfPlaceholder from './ShelfPlaceholder';
import ShelfSlider from './ShelfSlider';

@editable({
  name: 'Shelf@vtex.shelf',
  title: 'Shelf'
})
class Shelf extends React.Component {
  render() {
    return !this.props.settings
        ? <ShelfPlaceholder title="Destaques"/>
        : <ShelfSlider {...this.props}/>
  }
}

export default Shelf;
