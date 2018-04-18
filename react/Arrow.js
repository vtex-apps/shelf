import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Arrow component. It's an overrided component of react-slick that controls
 * the slide transition.
 */
class Arrow extends Component {
  render() {
    const { className, style, onClick, arrowClass } = this.props
    return (
      <div
        className={`${className} ${arrowClass}`}
        style={{ ...style }}
        onClick={onClick}
      />
    )
  }
}

Arrow.propTypes = {
  /** The css class of the element. */
  className: PropTypes.string,
  /** The custom style of the element. */
  style: PropTypes.object,
  /** The onClick handle function. */
  onClick: PropTypes.func,
  /** The css class that specifies the arrow. */
  arrowClass: PropTypes.string.isRequired,
}

export default Arrow
