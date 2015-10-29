import React from 'react';
import './Shelf.less';
import SVGIcon from 'utils/SVGIcon';
import arrowLeftIcon from 'assets/icons/arrow-left.svg';
import arrowRightIcon from 'assets/icons/arrow-right.svg';

class ShelfPlaceholder extends React.Component {
  render() {
    return (
      <div className="v-shelf row-fluid">
        <h2 className="v-shelf__title">{this.props.title}</h2>

        <div className="row-fluid clearfix">
          <button className="v-arrow col-xs-2 v-clean-btn v-no-outlines">
            <SVGIcon className="v-arrow-icon" svg={arrowLeftIcon} width={26} height={88}
                     data-is-disabled={true}/>
          </button>

          <div className="v-shelf__products col-xs-8">
            Carregando
          </div>

          <button className="v-arrow col-xs-2 v-clean-btn v-no-outlines">
            <SVGIcon className="v-arrow-icon" svg={arrowRightIcon} width={26} height={88}
                     data-is-disabled={true}/>
          </button>
        </div>
      </div>
    );
  }
}

export default ShelfPlaceholder;
