import React from 'react'
import { useDispatch } from 'react-redux'
import { completeToDo } from '../actions'

function ToDoItem({ todoId, todo }) {
  const dispatch = useDispatch()

  const handleComplete = (todoItem) => {
    dispatch(completeToDo(todoItem, !todo.isCompleted))
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
