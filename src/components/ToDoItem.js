import React from 'react'

function ToDoItem({ todoId, todo, toggleComplete }) {
  const handleComplete = (todoId) => {
    toggleComplete(todoId, !todo.isCompleted)
  }

  return (
    <li className="t-item">
      <input
        onChange={() => handleComplete(todoId)}
        type="checkbox"
        id={todoId}
        name={todoId}
        value={todo.isCompleted}
        checked={todo.isCompleted}
      ></input>
      <label htmlFor={todoId} className={todo.isCompleted ? 'completed' : ''}>
        {todo.title}
      </label>
    </li>
  )
}

export default ToDoItem
