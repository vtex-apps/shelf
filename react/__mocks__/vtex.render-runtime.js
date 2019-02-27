import React from 'react'

export const withRuntimeContext = Comp => {
  return props => {
    return <Comp {...props} runtime={{ hints: { mobile: false } }} />
  }
}

export const ExtensionPoint = () => {
  return (
    <div className="extension-point-mock">Product Summary extension point</div>
  )
}
