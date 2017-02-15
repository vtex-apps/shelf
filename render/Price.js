import { FormattedNumber } from 'react-intl'
import React, { Component, PropTypes } from 'react'

// eslint-disable-next-line
class Price extends Component {
  render () {
    return (
      <FormattedNumber
        currency={this.props.currency}
        style="currency"
        value={this.props.value}
        />
    )
  }
}

Price.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string,
}

export default Price
