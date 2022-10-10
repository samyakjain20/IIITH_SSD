import { QueriesContext } from '../context/QueryContext'
import { useContext } from 'react'

export const useQueriesContext = () => {
  const context = useContext(QueriesContext)

  if (!context) {
    throw Error('useQueriesContext must be used inside an QueriesContextProvider')
  }

  return context
}