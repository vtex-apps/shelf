import React, { Component } from 'react'
import classNames from 'classnames'

import { isMobileOnly } from 'react-device-detect'

import tabbedShelf from './tabbedShelf.css'

class Tabs extends Component {

  state = {
    selectedIndex: 0
  }

  getTabMenuSize = () => isMobileOnly ? 100 : 15

  getShelfSize = () => isMobileOnly ? 100 : 85

  handleClick = (index) => this.setState({ selectedIndex: index })

  render() {
    const { panes } = this.props
    const { selectedIndex } = this.state
    if (!panes || panes.length === 0) {
      return null
    }

    return (
      <div className={`${tabbedShelf.tabsContainer} flex-ns pa6-ns`}>
        <div className={`${tabbedShelf.tabsNamesContainer} flex flex-column`} style={{ width: `${this.getTabMenuSize()}%` }}>
          {panes.map((pane, index) => {
            const isSelected = index === selectedIndex
            const isLast = index === panes.length - 1
            const itemContainer = classNames(`t-body pv4 ph3 tl bb b--action-primary ${tabbedShelf.itemContainer}`, {
              [`bg-action-primary c-on-muted-1 ${tabbedShelf.itemContainerSelected}`]: isSelected,
              [tabbedShelf.itemContainerUnselected]: !isSelected,
              'bw0': isLast,
            })
            return (
              <button 
                type="button"
                onClick={() => this.handleClick(index)}
                className="bn outline-0 bg-transparent pa0"
              >
                <div className={itemContainer} key={pane.menuItem} >{pane.menuItem}</div>
              </button>
            )
          })}
        </div>
        <div
          className={`${tabbedShelf.shelfContainer} ml5-ns`} 
          style={{ width: `${this.getShelfSize()}%` }}
        >
          {panes[selectedIndex].render()}
        </div>
      </div>
    )
  }
}

export default Tabs
