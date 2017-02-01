import { connect } from 'react-redux'
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

const mapStateToProps = (state) => {
  const {culture} = state.context
  const {currency} = culture
  return { currency }
}

const PriceWithDataConnected = connect(mapStateToProps)(Price)

export default PriceWithDataConnected
