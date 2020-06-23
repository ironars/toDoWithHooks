import { FETCH_TODOS } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      const data = action.payload
      let todos = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id
        }
      })
      return {
        ...state,
        data: todos.sort((x, y) => {
          // true values first
          // return x === y ? 0 : x ? -1 : 1
          // false values first
          // return (x === y)? 0 : x? 1 : -1;
          return x.isCompleted - y.isCompleted
        })
      }
    default:
      return state
  }
}
