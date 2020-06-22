import { todosRef } from '../firebase'
import { FETCH_TODOS } from './types'

export const fetchToDos = () => async (dispatch) => {
  todosRef.on('value', (snapshot) => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    })
  })
}

export const addToDo = (newToDo) => async (dispatch) => {
  todosRef.push().set(newToDo)
}

export const completeToDo = (toDo, isCompleted) => async (dispatch) => {
  todosRef.child(toDo).update({ isCompleted })
}

export const deleteToDo = (toDo) => async (dispatch) => {
  todosRef.child(toDo).remove()
}
