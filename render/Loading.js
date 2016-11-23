import React, {Component} from 'react'
import {CircleLoading, TextBlockLoading} from 'vtex.loading'

// eslint-disable-next-line
class Loading extends Component {
  render() {
    return (
      <div className="ph2">
        <div className="mv6">
          <CircleLoading />
        </div>
        <TextBlockLoading size="small" />
      </div>
    )
  }
}

export default Loading
