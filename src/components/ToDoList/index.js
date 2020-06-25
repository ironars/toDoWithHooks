import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchToDos, addToDo, completeToDo } from '../../actions'
import Tabs, { TabList, TabPanels, Tab } from '../Tabs'
import Lists from './Lists'
import FormToggler from './FormToggler'
import Form from './Form'
import { tabsConfig } from './config'

function ToDoList() {
  const [showForm, setShowForm] = useState(false)
  const data = useSelector((state) => state.data.data || [])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchToDos())
  }, [dispatch])

  const handleFormSubmit = (task) => {
    dispatch(addToDo(task))
  }

  const toggleStatus = (todoId, status) => {
    dispatch(completeToDo(todoId, status))
  }

  return (
    <div className="t-list">
      <Tabs>
        <TabList>
          {tabsConfig.map((tab, index) => (
            <Tab key={index}>
              <img src={tab.src} alt="" />
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <Lists tasks={data} toggleStatus={toggleStatus} />
          <Lists isCompleted tasks={data} toggleStatus={toggleStatus} />
        </TabPanels>
        <Form showForm={showForm} handleSubmit={handleFormSubmit} />
        <FormToggler toggleForm={setShowForm} showForm={showForm} />
      </Tabs>
    </div>
  )
}

export default ToDoList
