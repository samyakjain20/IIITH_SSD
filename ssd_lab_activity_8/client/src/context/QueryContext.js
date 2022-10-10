import { createContext, useReducer } from 'react'

export const QueriesContext = createContext()

export const queriesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUERIES': 
      return {
        queries: action.payload
      }
    case 'CREATE_QUERIES':
      return {
        queries: [action.payload, ...state.queries]
      }
    case 'DELETE_QUERY':
      return {
        queries: state.queries.filter((q) => q._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const QueriesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queriesReducer, {
    queries: null
  })

  return (
    <QueriesContext.Provider value={{...state, dispatch}}>
      { children }
    </QueriesContext.Provider>
  )
}