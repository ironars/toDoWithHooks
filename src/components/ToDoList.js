import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToDos, addToDo } from '../actions'
import ToDoItem from './ToDoItem'
import { toDoFilter } from '../utils/contants'
import listIcon from '../assets/icon/list_bulleted.svg'
import completedIcon from '../assets/icon/assignment_complete.svg'

function ToDoList() {
  const [showForm, setShowForm] = useState(false)
  const [toDoValue, setToDoValue] = useState('')
  const [displayFilter, setDisplayFilter] = useState('all')
  const data = useSelector((state) => state.data)
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
    let toDos = []
    if (displayFilter === toDoFilter.COMPLETED) {
      Object.keys(data).forEach((key) => {
        if (data[key].isCompleted) {
          toDos.push(<ToDoItem key={key} todoId={key} todo={data[key]} />)
        }
      })
    } else {
      toDos =
        data &&
        Object.keys(data).map((key) => {
          return <ToDoItem key={key} todoId={key} todo={data[key]} />
        })
    }

    return <React.Fragment>{toDos && toDos.length > 0 ? toDos : null}</React.Fragment>
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
