import React from 'react'

const Tab = ({ children, activeIndex, onSelect }) => (
  <div className={activeIndex ? 't-action active' : 't-action'} onClick={onSelect}>
    {children}
  </div>
)

export default Tab
