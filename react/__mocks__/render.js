import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

/**
 * Link Mocked Component.
 */
export const Link = ({ page, children }) => <a href={page}>{children}</a>

export class NoSSR extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return <div className="nossr-mock">{this.props.children}</div>
  }
}
