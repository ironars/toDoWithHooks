import React, { Component } from 'react'
import { number, func } from 'prop-types'

class Tabs extends Component {
  static childContextTypes = {
    activeIndex: number.isRequired,
    switchTab: func
  }

  state = {
    activeTabIndex: 0
  }

  getChildContext() {
    return {
      activeIndex: this.state.activeTabIndex,
      switchTab: this._switchTab
    }
  }

  _switchTab = (activeTabIndex) => {
    const { onTabChange } = this.props
    if (onTabChange) onTabChange(activeTabIndex)
    this.setState({ activeTabIndex })
  }

  render() {
    return <div className="t-card">{this.props.children}</div>
  }
}

export default Tabs
