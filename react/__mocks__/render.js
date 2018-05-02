import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

/**
 * ExtensionPoint Mocked Component.
 */
export class ExtensionPoint extends Component {
  render() {
    return (
      <div>Extension Point</div>
    )
  }
}

/**
 * ExtensionPoint Mocked Component.
 */
export class NoSSR extends Component {
  static propTypes = {
    children: PropTypes.any,
  }
  render() {
    return this.props.children
  }
}
