import React, { Component } from 'react'

/**
 * NoSSR Mocked Component.
 */
export class NoSSR extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}