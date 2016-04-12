import React from 'react';
import './ShelfPlaceholder.less';
import SVGIcon from 'utils/SVGIcon';
import arrowLeftIcon from 'assets/icons/arrowLeft.svg';
import arrowLeftImg from 'assets/icons/arrowLeft.png';
import arrowRightIcon from 'assets/icons/arrowRight.svg';
import arrowRightImg from 'assets/icons/arrowRight.png';

class ShelfPlaceholder extends React.Component {
  render() {
    return (
      <div className="ShelfSlider row-fluid">
        <h2 className="ShelfSlider__title">{this.props.title}</h2>

        <div className="row-fluid clearfix">
          <button className="ShelfSlider__arrow col-xs-2">
            <SVGIcon className="ShelfSlider__arrow-icon" svg={arrowLeftIcon} fallback={arrowLeftImg} height={88}
                     data-is-disabled={true}/>
          </button>

          <div className="ShelfSlider__products col-xs-8">
            Carregando
          </div>

          <button className="ShelfSlider__arrow col-xs-2">
            <SVGIcon className="ShelfSlider__arrow-icon" svg={arrowRightIcon} fallback={arrowRightImg} height={88}
                     data-is-disabled={true}/>
          </button>
        </div>
      </div>
    );
  }
}

export default ShelfPlaceholder;
