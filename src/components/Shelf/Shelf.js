import { editable } from 'vtex-editor';
import React from 'react';
import './Shelf.less';
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
