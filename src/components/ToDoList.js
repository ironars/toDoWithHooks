import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToDos, addToDo, completeToDo } from '../actions'
import ToDoItem from './ToDoItem'
import { toDoFilter } from '../utils/contants'
import listIcon from '../assets/icon/list_bulleted.svg'
import completedIcon from '../assets/icon/assignment_complete.svg'

function ToDoList() {
  const [showForm, setShowForm] = useState(false)
  const [toDoValue, setToDoValue] = useState('')
  const [displayFilter, setDisplayFilter] = useState('all')
  const data = useSelector((state) => state.data.data || [])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchToDos())
  }, [dispatch])

  const handleToDoValue = (e) => {
    setToDoValue(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(addToDo({ title: toDoValue, isCompleted: false }))
    setToDoValue('')
  }

  const toggleComplete = (todoId, status) => {
    dispatch(completeToDo(todoId, status))
  }

  const renderForm = () => {
    if (showForm) {
      return (
        <React.Fragment>
          <form className="t-new-item" onSubmit={handleFormSubmit}>
            <input value={toDoValue} onChange={handleToDoValue} type="text" placeholder="Added New Item" />
            <button type="submit">add</button>
          </form>
        </React.Fragment>
      )
    }
  }

  const renderToDoList = () => {
    if (data.length <= 0) return
    let toDos = []
    if (displayFilter === toDoFilter.COMPLETED) {
      toDos = data
        .filter((todo) => todo.isCompleted)
        .map((toDoItem) => {
          return <ToDoItem key={toDoItem.id} todoId={toDoItem.id} todo={toDoItem} toggleComplete={toggleComplete} />
        })
    } else {
      toDos = data.map((toDoItem) => {
        return <ToDoItem key={toDoItem.id} todoId={toDoItem.id} todo={toDoItem} toggleComplete={toggleComplete} />
      })
    }

    return toDos
  }

  return (
    <div className="t-list">
      <div className="t-card">
        <div className="t-tabs">
          <div
            className={displayFilter === toDoFilter.ALL ? 't-action active' : 't-action'}
            onClick={() => setDisplayFilter(toDoFilter.ALL)}
          >
            <img src={listIcon} alt="" />
          </div>
          <div
            className={displayFilter === toDoFilter.COMPLETED ? 't-action active' : 't-action'}
            onClick={() => setDisplayFilter(toDoFilter.COMPLETED)}
          >
            <img src={completedIcon} alt="" />
          </div>
        </div>
        <div className="card-body">
          <ul>{renderToDoList()}</ul>
        </div>
        {renderForm()}
        <div className="t-plus" onClick={() => setShowForm(!showForm)}>
          {showForm ? <i>-</i> : <i>+</i>}
        </div>
      </div>
    </div>
  )
}

export default ToDoList
