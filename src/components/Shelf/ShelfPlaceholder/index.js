import React from 'react';
import './style.less';
import SVGIcon from 'utils/SVGIcon';
import arrowLeftIcon from 'assets/icons/arrow-left.svg';
import arrowRightIcon from 'assets/icons/arrow-right.svg';

class ShelfPlaceholder extends React.Component {
  render() {
    return (
      <div className="ShelfSlider row-fluid">
        <h2 className="ShelfSlider__title">{this.props.title}</h2>

        <div className="row-fluid clearfix">
          <button className="ShelfSlider__arrow col-xs-2">
            <SVGIcon className="ShelfSlider__arrow-icon" svg={arrowLeftIcon} width={26} height={88}
                     data-is-disabled={true}/>
          </button>

          <div className="ShelfSlider__products col-xs-8">
            Carregando
          </div>

          <button className="ShelfSlider__arrow col-xs-2">
            <SVGIcon className="ShelfSlider__arrow-icon" svg={arrowRightIcon} width={26} height={88}
                     data-is-disabled={true}/>
          </button>
        </div>
      </div>
    );
  }
}

export default ShelfPlaceholder;
