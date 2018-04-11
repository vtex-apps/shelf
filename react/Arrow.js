import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Arrow component. It's an overrided component of react-slick that controls
 * the slide transition.
 */
class Arrow extends Component {
  render() {
    const { className, style, onClick, color } = this.props
    return (
      <div
        className={className}
        style={{ ...style, color: color }}
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
  /** Maximum number of items in the shelf. */
  onClick: PropTypes.func,
  /** The color of the arrow icon. Ex: '#F00', 'rgb(255, 0, 0)'. */
  color: PropTypes.string.isRequired,
}

export default Arrow
