import React, { useState } from 'react'
import { bool, func } from 'prop-types'

function Form({ handleSubmit, showForm }) {
  const [toDoValue, setToDoValue] = useState('')
  if (!showForm) return null

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit({ title: toDoValue, isCompleted: false })
    setToDoValue('')
  }

  return (
    <form className="t-new-item" onSubmit={onSubmit}>
      <input
        value={toDoValue}
        onChange={(e) => setToDoValue(e.target.value)}
        type="text"
        placeholder="Added New Item"
      />
      <button type="submit">add</button>
    </form>
  )
}

Form.propTypes = {
  handleSubmit: func,
  showForm: bool
}

Form.defaultProps = {
  handleSubmit: () => {},
  showForm: false
}

export default Form
