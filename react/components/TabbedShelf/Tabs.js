import React, { Component } from 'react'
import classNames from 'classnames'

import tabbedShelf from './tabbedShelf.css'

class Tabs extends Component {

  state = {
    selectedIndex: 0
  }

  handleClick = (index) => this.setState({ selectedIndex: index })

  render() {
    const { panes } = this.props
    const { selectedIndex } = this.state
    if (!panes || panes.length === 0) {
      return null
    }

    return (
      <div className="flex justify-center items-center">
      <div className={`${tabbedShelf.tabsContainer} flex-ns pa6-ns justify-between-ns w-100-s`}>
        <div className={`${tabbedShelf.tabsNamesContainer} flex flex-column mh6`}>
          {panes.map((pane, index) => {
            const isSelected = index === selectedIndex
            const isLast = index === panes.length - 1
            const itemContainer = classNames(`t-body pa4 tl bb b--muted-4 ${tabbedShelf.itemContainer}`, {
              [`bg-base--inverted c-on-muted-1 ${tabbedShelf.itemContainerSelected}`]: isSelected,
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
        <div className={`${tabbedShelf.shelfContainer} mh6-s mw-100 overflow-hidden`}>
          {panes[selectedIndex].render()}
        </div>
      </div>
      </div>
    )
  }
}

export default Tabs
