import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import jest from 'jest'

import ToDoItem from './index'

describe('ToDoItem', () => {
  it('should render an incomplete task', () => {
    const { getByText } = render(<ToDoItem task={'Meeting'} />)
    const node = getByText('Meeting')
    expect(node.textContent).toBe('Meeting')
  })

  it('should not render if a task is empty', () => {
    const { container } = render(<ToDoItem task={''} />)
    const node = container.firstChild
    expect(node).not.toBeInTheDocument()
    expect(node).toBe(null)
  })

  xit('should not render if a task is undefined', () => {
    const { container } = render(<ToDoItem />) //task is undefined here
    const node = container.firstChild
    expect(node).not.toBeInTheDocument()
    expect(node).toBe(null)
  })

  it('should render and match snapshot', () => {
    const { container } = render(<ToDoItem task="Meeting" />)

    expect(container).toMatchSnapshot()
  })

  it('should show the value of complete task', () => {
    const { getByTestId } = render(<ToDoItem task="Meeting" isCompleted />)
    const node = getByTestId('todoCheck')
    expect(node.checked).toBe(true)
    expect(node.checked).not.toBe(false)
  })

  it('should call the handleClick function', () => {
    const mockFn = jest.fn(() => {})
    const { getByTestId } = render(<ToDoItem task="Meeting" clickHandler={mockFn} />)
    const node = getByTestId('todoCheck')
    fireEvent.click(node)
    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
