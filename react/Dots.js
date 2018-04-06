import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Dots extends Component {
  render() {
    const { color, dots } = this.props;
    return (
      <div className="pa10"
        style={{
          backgroundColor: "ddd",
          borderRadius: "10px"
        }}>
        <ul className="ma0" style={{ color }}> { dots } </ul>
      </div>
    )
  }
}

Dots.propTypes = {
  /** The dots element */
  dots: PropTypes.node.isRequired,
  /** The color of dots */
  color: PropTypes.string.isRequired,
}

export default Dots