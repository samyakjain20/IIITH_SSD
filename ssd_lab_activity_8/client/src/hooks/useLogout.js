

import { useAuthContext } from './useAuthContext'
import { useQueriesContext } from './useQueriesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchQueries } = useQueriesContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchQueries({ type: 'SET_QUERIES', payload: null })
  }

  return { logout }
}