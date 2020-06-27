import React from 'react'
import { number, bool } from 'prop-types'

const TabPanels = ({ children, showAllChildren }, context) => {
  console.log('aa: ', showAllChildren)
  return <div className="card-body">{showAllChildren ? children : children[context.activeIndex]}</div>
}

TabPanels.contextTypes = {
  activeIndex: number
}
TabPanels.propTypes = {
  showAllChildren: bool
}

TabPanels.defaultProps = {
  showAllChildren: false
}

export default TabPanels
