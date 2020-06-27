import React from 'react'
import { bool, array, func } from 'prop-types'
import ToDoItem from '../ToDoItem'

function Lists({ tasks = [], isCompleted, toggleStatus }) {
  if (tasks.length <= 0) return null
  const filteredTasks = isCompleted ? tasks.filter((todo) => todo.isCompleted) : tasks
  const elements = filteredTasks.map((toDoItem) => {
    return (
      <ToDoItem
        key={toDoItem.id}
        task={toDoItem.title}
        isCompleted={toDoItem.isCompleted}
        clickHandler={() => {
          toggleStatus(toDoItem.id, !toDoItem.isCompleted)
        }}
      />
    )
  })
  return <ul>{elements}</ul>
}

Lists.propTypes = {
  tasks: array.isRequired,
  isCompleted: bool,
  toggleStatus: func
}

Lists.defaultProps = {
  isCompleted: false,
  toggleStatus: () => {}
}

export default Lists
