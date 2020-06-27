import React from 'react'
import { bool, func } from 'prop-types'

function FormToggler({ toggleForm, showForm }) {
  return (
    <div className="t-plus" onClick={() => toggleForm(!showForm)}>
      <i>{showForm ? '-' : '+'}</i>
    </div>
  )
}

FormToggler.propTypes = {
  toggleForm: func,
  showForm: bool
}

FormToggler.defaultProps = {
  toggleForm: () => {},
  showForm: false
}

export default FormToggler
