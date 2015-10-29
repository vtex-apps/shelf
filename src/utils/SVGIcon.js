import React from 'react';
import { keys } from 'lodash-compat/object';
import { includes } from 'lodash-compat/collection';
import './SVGIcon.less';

const cleanups = {
  // some useless stuff for us
  // that svgo doesn't remove
  title: /<title>.*<\/title>/gi,
  desc: /<desc>.*<\/desc>/gi,
  comment: /<!--.*-->/gi,
  defs: /<defs>.*<\/defs>/gi,
  style: /<style>.*<\/style>/gi,

  // remove hardcoded dimensions
  width: / +width="\d+(\.\d+)?(px)?"/gi,
  height: / +height="\d+(\.\d+)?(px)?"/gi,

  // remove fill
  fill: / +fill=\"(none|#[0-9a-fA-F]+)\"/gi,

  // Sketch.app shit
  sketchMSShapeGroup: / +sketch:type=\"MSShapeGroup\"/gi,
  sketchMSPage: / +sketch:type=\"MSPage\"/gi,
  sketchMSLayerGroup: / +sketch:type=\"MSLayerGroup\"/gi
};

function browserSupportsInlineSVG() {
  if (!document) {
    return false;
  }
  var div = document.createElement('div');
  div.innerHTML = '<svg/>';
  return (typeof SVGRect !== 'undefined' && div.firstChild && div.firstChild.namespaceURI) === 'http://www.w3.org/2000/svg';
}

let browserSupport = browserSupportsInlineSVG();

class SVGIcon extends React.Component {
  state = {
    browserSupport: browserSupport
  }

  static defaultProps = {
    component: 'div',
    classSuffix: '-svg',
    cleanup: true,
    cleanupExceptions: []
  }

  static PropTypes = {
    component: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    svg: React.PropTypes.string.isRequired,
    fill: React.PropTypes.string,
    cleanup: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array
    ]),
    width: React.PropTypes.string,
    height: React.PropTypes.string
  }

  static cleanupSvg(svg, cleanup = []) {
    return keys(cleanups)
      .filter(key => includes(cleanup, key))
      .reduce((acc, key) => {
        return acc.replace(cleanups[key], '');
      }, svg)
      .trim();
  }

  _renderSVG = () => {
    const { className, component, svg, fill } = this.props;

    let cleanup = this.props.cleanup;
    if (
      // simple way to enable entire cleanup
      cleanup === true ||
      // passing cleanupExceptions enable cleanup as well
      (
        this.props.cleanup.length === 0 &&
        this.props.cleanupExceptions.length > 0
      )
    ) {
      cleanup = keys(cleanups);
    }
    cleanup = cleanup.filter(
      key => {
        return !includes(this.props.cleanupExceptions, key);
      }
    );

    let { width, height } = this.props;

    if (width && height === undefined) {
      height = width;
    }

    const props = {...this.props, svg: null, fill: null, width: null, height: null};

    let classes = 'SVGICon';

    if (cleanup.length) {
      classes += ' SVGIcon--cleaned';
    }
    if (className) {
      classes += ' ' + className;
    }

    const svgClasses = classes
      .split(' ')
      .join(this.props.classSuffix + ' ') + this.props.classSuffix;

    return (
      React.createElement(
        component,
        {
          ...props, // take most props
          className: classes,
          dangerouslySetInnerHTML: {
            __html: SVGIcon.cleanupSvg(svg, cleanup).replace(
              /<svg/,
              `<svg class="${ svgClasses }"` +
              (
                fill
                ? ` fill="${ fill }"`
                : ``
              ) +
              (
                width || height
                ? (
                  ` style="` +
                    (width ? `width: ${width}px;` : ``) +
                    (height ? `height: ${height}px;` : ``) +
                  `"`
                )
                : ''
              )
            )
          }
        }
      )
    );
  }

  _renderFallback = () => {
    const { className, component, fallback, width, height } = this.props;
    const props = {...this.props, svg: null, fill: null, width: null, height: null};

    let classes = 'SVGICon SVGIcon--fallback ' + className;

    return (
      <component {...props} className={classes}>
        <img src={fallback} width={width} height={height} className="SVGICon--fallback-image"/>
      </component>
    );
  }

  render() {
    if (this.state.browserSupport) {
      return this._renderSVG();
    }
    return this._renderFallback();
  }
}

export default SVGIcon;
