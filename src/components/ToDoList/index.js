import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToDos, addToDo, completeToDo } from '../../actions'
import ToDoItem from '../ToDoItem'
import { toDoFilter } from '../../utils/contants'
import listIcon from '../../assets/icon/list_bulleted.svg'
import completedIcon from '../../assets/icon/assignment_complete.svg'
import Tabs, { TabList, TabPanels, Tab } from '../Tabs'

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

  const renderToDoList = (isCompleted) => {
    if (data.length <= 0) return
    if (isCompleted) {
      return data
        .filter((todo) => todo.isCompleted)
        .map((toDoItem) => {
          return (
            <ToDoItem
              key={toDoItem.id}
              task={toDoItem.title}
              isCompleted={toDoItem.isCompleted}
              clickHandler={() => {
                toggleComplete(toDoItem.id, !toDoItem.isCompleted)
              }}
            />
          )
        })
    } else {
      return data.map((toDoItem) => {
        return (
          <ToDoItem
            key={toDoItem.id}
            task={toDoItem.title}
            isCompleted={toDoItem.isCompleted}
            clickHandler={() => {
              toggleComplete(toDoItem.id, !toDoItem.isCompleted)
            }}
          />
        )
      })
    }
  }

  const tabs = [
    {
      title: 'all',
      src: listIcon
    },
    {
      title: 'completed',
      src: completedIcon
    }
  ]

  return (
    <div className="t-list">
      <Tabs>
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index} onClick={() => setDisplayFilter(toDoFilter.ALL)}>
              <img src={tab.src} alt="" />
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <ul>{renderToDoList(false)}</ul>
          <ul>{renderToDoList(true)}</ul>
        </TabPanels>
        {renderForm()}
        <div className="t-plus" onClick={() => setShowForm(!showForm)}>
          {showForm ? <i>-</i> : <i>+</i>}
        </div>
      </Tabs>
    </div>
  )

  // return (
  //   <div className="t-list">
  //     <div className="t-card">
  //       <div className="t-tabs">
  //         <div
  //           className={displayFilter === toDoFilter.ALL ? 't-action active' : 't-action'}
  //           onClick={() => setDisplayFilter(toDoFilter.ALL)}
  //         >
  //           <img src={listIcon} alt="" />
  //         </div>
  //         <div
  //           className={displayFilter === toDoFilter.COMPLETED ? 't-action active' : 't-action'}
  //           onClick={() => setDisplayFilter(toDoFilter.COMPLETED)}
  //         >
  //           <img src={completedIcon} alt="" />
  //         </div>
  //       </div>
  //       <div className="card-body">
  //         <ul>{renderToDoList()}</ul>
  //       </div>
  //       {renderForm()}
  //       <div className="t-plus" onClick={() => setShowForm(!showForm)}>
  //         {showForm ? <i>-</i> : <i>+</i>}
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default ToDoList
