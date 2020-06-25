import React from 'react'
import PropTypes from 'prop-types'

const TabList = ({ children, containerClass }, context) => (
  <div className={`t-tabs ${containerClass}`}>
    {React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        activeIndex: context.activeIndex === index,
        onSelect: () => context.switchTab(index)
      })
    )}
  </div>
)

TabList.contextTypes = {
  activeIndex: PropTypes.number.isRequired,
  switchTab: PropTypes.func
}

export default TabList
