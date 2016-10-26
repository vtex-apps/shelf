import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedNumber} from 'react-intl'

class Price extends React.Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired
  }

  render() {
    return (
      <FormattedNumber
        style="currency"
        value={this.props.value}
        currency={this.props.currency}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const {culture} = state.context
  const {currency} = culture
  return {currency}
}

const PriceWithDataConnected = connect(mapStateToProps)(Price)
export default PriceWithDataConnected
