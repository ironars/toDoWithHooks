import React from 'react'
import { string, bool, func } from 'prop-types'

function ToDoItem({ task, isCompleted, clickHandler }) {
  if (!task) return null
  const cx = isCompleted ? 'completed' : ''
  return (
    <li className="t-item">
      <input
        onChange={clickHandler}
        type="checkbox"
        data-testid="todoCheck"
        name={task}
        value={isCompleted}
        checked={isCompleted}
      />
      <label htmlFor={task} className={cx}>
        {task}
      </label>
    </li>
  )
}

ToDoItem.propTypes = {
  task: string.isRequired,
  isCompleted: bool,
  clickHandler: func
}

ToDoItem.defaultProps = {
  isCompleted: false,
  clickHandler: () => {}
}

export default ToDoItem
